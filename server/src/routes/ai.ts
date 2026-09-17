import express from 'express'
import { optimizeSection, analyzeKeywords, autoOptimizeCV } from '../services/aiService'
const router = express.Router()

router.post('/optimize', async (req, res, next) => {
  try {
    const { section, content, context } = req.body
    if (!section || !content) return res.status(400).json({ error: 'section and content required' })
    const improved = await optimizeSection(section, content, context || '')
    res.json({ success: true, improved })
  } catch (err: any) {
    if (err.message?.includes('GEMINI_API_KEY')) return res.status(503).json({ error: err.message })
    next(err)
  }
})

router.post('/keywords', async (req, res, next) => {
  try {
    const { cvText, jobDescription } = req.body
    if (!cvText || !jobDescription) return res.status(400).json({ error: 'cvText and jobDescription required' })
    const analysis = await analyzeKeywords(cvText, jobDescription)
    res.json({ success: true, ...analysis })
  } catch (err: any) {
    if (err.message?.includes('GEMINI_API_KEY')) return res.status(503).json({ error: err.message })
    next(err)
  }
})

router.post('/auto-optimize', async (req, res, next) => {
  try {
    const { cv, jobDescription } = req.body
    if (!cv) return res.status(400).json({ error: 'cv object is required' })
    const optimized = await autoOptimizeCV(cv, jobDescription || '')
    res.json({ success: true, data: optimized })
  } catch (err: any) {
    console.error('[AI Auto-Optimize Error]:', err.message || err)
    if (err.message?.includes('GEMINI_API_KEY')) return res.status(503).json({ error: err.message })
    res.status(500).json({ error: err.message || 'Auto-optimization failed' })
  }
})

export { router as aiRouter }
