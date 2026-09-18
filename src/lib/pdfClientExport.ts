import { CVData } from '../types/cv'
import { getTemplate } from '../templates'
import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export async function generateClientPDF(cv: CVData): Promise<Blob> {
  // === PRIMARY: Capture the live preview element directly ===
  // The live preview element already has 100% correct computed styles, fonts,
  // and layout. We temporarily strip the CSS zoom transform so html2canvas
  // captures it at its true 210mm pixel width, then restore zoom after.

  const livePreviewEl = typeof document !== 'undefined'
    ? document.getElementById('cv-page-print-container')
    : null

  if (livePreviewEl) {
    // Save and remove the zoom transform so html2canvas captures real dimensions
    const savedTransform = (livePreviewEl as HTMLElement).style.transform
    const savedOrigin = (livePreviewEl as HTMLElement).style.transformOrigin
    const savedMarginBottom = (livePreviewEl as HTMLElement).style.marginBottom;
    (livePreviewEl as HTMLElement).style.transform = 'none';
    (livePreviewEl as HTMLElement).style.transformOrigin = 'top left';
    (livePreviewEl as HTMLElement).style.marginBottom = '0'

    // Wait one frame for the browser to reflow without the transform
    await new Promise((resolve) => setTimeout(resolve, 80))

    try {
      if ('fonts' in document) {
        await (document as any).fonts.ready
      }

      const canvas = await html2canvas(livePreviewEl as HTMLElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: (livePreviewEl as HTMLElement).offsetWidth || 794
      })

      const imgWidth = 210 // A4 width in mm
      const pageMmHeight = 297
      const naturalMmHeight = (canvas.height / canvas.width) * imgWidth
      const pagePxHeight = Math.floor(canvas.width * (pageMmHeight / imgWidth))
      const singlePageThreshold = pagePxHeight * 1.35

      let pdf: jsPDF

      if (canvas.height <= singlePageThreshold) {
        // Single-page: preserve exact aspect ratio — spaces, lines, and fonts are 100% preview-accurate
        const pdfHeight = Math.max(pageMmHeight, naturalMmHeight)
        pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: [imgWidth, pdfHeight],
          compress: true
        })
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, naturalMmHeight, undefined, 'FAST')
      } else {
        // Multi-page CV
        pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true
        })
        const totalPages = Math.ceil(canvas.height / pagePxHeight)
        for (let i = 0; i < totalPages; i++) {
          const remainingPx = canvas.height - i * pagePxHeight
          // Skip trailing whitespace sliver pages (< 12% of a page)
          if (i > 0 && remainingPx <= pagePxHeight * 0.12) break

          const chunkHeight = Math.min(pagePxHeight, remainingPx)
          const pageCanvas = document.createElement('canvas')
          pageCanvas.width = canvas.width
          pageCanvas.height = pagePxHeight
          const ctx = pageCanvas.getContext('2d')
          if (ctx) {
            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height)
            ctx.drawImage(canvas, 0, i * pagePxHeight, canvas.width, chunkHeight, 0, 0, canvas.width, chunkHeight)
          }

          if (i > 0) pdf.addPage('a4', 'portrait')
          pdf.addImage(pageCanvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, pageMmHeight, undefined, 'FAST')
        }
      }

      const blob = pdf.output('blob')
      if (!blob || blob.size < 3000) {
        throw new Error('Generated PDF is empty or below minimum size')
      }
      return blob
    } finally {
      // Always restore the zoom transform
      ;(livePreviewEl as HTMLElement).style.transform = savedTransform;
      (livePreviewEl as HTMLElement).style.transformOrigin = savedOrigin;
      (livePreviewEl as HTMLElement).style.marginBottom = savedMarginBottom
    }
  }

  // === FALLBACK: No live preview in DOM (e.g. SSR / test environment) ===
  // Re-render into an offscreen container that inherits page styles.
  const templateConfig = getTemplate(cv.settings?.template || 'classic-ats')
  const TemplateComponent = templateConfig.component
  const htmlMarkup = renderToStaticMarkup(React.createElement(TemplateComponent, { cv }))

  // Clone all stylesheets from the live page so styles render correctly
  const styleFragments = Array.from(document.querySelectorAll('style'))
    .map((el) => el.outerHTML)
    .join('\n')

  const container = document.createElement('div')
  container.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 210mm; min-height: 297mm;
    background-color: #ffffff;
    z-index: -9999;
    box-sizing: border-box;
    margin: 0; padding: 0;
    pointer-events: none;
  `
  container.innerHTML = styleFragments + htmlMarkup
  document.body.appendChild(container)

  try {
    if ('fonts' in document) await (document as any).fonts.ready
    await new Promise((resolve) => setTimeout(resolve, 80))

    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: container.offsetWidth || 794
    })

    const imgWidth = 210
    const pageMmHeight = 297
    const naturalMmHeight = (canvas.height / canvas.width) * imgWidth
    const pdfHeight = Math.max(pageMmHeight, naturalMmHeight)
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [imgWidth, pdfHeight], compress: true })
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, naturalMmHeight, undefined, 'FAST')

    const blob = pdf.output('blob')
    if (!blob || blob.size < 3000) throw new Error('Generated PDF is empty or below minimum size')
    return blob
  } finally {
    if (document.body.contains(container)) document.body.removeChild(container)
  }
}

