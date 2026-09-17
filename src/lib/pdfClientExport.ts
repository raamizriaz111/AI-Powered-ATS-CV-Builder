import { CVData } from '../types/cv'
import { getTemplate } from '../templates'
import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'
import html2pdf from 'html2pdf.js'

export async function generateClientPDF(cv: CVData): Promise<void> {
  const templateConfig = getTemplate(cv.settings?.template || 'classic-ats')
  const TemplateComponent = templateConfig.component

  // Render template to HTML string with inline styles
  const element = React.createElement(TemplateComponent, { cv })
  const htmlMarkup = renderToStaticMarkup(element)

  // Create an off-screen container for rendering
  const container = document.createElement('div')
  container.id = 'cv-client-pdf-render'
  container.style.position = 'fixed'
  container.style.top = '-99999px'
  container.style.left = '-99999px'
  container.style.width = '210mm'
  container.style.minHeight = '297mm'
  container.style.backgroundColor = '#ffffff'
  container.style.zIndex = '-9999'
  container.innerHTML = htmlMarkup

  document.body.appendChild(container)

  const filename = `${(cv.personal?.name || 'CV').replace(/\s+/g, '_')}_CV.pdf`

  try {
    const opt = {
      margin: 0,
      filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 794 // Standard 210mm at 96 DPI
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }

    await (html2pdf as any)().set(opt).from(container).save()
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container)
    }
  }
}
