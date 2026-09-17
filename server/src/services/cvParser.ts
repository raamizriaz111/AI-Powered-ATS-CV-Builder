import * as pdfModule from 'pdf-parse'
import mammoth from 'mammoth'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { CVData } from '../types/cv'
import { v4 as uuidv4 } from 'uuid'

export async function parsePDF(buffer: Buffer): Promise<string> {
  try {
    // Handle pdf-parse v2.x (class PDFParse)
    if ((pdfModule as any).PDFParse) {
      const parser = new (pdfModule as any).PDFParse({ data: buffer })
      const result = await parser.getText()
      return result.text || ''
    }
    // Handle pdf-parse v1.x (function export)
    const fn = (pdfModule as any).default || pdfModule
    if (typeof fn === 'function') {
      const data = await fn(buffer)
      return data.text || ''
    }
    throw new Error('Unsupported pdf-parse version')
  } catch (err: any) {
    console.error('Error parsing PDF buffer:', err)
    throw new Error(`Failed to extract text from PDF: ${err.message || 'Corrupted or password-protected PDF'}`)
  }
}

export async function parseDOCX(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer })
    return result.value || ''
  } catch (err: any) {
    console.error('Error parsing DOCX buffer:', err)
    throw new Error(`Failed to extract text from DOCX: ${err.message || 'Corrupted document'}`)
  }
}

export async function parseTextToCV(rawText: string): Promise<CVData> {
  const apiKey = (process.env.GEMINI_API_KEY || '').trim()
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in server/.env. Please add your key.')
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  
  // High-availability working models in priority order
  const modelsToTry = [
    'gemini-flash-lite-latest',
    'gemini-3.1-flash-lite',
    'gemini-3.5-flash-lite',
    'gemini-3.6-flash',
    'gemini-flash-latest'
  ]

  let lastError: any = null
  let textResponse = ''

  const prompt = `You are an expert ATS CV and Resume parser. Extract ALL information from the following CV text into clean, structured JSON.
Do NOT omit any information. Ensure each section is completely populated with full text, bullet points, dates, and metrics.
Do NOT invent new jobs, degrees, or certifications that do not exist in the text.

Required JSON Structure:
{
  "personal": {
    "name": "Candidate Full Name",
    "title": "Professional Title / Headline (e.g. Software Engineer, Junior AI Engineer)",
    "email": "email address",
    "phone": "phone number",
    "location": "City, Country or Location",
    "linkedin": "LinkedIn URL or handle",
    "github": "GitHub URL or handle",
    "portfolio": "Portfolio URL or website"
  },
  "summary": "Professional summary, objective, or profile statement",
  "experience": [
    {
      "company": "Company Name",
      "title": "Job Title",
      "location": "Location",
      "startDate": "YYYY-MM or Start Date",
      "endDate": "YYYY-MM or End Date (empty if currently working)",
      "current": false,
      "bullets": ["Bullet point 1 detailing achievements/responsibilities", "Bullet point 2"]
    }
  ],
  "education": [
    {
      "institution": "University / College / School Name",
      "degree": "Degree (e.g. Bachelor of Science, BS, MS, High School)",
      "field": "Field of Study / Major (e.g. Computer Science)",
      "startDate": "Start Date or Year",
      "endDate": "End Date or Year",
      "gpa": "GPA or grade if mentioned",
      "honors": "Honors, distinctions, or relevant coursework"
    }
  ],
  "skills": [
    {
      "name": "Category Name (e.g. Programming Languages, Frameworks & Libraries, Tools & Cloud, Databases, Soft Skills)",
      "skills": ["Skill1", "Skill2", "Skill3"]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Project overview and accomplishments",
      "technologies": ["Tech1", "Tech2"],
      "link": "Live demo or link",
      "github": "GitHub repository URL",
      "startDate": "",
      "endDate": ""
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuing Organization (e.g. AWS, Coursera, Google, DeepLearning.AI)",
      "date": "Issue Date or Year",
      "expiryDate": "",
      "credentialId": "Credential ID if present",
      "url": "Verification URL if present"
    }
  ],
  "languages": [
    {
      "name": "Language Name (e.g. English, Urdu)",
      "proficiency": "Native"
    }
  ],
  "awards": [
    {
      "title": "Award Title",
      "issuer": "Organization or Event",
      "date": "Date or Year",
      "description": "Details about the award"
    }
  ],
  "customSections": [
    {
      "title": "Section Title (e.g. Volunteer Experience, Publications, Extracurricular)",
      "entries": [{ "text": "Details or bullet text" }]
    }
  ]
}

If the CV contains skills as a flat list, organize them into logical categories like "Programming Languages", "Frameworks & Libraries", "Tools & Platforms", "Databases", etc.
For languages, valid proficiency values are: "Native", "Fluent", "Advanced", "Intermediate", "Basic". Default to "Fluent" or "Native" if not explicitly specified.

CV Text:
${rawText.slice(0, 45000)}`

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.1
        }
      })
      const result = await model.generateContent(prompt)
      textResponse = result.response.text().trim()
      if (textResponse) {
        console.log(`[CV Parser] Successfully extracted data using model: ${modelName}`)
        break
      }
    } catch (err: any) {
      console.warn(`[CV Parser] Model ${modelName} encountered: ${err.status || err.message}, trying fallback...`)
      lastError = err
    }
  }

  if (!textResponse) {
    throw new Error(`AI extraction failed across models: ${lastError?.message || 'Please try again in a few moments.'}`)
  }

  const clean = textResponse
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim()

  let parsed: any
  try {
    parsed = JSON.parse(clean)
  } catch (parseErr) {
    console.error('Failed to parse Gemini JSON output:', textResponse)
    throw new Error('AI produced malformed JSON. Please try uploading the document again.')
  }

  const ensureId = (arr: any[]) =>
    (arr || []).map((item: any) => ({
      ...item,
      id: item.id && !String(item.id).startsWith('gen') ? item.id : uuidv4()
    }))

  const cvData: CVData = {
    id: uuidv4(),
    name: parsed.personal?.name ? `${parsed.personal.name}'s CV` : 'Imported CV',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    personal: {
      name: parsed.personal?.name || '',
      title: parsed.personal?.title || '',
      email: parsed.personal?.email || '',
      phone: parsed.personal?.phone || '',
      location: parsed.personal?.location || '',
      linkedin: parsed.personal?.linkedin || '',
      github: parsed.personal?.github || '',
      portfolio: parsed.personal?.portfolio || ''
    },
    summary: parsed.summary || '',
    experience: ensureId(
      (parsed.experience || []).map((exp: any) => ({
        ...exp,
        current: Boolean(exp.current),
        bullets: Array.isArray(exp.bullets) ? exp.bullets.filter(Boolean) : []
      }))
    ),
    education: ensureId(
      (parsed.education || []).map((edu: any) => ({
        ...edu,
        degree: edu.degree || '',
        institution: edu.institution || '',
        field: edu.field || '',
        startDate: edu.startDate || '',
        endDate: edu.endDate || '',
        gpa: edu.gpa || '',
        honors: edu.honors || ''
      }))
    ),
    skills: ensureId(
      (parsed.skills || []).map((cat: any) => ({
        name: cat.name || 'Technical Skills',
        skills: Array.isArray(cat.skills) ? cat.skills.filter(Boolean) : []
      }))
    ),
    projects: ensureId(
      (parsed.projects || []).map((proj: any) => ({
        ...proj,
        technologies: Array.isArray(proj.technologies) ? proj.technologies.filter(Boolean) : []
      }))
    ),
    certifications: ensureId(parsed.certifications || []),
    languages: ensureId(
      (parsed.languages || []).map((lang: any) => ({
        name: lang.name || '',
        proficiency: ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'].includes(lang.proficiency)
          ? lang.proficiency
          : 'Fluent'
      }))
    ),
    awards: ensureId(parsed.awards || []),
    customSections: (parsed.customSections || []).map((sec: any) => ({
      id: uuidv4(),
      title: sec.title || 'Additional Information',
      entries: (sec.entries || []).map((e: any) => ({
        id: uuidv4(),
        text: typeof e === 'string' ? e : e.text || ''
      }))
    })),
    settings: {
      template: 'classic-ats',
      font: 'Times New Roman',
      fontSize: 11,
      headingSize: 14,
      lineSpacing: 1.15,
      margins: 0.6,
      accentColor: '#2563eb'
    }
  }

  return cvData
}
