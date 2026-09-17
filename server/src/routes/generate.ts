import express from 'express'
import { generatePDFFromHTML, buildHTMLTemplate } from '../services/pdfGenerator'
import { generateDOCX } from '../services/docxGenerator'
import { CVData } from '../types/cv'
const router = express.Router()

router.post('/pdf', async (req, res, next) => {
  try {
    const cv: CVData = req.body
    if (!cv?.personal) return res.status(400).json({ error: 'Invalid CV data' })
    const pdf = await generatePDFFromHTML(buildHTMLTemplate(cv))
    const fname = `${(cv.personal.name||'CV').replace(/\\s+/g,'_')}_CV.pdf`
    res.setHeader('Content-Type','application/pdf')
    res.setHeader('Content-Disposition',`attachment; filename="${fname}"`)
    res.send(pdf)
  } catch (err) { next(err) }
})

router.post('/docx', async (req, res, next) => {
  try {
    const cv: CVData = req.body
    if (!cv?.personal) return res.status(400).json({ error: 'Invalid CV data' })
    const buf = await generateDOCX(cv)
    const fname = `${(cv.personal.name||'CV').replace(/\\s+/g,'_')}_CV.docx`
    res.setHeader('Content-Type','application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    res.setHeader('Content-Disposition',`attachment; filename="${fname}"`)
    res.send(buf)
  } catch (err) { next(err) }
})

export { router as generateRouter }
