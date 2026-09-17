import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx'
import { CVData } from '../types/cv'

const fmt = (d: string) => { if (!d) return ''; const [y,m]=d.split('-'); const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; return `${months[parseInt(m)-1]||''} ${y}` }

const sectionHead = (t: string) => new Paragraph({ text: t.toUpperCase(), heading: HeadingLevel.HEADING_2, spacing: { before: 200, after: 60 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '111111', space: 2 } } })

export async function generateDOCX(cv: CVData): Promise<Buffer> {
  const { personal: p, summary, experience, education, skills, projects, certifications, languages, awards } = cv
  const children: Paragraph[] = []

  children.push(new Paragraph({ children: [new TextRun({ text: p.name||'Your Name', bold: true, size: 44 })], alignment: AlignmentType.CENTER }))
  if (p.title) children.push(new Paragraph({ children: [new TextRun({ text: p.title, size: 24, color: '555555' })], alignment: AlignmentType.CENTER }))
  const contact = [p.email,p.phone,p.location,p.linkedin,p.github].filter(Boolean)
  if (contact.length) children.push(new Paragraph({ children: [new TextRun({ text: contact.join(' | '), size: 20 })], alignment: AlignmentType.CENTER, spacing: { after: 160 } }))

  if (summary) { children.push(sectionHead('Professional Summary')); children.push(new Paragraph({ text: summary })) }

  if (experience.length) {
    children.push(sectionHead('Work Experience'))
    experience.forEach(e => {
      children.push(new Paragraph({ children: [new TextRun({ text: e.title, bold: true }), new TextRun({ text: ` | ${e.company}` }), new TextRun({ text: `   ${fmt(e.startDate)} – ${e.current ? 'Present' : fmt(e.endDate)}`, color: '666666' })], spacing: { before: 120 } }))
      if (e.location) children.push(new Paragraph({ children: [new TextRun({ text: e.location, color: '666666', size: 20 })], spacing: { after: 40 } }))
      e.bullets.forEach(b => children.push(new Paragraph({ children: [new TextRun({ text: `• ${b}` })], indent: { left: 360 } })))
    })
  }

  if (education.length) {
    children.push(sectionHead('Education'))
    education.forEach(e => {
      children.push(new Paragraph({ children: [new TextRun({ text: `${e.degree}${e.field?` in ${e.field}`:''}`, bold: true }), new TextRun({ text: ` | ${e.institution}` })], spacing: { before: 120 } }))
      children.push(new Paragraph({ children: [new TextRun({ text: `${fmt(e.startDate)} – ${fmt(e.endDate)}${e.gpa?`   GPA: ${e.gpa}`:''}`, color: '666666', size: 20 })] }))
    })
  }

  if (skills.length) {
    children.push(sectionHead('Skills'))
    skills.filter(s => s.skills.length).forEach(s => children.push(new Paragraph({ children: [new TextRun({ text: `${s.name}: `, bold: true }), new TextRun({ text: s.skills.join(', ') })] })))
  }

  if (projects.length) {
    children.push(sectionHead('Projects'))
    projects.forEach(pr => {
      children.push(new Paragraph({ children: [new TextRun({ text: pr.name, bold: true })], spacing: { before: 100 } }))
      if (pr.technologies.length) children.push(new Paragraph({ children: [new TextRun({ text: `Technologies: ${pr.technologies.join(', ')}`, color: '555555', size: 20 })] }))
      if (pr.description) children.push(new Paragraph({ text: pr.description }))
    })
  }

  if (certifications.length) {
    children.push(sectionHead('Certifications'))
    certifications.forEach(c => children.push(new Paragraph({ children: [new TextRun({ text: c.name, bold: true }), new TextRun({ text: ` — ${c.issuer}${c.date?` (${fmt(c.date)})`:''}`})] })))
  }

  if (languages.length) {
    children.push(sectionHead('Languages'))
    children.push(new Paragraph({ text: languages.map(l => `${l.name} (${l.proficiency})`).join(' · ') }))
  }

  if (awards.length) {
    children.push(sectionHead('Awards & Achievements'))
    awards.forEach(a => {
      children.push(new Paragraph({ children: [new TextRun({ text: a.title, bold: true }), new TextRun({ text: `${a.issuer?` — ${a.issuer}`:''}${a.date?` (${a.date})`:''}`})] }))
      if (a.description) children.push(new Paragraph({ children: [new TextRun({ text: a.description })], indent: { left: 360 } }))
    })
  }

  return Packer.toBuffer(new Document({ sections: [{ children }] }))
}
