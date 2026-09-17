import express from 'express'
import multer from 'multer'
import { parsePDF, parseDOCX, parseTextToCV } from '../services/cvParser'

const router = express.Router()
const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
  fileFilter: (_req, file, cb) => {
    const name = file.originalname.toLowerCase()
    const isPDF = file.mimetype === 'application/pdf' || name.endsWith('.pdf')
    const isDocx =
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype === 'application/msword' ||
      name.endsWith('.docx') ||
      name.endsWith('.doc')

    if (isPDF || isDocx) {
      cb(null, true)
    } else {
      cb(new Error('Only PDF and DOCX files are supported.'))
    }
  }
})

router.post('/parse', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file received. Please select a PDF or Word document.' })
    }

    const filename = req.file.originalname.toLowerCase()
    let rawText = ''

    if (filename.endsWith('.pdf') || req.file.mimetype === 'application/pdf') {
      rawText = await parsePDF(req.file.buffer)
    } else {
      rawText = await parseDOCX(req.file.buffer)
    }

    if (!rawText || rawText.trim().length < 20) {
      return res.status(422).json({
        error:
          'Could not extract text from this document. It might be a scanned image or empty. Please ensure the file contains readable text.'
      })
    }

    const cvData = await parseTextToCV(rawText)
    res.json({ success: true, data: cvData })
  } catch (err: any) {
    console.error('[Upload Parse Error]:', err.message || err)
    res.status(500).json({ error: err.message || 'Failed to parse CV document' })
  }
})

router.post('/parse-text', async (req, res, next) => {
  try {
    const { text } = req.body
    if (!text || text.trim().length < 20) {
      return res.status(400).json({ error: 'Please provide at least 20 characters of CV text.' })
    }
    const cvData = await parseTextToCV(text)
    res.json({ success: true, data: cvData })
  } catch (err: any) {
    console.error('[Text Parse Error]:', err.message || err)
    res.status(500).json({ error: err.message || 'Failed to parse CV text' })
  }
})

export { router as uploadRouter }
