import axios from 'axios'
import { CVData } from '../types/cv'

const API_BASE = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api` 
  : '/api'

const api = axios.create({ baseURL: API_BASE, timeout: 90000 })

export async function uploadCV(file: File): Promise<CVData> {
  const fd = new FormData()
  fd.append('file', file)
  const { data } = await api.post('/upload/parse', fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return data.data
}

export async function parseCVText(text: string): Promise<CVData> {
  const { data } = await api.post('/upload/parse-text', { text })
  return data.data
}

export async function optimizeSection(section: string, content: string, context: string): Promise<string> {
  const { data } = await api.post('/ai/optimize', { section, content, context })
  return data.improved
}

export async function analyzeKeywords(cvText: string, jobDescription: string) {
  const { data } = await api.post('/ai/keywords', { cvText, jobDescription })
  return data
}

export async function autoOptimizeCV(cv: CVData, jobDescription?: string): Promise<CVData> {
  const { data } = await api.post('/ai/auto-optimize', { cv, jobDescription })
  return data.data
}

export async function generatePDF(cvData: CVData): Promise<Blob> {
  const { data } = await api.post('/generate/pdf', cvData, { responseType: 'blob' })
  return data
}

export async function generateDOCX(cvData: CVData): Promise<Blob> {
  const { data } = await api.post('/generate/docx', cvData, { responseType: 'blob' })
  return data
}