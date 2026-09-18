import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType } from 'docx'
import { CVData } from '../types/cv'

const fmt = (d: string) => {
  if (!d) return ''
  const parts = d.split('-')
  if (parts.length === 2) {
    const [y, m] = parts
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthNum = parseInt(m, 10)
    if (monthNum >= 1 && monthNum <= 12) {
      return `${months[monthNum - 1]} ${y}`
    }
  }
  return d
}

const noBorders = {
  top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
  right: { style: BorderStyle.NONE, size: 0, color: 'auto' }
}

export async function generateDOCX(cv: CVData): Promise<Buffer> {
  const { personal: p, summary, experience, education, skills, projects, certifications, languages, awards, customSections, settings: s } = cv

  const font = s?.font || 'Times New Roman'
  const fontSize = s?.fontSize || 10.5
  const bodySize = Math.round(fontSize * 2) // docx uses half-points
  const headingSize = Math.round((s?.headingSize || 13) * 2)
  const nameSize = headingSize + 14
  const marginTwips = Math.round((s?.margins || 0.6) * 1440)
  const accent = s?.accentColor ? s.accentColor.replace('#', '') : '000000'

  const sectionHead = (title: string) =>
    new Paragraph({
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          font,
          size: headingSize,
          color: accent !== '000000' && cv.settings?.template !== 'classic-ats' ? accent : '000000'
        })
      ],
      spacing: { before: 180, after: 100 },
      border: {
        bottom: {
          style: BorderStyle.SINGLE,
          size: 8,
          color: accent !== '000000' && cv.settings?.template !== 'classic-ats' ? accent : '000000',
          space: 8 // 8pt space between text baseline and border line so they never touch!
        }
      }
    })

  const createTwoColRow = (leftText: string, rightText: string, isLeftBold = true) =>
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: noBorders,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 70, type: WidthType.PERCENTAGE },
              borders: noBorders,
              children: [
                new Paragraph({
                  children: [new TextRun({ text: leftText, bold: isLeftBold, font, size: bodySize })],
                  spacing: { before: 80, after: 20 }
                })
              ]
            }),
            new TableCell({
              width: { size: 30, type: WidthType.PERCENTAGE },
              borders: noBorders,
              children: [
                new Paragraph({
                  children: [new TextRun({ text: rightText, font, size: bodySize })],
                  alignment: AlignmentType.RIGHT,
                  spacing: { before: 80, after: 20 }
                })
              ]
            })
          ]
        })
      ]
    })

  const children: (Paragraph | Table)[] = []

  // Header: Name
  children.push(
    new Paragraph({
      children: [new TextRun({ text: p.name || 'Your Full Name', bold: true, font, size: nameSize })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 }
    })
  )

  // Title
  if (p.title) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: p.title, font, size: bodySize + 2, color: '333333', bold: true })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 }
      })
    )
  }

  // Contact Info
  const contact = [p.email, p.phone, p.location, p.linkedin, p.github, p.portfolio].filter(Boolean)
  if (contact.length) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: contact.join('   |   '), font, size: bodySize - 1, color: '333333' })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 140 }
      })
    )
  }

  // Summary
  if (summary) {
    children.push(sectionHead('Professional Summary'))
    children.push(
      new Paragraph({
        children: [new TextRun({ text: summary, font, size: bodySize })],
        spacing: { after: 100 }
      })
    )
  }

  // Experience
  if (experience && experience.length) {
    children.push(sectionHead('Work Experience'))
    experience.forEach((e) => {
      const dateStr = `${fmt(e.startDate)} – ${e.current ? 'Present' : fmt(e.endDate)}`
      children.push(createTwoColRow(e.title, dateStr, true))

      if (e.company || e.location) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: e.company, italics: true, font, size: bodySize - 1, color: '444444' }),
              ...(e.location ? [new TextRun({ text: `  |  ${e.location}`, italics: true, font, size: bodySize - 1, color: '666666' })] : [])
            ],
            spacing: { after: 40 }
          })
        )
      }

      if (e.bullets && e.bullets.length) {
        e.bullets.forEach((b) => {
          if (b.trim()) {
            children.push(
              new Paragraph({
                children: [new TextRun({ text: `•  ${b}`, font, size: bodySize })],
                indent: { left: 360 },
                spacing: { after: 30 }
              })
            )
          }
        })
      }
    })
  }

  // Education
  if (education && education.length) {
    children.push(sectionHead('Education'))
    education.forEach((edu) => {
      const degreeStr = `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}`
      const dateStr = `${fmt(edu.startDate)} – ${fmt(edu.endDate)}`
      children.push(createTwoColRow(degreeStr, dateStr, true))

      const subParts: string[] = []
      if (edu.institution) subParts.push(edu.institution)
      if (edu.gpa) subParts.push(`GPA: ${edu.gpa}`)
      if (subParts.length) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: subParts.join('  |  '), font, size: bodySize - 1, color: '444444' })],
            spacing: { after: 40 }
          })
        )
      }

      if (edu.honors) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: `Honors: ${edu.honors}`, italics: true, font, size: bodySize - 1, color: '555555' })],
            spacing: { after: 40 }
          })
        )
      }
    })
  }

  // Skills
  if (skills && skills.length) {
    children.push(sectionHead('Technical & Professional Skills'))
    skills.forEach((cat) => {
      if (cat.skills && cat.skills.length) {
        children.push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: noBorders,
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 32, type: WidthType.PERCENTAGE },
                    borders: noBorders,
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: `${cat.name}:`, bold: true, font, size: bodySize })],
                        spacing: { before: 20, after: 20 }
                      })
                    ]
                  }),
                  new TableCell({
                    width: { size: 68, type: WidthType.PERCENTAGE },
                    borders: noBorders,
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: cat.skills.join(', '), font, size: bodySize })],
                        spacing: { before: 20, after: 20 }
                      })
                    ]
                  })
                ]
              })
            ]
          })
        )
      }
    })
  }

  // Projects
  if (projects && projects.length) {
    children.push(sectionHead('Projects'))
    projects.forEach((pr) => {
      const dateStr = pr.startDate ? `${fmt(pr.startDate)}${pr.endDate ? ` – ${fmt(pr.endDate)}` : ''}` : ''
      children.push(createTwoColRow(pr.name, dateStr, true))

      if (pr.technologies && pr.technologies.length) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: 'Technologies: ', bold: true, font, size: bodySize - 1, color: '555555' }),
              new TextRun({ text: pr.technologies.join(', '), italics: true, font, size: bodySize - 1, color: '555555' })
            ],
            spacing: { after: 30 }
          })
        )
      }

      if (pr.description) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: pr.description, font, size: bodySize })],
            spacing: { after: 40 }
          })
        )
      }

      const links = [pr.link ? `Link: ${pr.link}` : '', pr.github ? `GitHub: ${pr.github}` : ''].filter(Boolean)
      if (links.length) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: links.join('  |  '), font, size: bodySize - 1, color: '333333' })],
            spacing: { after: 60 }
          })
        )
      }
    })
  }

  // Certifications
  if (certifications && certifications.length) {
    children.push(sectionHead('Certifications'))
    certifications.forEach((c) => {
      const certTitle = `${c.name} – ${c.issuer}${c.credentialId ? ` (ID: ${c.credentialId})` : ''}`
      children.push(createTwoColRow(certTitle, c.date ? fmt(c.date) : '', false))
    })
  }

  // Languages
  if (languages && languages.length) {
    children.push(sectionHead('Languages'))
    children.push(
      new Paragraph({
        children: [new TextRun({ text: languages.map((l) => `${l.name} (${l.proficiency})`).join('   •   '), font, size: bodySize })],
        spacing: { after: 80 }
      })
    )
  }

  // Awards
  if (awards && awards.length) {
    children.push(sectionHead('Honors & Awards'))
    awards.forEach((a) => {
      const awardTitle = `${a.title}${a.issuer ? ` – ${a.issuer}` : ''}`
      children.push(createTwoColRow(awardTitle, a.date ? fmt(a.date) : '', true))
      if (a.description) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: a.description, font, size: bodySize - 1, color: '444444' })],
            spacing: { after: 40 }
          })
        )
      }
    })
  }

  // Custom Sections
  const validCustom = (customSections || []).filter((sec) => sec.title?.trim() || sec.entries?.some((e) => e.text?.trim()))
  validCustom.forEach((sec) => {
    if (sec.title) {
      children.push(sectionHead(sec.title))
    }
    sec.entries.forEach((e) => {
      if (e.text?.trim()) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: `•  ${e.text}`, font, size: bodySize })],
            indent: { left: 360 },
            spacing: { after: 30 }
          })
        )
      }
    })
  })

  return Packer.toBuffer(
    new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: marginTwips,
                right: marginTwips,
                bottom: marginTwips,
                left: marginTwips
              }
            }
          },
          children
        }
      ]
    })
  )
}
