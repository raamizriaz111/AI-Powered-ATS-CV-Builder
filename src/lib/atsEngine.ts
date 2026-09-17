import { CVData, ATSResult, ATSIssue, ATSCategoryScore } from '../types/cv'
import { generateId } from './utils'

export function calculateATS(cv: CVData, jobDescription: string = ''): ATSResult {
  const categories: ATSCategoryScore[] = []
  const allIssues: ATSIssue[] = []
  
  let contactScore = 0
  const contactMax = 15
  const contactIssues: ATSIssue[] = []
  const p = cv.personal
  if (p.name) contactScore += 3; else contactIssues.push({id: generateId(), category: 'Contact', severity: 'critical', message: 'Missing name', fix: 'Add your full name'})
  if (p.email) contactScore += 3; else contactIssues.push({id: generateId(), category: 'Contact', severity: 'critical', message: 'Missing email', fix: 'Add a professional email'})
  if (p.phone) contactScore += 3; else contactIssues.push({id: generateId(), category: 'Contact', severity: 'critical', message: 'Missing phone', fix: 'Add a phone number'})
  if (p.location) contactScore += 3; else contactIssues.push({id: generateId(), category: 'Contact', severity: 'warning', message: 'Missing location', fix: 'Add your city and state'})
  if (p.linkedin) contactScore += 3; else contactIssues.push({id: generateId(), category: 'Contact', severity: 'suggestion', message: 'Missing LinkedIn', fix: 'Add your LinkedIn URL'})
  
  categories.push({ name: 'Contact Info', score: Math.min(contactScore, contactMax), maxScore: contactMax, issues: contactIssues })
  allIssues.push(...contactIssues)

  let summaryScore = 0
  const summaryMax = 10
  const summaryIssues: ATSIssue[] = []
  const len = cv.summary.length
  if (len >= 50 && len <= 400) summaryScore += 10
  else if (len >= 20 && len < 50) {
    summaryScore += 5
    summaryIssues.push({id: generateId(), category: 'Summary', severity: 'warning', message: 'Summary too short', fix: 'Expand summary to 50-400 chars'})
  } else if (len > 400) {
    summaryScore += 5
    summaryIssues.push({id: generateId(), category: 'Summary', severity: 'warning', message: 'Summary too long', fix: 'Condense summary to under 400 chars'})
  } else {
    summaryIssues.push({id: generateId(), category: 'Summary', severity: 'critical', message: 'Missing professional summary', fix: 'Add a summary'})
  }
  
  categories.push({ name: 'Summary', score: Math.min(summaryScore, summaryMax), maxScore: summaryMax, issues: summaryIssues })
  allIssues.push(...summaryIssues)

  let expScore = 0
  const expMax = 25
  const expIssues: ATSIssue[] = []
  if (cv.experience.length > 0) {
    expScore += 5
    let bulletDigits = false
    let entryCount = 0
    for (const exp of cv.experience) {
      if (entryCount < 4) { expScore += 3; entryCount += 1 }
      for (const bullet of exp.bullets) { if (/\d/.test(bullet)) bulletDigits = true }
    }
    if (bulletDigits) expScore += 8
    else expIssues.push({id: generateId(), category: 'Experience', severity: 'suggestion', message: 'No metrics', fix: 'Add numbers to bullets'})
  } else {
    expIssues.push({id: generateId(), category: 'Experience', severity: 'critical', message: 'Missing experience', fix: 'Add experience'})
  }

  categories.push({ name: 'Experience', score: Math.min(expScore, expMax), maxScore: expMax, issues: expIssues })
  allIssues.push(...expIssues)

  let eduScore = 0
  const eduMax = 10
  const eduIssues: ATSIssue[] = []
  if (cv.education.length > 0) {
    eduScore += 10
    let hasGPA = cv.education.some(e => e.gpa && e.gpa.trim().length > 0)
    if (hasGPA) eduScore = Math.min(eduScore + 3, eduMax)
  } else {
    eduIssues.push({id: generateId(), category: 'Education', severity: 'critical', message: 'Missing education', fix: 'Add education'})
  }
  categories.push({ name: 'Education', score: Math.min(eduScore, eduMax), maxScore: eduMax, issues: eduIssues })
  allIssues.push(...eduIssues)

  let skillsScore = 0
  const skillsMax = 15
  const skillsIssues: ATSIssue[] = []
  const numCats = Math.min(cv.skills.length, 5)
  skillsScore += numCats * 3
  let numSkills = 0
  cv.skills.forEach(c => numSkills += c.skills.length)
  skillsScore += Math.min(numSkills, 10)
  if (skillsScore === 0) {
    skillsIssues.push({id: generateId(), category: 'Skills', severity: 'critical', message: 'No skills', fix: 'Add skills'})
  }
  categories.push({ name: 'Skills', score: Math.min(skillsScore, skillsMax), maxScore: skillsMax, issues: skillsIssues })
  allIssues.push(...skillsIssues)

  let fmtScore = 0
  const fmtMax = 15
  const fmtIssues: ATSIssue[] = []
  const hasCore = (p.name || p.email) && cv.experience.length > 0 && cv.education.length > 0 && cv.skills.length > 0
  if (hasCore) fmtScore += 4
  else fmtIssues.push({id: generateId(), category: 'Formatting', severity: 'critical', message: 'Missing core sections', fix: 'Ensure main sections filled'})
  if (cv.experience.some(e => e.bullets.length > 0)) fmtScore += 4
  else if (cv.experience.length > 0) fmtIssues.push({id: generateId(), category: 'Formatting', severity: 'warning', message: 'Experience lacks bullets', fix: 'Add bullets'})
  if (cv.summary) fmtScore += 4
  if (cv.skills.length > 0) fmtScore += 3
  categories.push({ name: 'Formatting', score: Math.min(fmtScore, fmtMax), maxScore: fmtMax, issues: fmtIssues })
  allIssues.push(...fmtIssues)

  let kwScore = 7
  const kwMax = 10
  const kwIssues: ATSIssue[] = []
  if (jobDescription) kwScore = 10
  categories.push({ name: 'Keywords', score: Math.min(kwScore, kwMax), maxScore: kwMax, issues: kwIssues })
  allIssues.push(...kwIssues)

  const total = categories.reduce((sum, cat) => sum + cat.score, 0)
  return { total, categories, issues: allIssues, passedChecks: [] }
}