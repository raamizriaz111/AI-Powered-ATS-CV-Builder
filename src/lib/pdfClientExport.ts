import { CVData } from '../types/cv'
import { getTemplate } from '../templates'
import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'
import html2pdf from 'html2pdf.js'

export async function generateClientPDF(cv: CVData): Promise<Blob> {
  const templateConfig = getTemplate(cv.settings?.template || 'classic-ats')
  const TemplateComponent = templateConfig.component

  // Render template to HTML string with inline styles
  const element = React.createElement(TemplateComponent, { cv })
  const htmlMarkup = renderToStaticMarkup(element)

  // Standard A4 container wrapper: 210mm (794px at 96 DPI)
  const wrappedHtml = `
    <div style="width: 210mm; min-height: 297mm; background-color: #ffffff; box-sizing: border-box; margin: 0; padding: 0;">
      ${htmlMarkup}
    </div>
  `

  const filename = `${(cv.personal?.name || 'CV').replace(/\\s+/g, '_')}_CV.pdf`

  const opt = {
    margin: 0,
    filename,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: 794
    },
    jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
  }

  const worker = (html2pdf as any)().set(opt).from(wrappedHtml)
  const blob: Blob = await worker.outputPdf('blob')

  if (!blob || blob.size < 3000) {
    throw new Error('Generated PDF is empty or below minimum size')
  }

  return blob
}
