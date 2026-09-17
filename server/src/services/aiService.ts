import { GoogleGenerativeAI } from '@google/generative-ai'
import { CVData } from '../types/cv'
import { v4 as uuidv4 } from 'uuid'

const MODELS = [
  'gemini-flash-lite-latest',
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash-lite',
  'gemini-3.6-flash',
  'gemini-flash-latest'
]

function getGenAI() {
  const apiKey = (process.env.GEMINI_API_KEY || '').trim()
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured. Add it to server/.env')
  return new GoogleGenerativeAI(apiKey)
}

export async function optimizeSection(section: string, content: string, context: string): Promise<string> {
  const genAI = getGenAI()
  const prompt = `You are an expert CV writer. Improve this CV section. Rules: NEVER invent new jobs, degrees, companies, or metrics. Only rephrase and strengthen existing content with powerful action verbs and clear impact.

Section: ${section}
Person context: ${context}

Original:
${content}

Return ONLY the improved text:`

  for (const modelName of MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName })
      const result = await model.generateContent(prompt)
      return result.response.text().trim()
    } catch (e: any) {
      console.warn(`[AI Optimize] ${modelName} error:`, e.status || e.message)
    }
  }
  throw new Error('All AI models are currently busy. Please try again in a moment.')
}

export async function analyzeKeywords(cvText: string, jobDescription: string): Promise<{ matchedKeywords: string[], missingKeywords: string[], matchScore: number, suggestions: string[] }> {
  const genAI = getGenAI()
  const prompt = `Compare this CV against the job description. Return ONLY valid JSON matching this schema:
{
  "matchedKeywords": ["keyword1", "keyword2"],
  "missingKeywords": ["keyword1", "keyword2"],
  "matchScore": 75,
  "suggestions": ["Add 'Docker' to skills", "Highlight REST API experience"]
}

Job Description:
${jobDescription.slice(0, 5000)}

CV:
${cvText.slice(0, 10000)}`

  for (const modelName of MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { responseMimeType: 'application/json' }
      })
      const result = await model.generateContent(prompt)
      const text = result.response.text().trim()
      return JSON.parse(text)
    } catch (e: any) {
      console.warn(`[AI Keywords] ${modelName} error:`, e.status || e.message)
    }
  }
  throw new Error('All AI models are currently busy. Please try again in a moment.')
}

export async function autoOptimizeCV(cv: CVData, targetJobDescription: string = ''): Promise<CVData> {
  const genAI = getGenAI()
  const prompt = `You are an elite ATS Optimization Specialist and Executive Resume Writer.
Your goal is to optimize this CV to achieve a 100/100 ATS Compatibility Score while keeping the candidate's authentic background truthful.

Strict ATS Optimization Rules:
1. SUMMARY:
   - Rewrite the summary into a high-impact professional statement strictly between 180 and 350 characters.
   - Infuse core competencies, target keywords, and value proposition.

2. WORK EXPERIENCE:
   - Maintain existing companies, titles, and dates.
   - Ensure every experience has 3-4 bullet points.
   - Every bullet MUST start with a past-tense action verb (e.g. Engineered, Spearheaded, Accelerated, Architected, Optimized).
   - At least 2-3 bullets per role MUST include measurable numbers, metrics, or percentages (e.g., 'reduced query latency by 35%', 'handling 10,000+ daily requests', 'boosted team velocity by 25%').

3. SKILLS:
   - Organize into 4 to 5 distinct categories (e.g. 'Programming Languages', 'Frameworks & Libraries', 'Cloud & DevOps', 'Databases & Storage', 'Developer Tools & Practices').
   - Include 3-6 specific high-demand skills per category (total 15-25 skills).

4. PROJECTS:
   - Make project descriptions clear, action-oriented, and highlight key technologies used.

Return ONLY valid JSON matching this schema:
{
  "summary": "High-impact summary between 180-350 chars",
  "experience": [
    {
      "company": "string",
      "title": "string",
      "location": "string",
      "startDate": "string",
      "endDate": "string",
      "current": false,
      "bullets": ["Action verb + metric 1", "Action verb + metric 2"]
    }
  ],
  "skills": [
    {
      "name": "Category Name",
      "skills": ["Skill1", "Skill2", "Skill3"]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Project overview",
      "technologies": ["Tech1", "Tech2"],
      "link": "link",
      "github": "github",
      "startDate": "string",
      "endDate": "string"
    }
  ]
}

Target Job Description:
${targetJobDescription.slice(0, 3000) || 'Relevant engineering and technology roles'}

Current CV:
${JSON.stringify({
  personal: cv.personal,
  summary: cv.summary,
  experience: cv.experience,
  education: cv.education,
  skills: cv.skills,
  projects: cv.projects
})}`

  let rawJson = ''
  for (const modelName of MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { responseMimeType: 'application/json', temperature: 0.2 }
      })
      const result = await model.generateContent(prompt)
      rawJson = result.response.text().trim()
      if (rawJson) break
    } catch (e: any) {
      console.warn(`[AI Auto-Optimize] ${modelName} error:`, e.status || e.message)
    }
  }

  if (!rawJson) {
    throw new Error('AI optimization failed across available models. Please try again.')
  }

  const parsed = JSON.parse(rawJson)

  // Merge improvements back into the CV while keeping IDs and other sections
  const cloned: CVData = JSON.parse(JSON.stringify(cv))
  cloned.updatedAt = new Date().toISOString()

  if (parsed.summary && typeof parsed.summary === 'string') {
    cloned.summary = parsed.summary
  }

  if (Array.isArray(parsed.experience) && parsed.experience.length > 0) {
    cloned.experience = parsed.experience.map((exp: any, idx: number) => ({
      id: cloned.experience[idx]?.id || uuidv4(),
      company: exp.company || cloned.experience[idx]?.company || '',
      title: exp.title || cloned.experience[idx]?.title || '',
      location: exp.location || cloned.experience[idx]?.location || '',
      startDate: exp.startDate || cloned.experience[idx]?.startDate || '',
      endDate: exp.endDate || cloned.experience[idx]?.endDate || '',
      current: Boolean(exp.current),
      bullets: Array.isArray(exp.bullets) ? exp.bullets.filter(Boolean) : cloned.experience[idx]?.bullets || []
    }))
  }

  if (Array.isArray(parsed.skills) && parsed.skills.length > 0) {
    cloned.skills = parsed.skills.map((cat: any, idx: number) => ({
      id: cloned.skills[idx]?.id || uuidv4(),
      name: cat.name || 'Core Skills',
      skills: Array.isArray(cat.skills) ? cat.skills.filter(Boolean) : []
    }))
  }

  if (Array.isArray(parsed.projects) && parsed.projects.length > 0) {
    cloned.projects = parsed.projects.map((proj: any, idx: number) => ({
      id: cloned.projects[idx]?.id || uuidv4(),
      name: proj.name || cloned.projects[idx]?.name || '',
      description: proj.description || cloned.projects[idx]?.description || '',
      technologies: Array.isArray(proj.technologies) ? proj.technologies.filter(Boolean) : cloned.projects[idx]?.technologies || [],
      link: proj.link || cloned.projects[idx]?.link || '',
      github: proj.github || cloned.projects[idx]?.github || '',
      startDate: proj.startDate || cloned.projects[idx]?.startDate || '',
      endDate: proj.endDate || cloned.projects[idx]?.endDate || ''
    }))
  }

  return cloned
}
