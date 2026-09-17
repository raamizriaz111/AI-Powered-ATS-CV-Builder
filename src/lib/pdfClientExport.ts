import { CVData } from '../types/cv'
import { getTemplate } from '../templates'
import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export async function generateClientPDF(cv: CVData): Promise<Blob> {
  const templateConfig = getTemplate(cv.settings?.template || 'classic-ats')
  const TemplateComponent = templateConfig.component

  // Render template to HTML string with inline styles
  const element = React.createElement(TemplateComponent, { cv })
  const htmlMarkup = renderToStaticMarkup(element)

  // Mount offscreen at top:0 left:0 with exact A4 794px width (standard 210mm at 96 DPI)
  // Positioned behind the screen with z-index: -9999 so coordinates are valid for html2canvas
  const container = document.createElement('div')
  container.id = 'cv-client-pdf-render-mount'
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 794px;
    background-color: #ffffff;
    color: #000000;
    z-index: -9999;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    pointer-events: none;
    line-height: normal;
  `
  container.innerHTML = htmlMarkup
  document.body.appendChild(container)

  try {
    // High-resolution rasterization (scale: 2 = 192 DPI, retina-sharp, lossless PNG)
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 794
    })

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    })

    const imgWidth = 210 // A4 width in mm
    const pageMmHeight = 297 // A4 height in mm
    const pagePxHeight = Math.floor(canvas.width * (pageMmHeight / imgWidth))
    const totalPages = Math.ceil(canvas.height / pagePxHeight)

    // Single-page CV (with 40px subpixel margin buffer): render 1 exact page
    if (totalPages <= 1 || canvas.height <= pagePxHeight + 40) {
      const imgHeight = Math.min(pageMmHeight, (canvas.height * imgWidth) / canvas.width)
      const imgData = canvas.toDataURL('image/png')
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST')
    } else {
      // Multi-page CV: cleanly slice canvas into exact A4 pages without trailing blank pages
      for (let i = 0; i < totalPages; i++) {
        const remainingPx = canvas.height - i * pagePxHeight
        if (remainingPx <= 40) break // Ignore tiny subpixel whitespace overflow

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
