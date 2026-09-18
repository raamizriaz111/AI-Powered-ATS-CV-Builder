import { CVData } from '../types/cv'
import { getTemplate } from '../templates'
import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export async function generateClientPDF(cv: CVData): Promise<Blob> {
  // === STRATEGY: Clone the live preview element and mount it directly on <body> ===
  // We cannot capture html2canvas on an element inside an overflow:auto scroll
  // container because html2canvas mis-calculates positions in those situations.
  // Cloning the element (with all its inline styles, which React renders as
  // actual style="" attributes) and re-mounting it flat on <body> gives us a
  // stable, correctly-positioned target for capture.

  const livePreviewEl = typeof document !== 'undefined'
    ? document.getElementById('cv-page-print-container')
    : null

  // Clone the live element so we preserve 100% of the computed inline styles
  const clone = livePreviewEl
    ? (livePreviewEl.cloneNode(true) as HTMLElement)
    : null

  if (clone) {
    // Remove zoom transform from the clone (we want the full-size capture)
    clone.style.transform = 'none'
    clone.style.transformOrigin = 'top left'
    clone.style.marginBottom = '0'
    clone.style.boxShadow = 'none'
    // Position off-screen but in a way html2canvas can still "see" it
    clone.style.position = 'fixed'
    clone.style.top = '0'
    clone.style.left = '0'
    clone.style.zIndex = '-9999'
    clone.style.width = '210mm'
    clone.style.minHeight = '297mm'
    clone.style.backgroundColor = '#ffffff'

    document.body.appendChild(clone)

    try {
      // Wait for fonts + one repaint
      if ('fonts' in document) await (document as any).fonts.ready
      await new Promise((resolve) => setTimeout(resolve, 120))

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: clone.offsetWidth || 794
      })

      return buildPDF(canvas)
    } finally {
      if (document.body.contains(clone)) document.body.removeChild(clone)
    }
  }

  // === FALLBACK: No live preview — re-render the template offscreen ===
  const templateConfig = getTemplate(cv.settings?.template || 'classic-ats')
  const TemplateComponent = templateConfig.component
  const htmlMarkup = renderToStaticMarkup(React.createElement(TemplateComponent, { cv }))

  // Copy page-level <style> tags so template CSS renders correctly
  const pageStyles = Array.from(document.querySelectorAll('style'))
    .map((el) => el.outerHTML)
    .join('\n')

  const container = document.createElement('div')
  container.style.cssText = [
    'position:fixed', 'top:0', 'left:0',
    'width:210mm', 'min-height:297mm',
    'background:#ffffff', 'z-index:-9999',
    'box-sizing:border-box', 'margin:0', 'padding:0',
    'pointer-events:none'
  ].join(';')
  container.innerHTML = pageStyles + htmlMarkup
  document.body.appendChild(container)

  try {
    if ('fonts' in document) await (document as any).fonts.ready
    await new Promise((resolve) => setTimeout(resolve, 120))

    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: container.offsetWidth || 794
    })

    return buildPDF(canvas)
  } finally {
    if (document.body.contains(container)) document.body.removeChild(container)
  }
}

/** Build a jsPDF from a canvas, handling single-page and multi-page CVs */
function buildPDF(canvas: HTMLCanvasElement): Blob {
  const imgWidth = 210 // A4 mm
  const pageMmHeight = 297
  const naturalMmHeight = (canvas.height / canvas.width) * imgWidth
  const pagePxHeight = Math.floor(canvas.width * (pageMmHeight / imgWidth))
  const singlePageThreshold = pagePxHeight * 1.35

  let pdf: jsPDF

  if (canvas.height <= singlePageThreshold) {
    // Single-page: preserve exact aspect ratio — preview-identical output
    const pdfHeight = Math.max(pageMmHeight, naturalMmHeight)
    pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [imgWidth, pdfHeight], compress: true })
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, naturalMmHeight, undefined, 'FAST')
  } else {
    // Multi-page CV
    pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true })
    const totalPages = Math.ceil(canvas.height / pagePxHeight)
    for (let i = 0; i < totalPages; i++) {
      const remainingPx = canvas.height - i * pagePxHeight
      // Skip trailing whitespace sliver (< 12% of a page)
      if (i > 0 && remainingPx <= pagePxHeight * 0.12) break

      const chunkHeight = Math.min(pagePxHeight, remainingPx)
      const pageCanvas = document.createElement('canvas')
      pageCanvas.width = canvas.width
      pageCanvas.height = pagePxHeight
      const ctx = pageCanvas.getContext('2d')!
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height)
      ctx.drawImage(canvas, 0, i * pagePxHeight, canvas.width, chunkHeight, 0, 0, canvas.width, chunkHeight)

      if (i > 0) pdf.addPage('a4', 'portrait')
      pdf.addImage(pageCanvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, pageMmHeight, undefined, 'FAST')
    }
  }

  const blob = pdf.output('blob')
  if (!blob || blob.size < 3000) throw new Error('Generated PDF is empty or below minimum size')
  return blob
}
