import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import { uploadRouter } from './routes/upload'
import { aiRouter } from './routes/ai'
import { generateRouter } from './routes/generate'
import { errorHandler } from './middleware/errorHandler'

import path from 'path'
import fs from 'fs'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3001

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 })
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many AI requests. Please wait a moment and try again.' }
})

// Enable CORS for development and production deployments
app.use(cors({
  origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(',').map(s => s.trim()) : true,
  credentials: true
}))
app.use(express.json({ limit: '15mb' }))
app.use(limiter)

app.use('/api/upload', uploadRouter)
app.use('/api/ai', aiLimiter, aiRouter)
app.use('/api/generate', generateRouter)
app.get('/api/health', (_req, res) =>
  res.json({ status: 'ok', version: '1.0.0', ts: new Date().toISOString() })
)

// Serve frontend if built (for all-in-one deployment on Render/Railway/Docker)
const clientDist = path.resolve(__dirname, '../../dist')
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist))
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next()
    res.sendFile(path.join(clientDist, 'index.html'))
  })
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 ATS CV Builder API → http://localhost:${PORT}`)
  console.log(
    `🤖 Gemini AI: ${process.env.GEMINI_API_KEY ? '✅ Connected' : '⚠️  No API key (add to server/.env)'}`
  )
})
