import { CVData } from '../types/cv'
import { getTemplate } from '../templates'
import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export async function generateClientPDF(cv: CVData): Promise<Blob> {
  // Prefer live preview DOM markup if available for 100% computed fidelity
  const livePreviewEl = typeof document !== 'undefined' ? document.getElementById('cv-page-print-container') : null
  let htmlMarkup: string
  if (livePreviewEl) {
    htmlMarkup = livePreviewEl.innerHTML
  } else {
    const templateConfig = getTemplate(cv.settings?.template || 'classic-ats')
    const TemplateComponent = templateConfig.component
    const element = React.createElement(TemplateComponent, { cv })
    htmlMarkup = renderToStaticMarkup(element)
  }

  // Mount offscreen at top:0 left:0 with exact A4 210mm width and 297mm minHeight
  // Positioned behind the screen with z-index: -9999 so coordinates are valid for html2canvas
  const container = document.createElement('div')
  container.id = 'cv-client-pdf-render-mount'
  container.className = 'cv-print-container'
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 210mm;
    min-height: 297mm;
    background-color: #ffffff;
    color: #000000;
    z-index: -9999;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    pointer-events: none;
  `
  container.innerHTML = htmlMarkup
  document.body.appendChild(container)

  try {
    // Ensure all custom and web fonts are fully loaded before capturing
    if (typeof document !== 'undefined' && 'fonts' in document) {
      await (document as any).fonts.ready
    }

    // Brief delay to ensure browser layout and styles have fully painted
    await new Promise((resolve) => setTimeout(resolve, 60))

    // High-resolution rasterization (scale: 2 = 192 DPI, retina-sharp, lossless PNG)
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: container.offsetWidth || 794
    })

    const imgWidth = 210 // A4 width in mm
    const pageMmHeight = 297 // A4 height in mm
    const naturalMmHeight = (canvas.height / canvas.width) * imgWidth
    const pagePxHeight = Math.floor(canvas.width * (pageMmHeight / imgWidth))

    // If CV height is within single page range (up to 1.35x A4),
    // output as 1 exact page matching the preview with 100% PRESERVED aspect ratio!
    const singlePageThreshold = pagePxHeight * 1.35

    let pdf: jsPDF

    if (canvas.height <= singlePageThreshold) {
      // 1-Page Document: preserve exact aspect ratio so spaces, lines, and fonts match preview 100%
      const pdfHeight = Math.max(pageMmHeight, naturalMmHeight)
      pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [imgWidth, pdfHeight],
        compress: true
      })
      const imgData = canvas.toDataURL('image/png')
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, naturalMmHeight, undefined, 'FAST')
    } else {
      // True multi-page CV (e.g. 2 full pages or more)
      pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      })
      const totalPages = Math.ceil(canvas.height / pagePxHeight)
      for (let i = 0; i < totalPages; i++) {
        const remainingPx = canvas.height - i * pagePxHeight
        // If the trailing page has less than 12% of a page (just bottom whitespace padding or stray sliver), omit it
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

        if (i > 0) {
          pdf.addPage('a4', 'portrait')
        }
        const imgData = pageCanvas.toDataURL('image/png')
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, pageMmHeight, undefined, 'FAST')
      }
    }

    const blob = pdf.output('blob')
    if (!blob || blob.size < 3000) {
      throw new Error('Generated PDF is empty or below minimum size')
    }

    return blob
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container)
    }
  }
}
