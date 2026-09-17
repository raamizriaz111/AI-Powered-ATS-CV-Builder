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

// 1. Classic ATS Template
function renderClassicATS(cv: CVData): string {
  const { personal: p, summary, experience, education, skills, projects, certifications, languages, awards, customSections, settings: s } = cv
  const font = s.font || 'Times New Roman, serif'
  const fontSize = s.fontSize || 11
  const headingSize = s.headingSize || 14
  const margin = s.margins || 0.6

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: ${font}; font-size: ${fontSize}pt; line-height: ${s.lineSpacing || 1.15}; color: #000; padding: ${margin}in; background: #fff; }
h1 { font-size: ${headingSize + 8}pt; font-weight: bold; text-align: center; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
.title { font-size: ${fontSize + 1}pt; text-align: center; font-weight: bold; color: #333; margin-bottom: 4px; }
.contact { text-align: center; font-size: ${fontSize - 0.5}pt; color: #333; margin-bottom: 14px; }
h2 { font-size: ${headingSize}pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1.5px solid #000; padding-bottom: 2px; margin: 12px 0 6px; }
.row { display: flex; justify-content: space-between; font-weight: bold; }
.sub-row { display: flex; justify-content: space-between; font-style: italic; color: #333; margin-bottom: 2px; }
ul { margin: 3px 0 6px 20px; } li { margin-bottom: 2px; }
.skill-row { margin-bottom: 4px; }
</style></head><body>
<h1>${p.name || ''}</h1>
${p.title ? `<div class="title">${p.title}</div>` : ''}
<div class="contact">${[p.email, p.phone, p.location, p.linkedin, p.github, p.portfolio].filter(Boolean).join('  |  ')}</div>
${summary ? `<h2>Professional Summary</h2><div style="text-align:justify;">${summary}</div>` : ''}
${experience.length ? `<h2>Work Experience</h2>${experience.map(e => `
  <div style="margin-bottom: 10px;">
    <div class="row"><span>${e.title}</span><span>${fmt(e.startDate)} – ${e.current ? 'Present' : fmt(e.endDate)}</span></div>
    <div class="sub-row"><span>${e.company}</span>${e.location ? `<span>${e.location}</span>` : ''}</div>
    ${e.bullets.length ? `<ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
  </div>`).join('')}` : ''}
${education.length ? `<h2>Education</h2>${education.map(edu => `
  <div style="margin-bottom: 8px;">
    <div class="row"><span>${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</span><span>${fmt(edu.startDate)} – ${fmt(edu.endDate)}</span></div>
    <div style="display:flex; justify-content:space-between;"><span>${edu.institution}</span>${edu.gpa ? `<span>GPA: ${edu.gpa}</span>` : ''}</div>
    ${edu.honors ? `<div style="font-style:italic; font-size:0.95em; color:#444;">${edu.honors}</div>` : ''}
  </div>`).join('')}` : ''}
${skills.length ? `<h2>Technical & Professional Skills</h2>${skills.map(s => `<div class="skill-row"><strong>${s.name}: </strong>${s.skills.join(', ')}</div>`).join('')}` : ''}
${projects.length ? `<h2>Projects</h2>${projects.map(pr => `
  <div style="margin-bottom: 8px;">
    <div class="row"><span>${pr.name}</span>${pr.link ? `<span>${pr.link}</span>` : ''}</div>
    ${pr.technologies.length ? `<div style="font-style:italic; color:#555; font-size:0.95em; margin-bottom:2px;">Technologies: ${pr.technologies.join(', ')}</div>` : ''}
    <div>${pr.description || ''}</div>
  </div>`).join('')}` : ''}
${certifications.length ? `<h2>Certifications</h2>${certifications.map(c => `
  <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
    <span><strong>${c.name}</strong> – ${c.issuer}${c.credentialId ? ` (ID: ${c.credentialId})` : ''}</span>
    <span>${fmt(c.date)}</span>
  </div>`).join('')}` : ''}
${(languages.length || awards.length) ? `
  <div style="display:flex; gap:24px; margin-top:8px;">
    ${languages.length ? `<div style="flex:1;"><h2>Languages</h2><div>${languages.map(l => `${l.name} (${l.proficiency})`).join('  •  ')}</div></div>` : ''}
    ${awards.length ? `<div style="flex:1;"><h2>Awards</h2>${awards.map(a => `<div style="margin-bottom:3px;"><strong>${a.title}</strong>${a.issuer ? ` – ${a.issuer}` : ''} ${a.date ? `(${fmt(a.date)})` : ''}</div>`).join('')}</div>` : ''}
  </div>` : ''}
${customSections.map(sec => `
  <h2>${sec.title}</h2>
  <ul>${sec.entries.map(e => `<li>${e.text}</li>`).join('')}</ul>`).join('')}
</body></html>`
}

// 2. Modern Template (Two-Column with Color Accent)
function renderModern(cv: CVData): string {
  const { personal: p, summary, experience, education, skills, projects, certifications, languages, awards, customSections, settings: s } = cv
  const accent = s.accentColor || '#2563eb'
  const font = s.font || 'Arial, sans-serif'
  const fontSize = s.fontSize || 10
  const headingSize = s.headingSize || 13

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: ${font}; font-size: ${fontSize}pt; line-height: ${s.lineSpacing || 1.15}; color: #2d3748; background: #fff; display: flex; min-height: 100vh; }
.sidebar { width: 33%; background-color: ${accent}; color: #ffffff; padding: 18mm 12mm; display: flex; flex-direction: column; gap: 16px; }
.sidebar h1 { font-size: ${headingSize + 6}pt; font-weight: bold; line-height: 1.1; margin-bottom: 4px; }
.sidebar .job-title { font-size: ${fontSize + 1}pt; opacity: 0.95; margin-bottom: 8px; }
.sidebar h3 { font-size: ${fontSize + 1}pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 4px; margin-bottom: 8px; }
.sidebar .contact-item { margin-bottom: 5px; font-size: ${fontSize - 0.5}pt; }
.tag { display: inline-block; background: rgba(255,255,255,0.2); padding: 2px 7px; border-radius: 3px; font-size: ${fontSize - 1.5}pt; margin: 2px; }

.main { width: 67%; padding: 18mm 16mm; display: flex; flex-direction: column; gap: 16px; }
.main h2 { font-size: ${headingSize}pt; font-weight: bold; color: ${accent}; border-bottom: 2px solid ${accent}; padding-bottom: 3px; margin-bottom: 8px; }
.exp-header { display: flex; justify-content: space-between; font-weight: bold; }
.exp-sub { font-weight: 600; color: #718096; font-size: ${fontSize - 0.5}pt; margin-bottom: 4px; }
ul { margin: 0 0 8px 16px; color: #4a5568; } li { margin-bottom: 3px; }
</style></head><body>
<div class="sidebar">
  <div>
    <h1>${p.name || ''}</h1>
    ${p.title ? `<div class="job-title">${p.title}</div>` : ''}
  </div>

  <div>
    <h3>Contact</h3>
    ${p.email ? `<div class="contact-item">✉ ${p.email}</div>` : ''}
    ${p.phone ? `<div class="contact-item">☎ ${p.phone}</div>` : ''}
    ${p.location ? `<div class="contact-item">📍 ${p.location}</div>` : ''}
    ${p.linkedin ? `<div class="contact-item">in ${p.linkedin}</div>` : ''}
    ${p.github ? `<div class="contact-item">⚡ ${p.github}</div>` : ''}
    ${p.portfolio ? `<div class="contact-item">🌐 ${p.portfolio}</div>` : ''}
  </div>

  ${skills.length ? `
  <div>
    <h3>Skills</h3>
    ${skills.map(cat => `
      <div style="margin-bottom:8px;">
        <div style="font-weight:bold; font-size:${fontSize - 0.5}pt; margin-bottom:2px;">${cat.name}</div>
        <div>${cat.skills.map(s => `<span class="tag">${s}</span>`).join('')}</div>
      </div>`).join('')}
  </div>` : ''}

  ${languages.length ? `
  <div>
    <h3>Languages</h3>
    ${languages.map(l => `<div style="margin-bottom:3px; font-size:${fontSize - 0.5}pt;"><strong>${l.name}</strong> <span style="opacity:0.85;">(${l.proficiency})</span></div>`).join('')}
  </div>` : ''}

  ${certifications.length ? `
  <div>
    <h3>Certifications</h3>
    ${certifications.map(c => `<div style="margin-bottom:6px; font-size:${fontSize - 1}pt;"><div style="font-weight:bold;">${c.name}</div><div style="opacity:0.85;">${c.issuer} ${c.date ? `• ${fmt(c.date)}` : ''}</div></div>`).join('')}
  </div>` : ''}
</div>

<div class="main">
  ${summary ? `<div><h2>Profile</h2><div style="color:#4a5568;">${summary}</div></div>` : ''}
  ${experience.length ? `
  <div>
    <h2>Experience</h2>
    ${experience.map(e => `
      <div style="margin-bottom:12px;">
        <div class="exp-header"><span>${e.title}</span><span style="color:${accent}; font-size:0.9em;">${fmt(e.startDate)} – ${e.current ? 'Present' : fmt(e.endDate)}</span></div>
        <div class="exp-sub">${e.company}${e.location ? ` | ${e.location}` : ''}</div>
        ${e.bullets.length ? `<ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
      </div>`).join('')}
  </div>` : ''}

  ${projects.length ? `
  <div>
    <h2>Projects</h2>
    ${projects.map(pr => `
      <div style="margin-bottom:10px;">
        <div class="exp-header"><span>${pr.name}</span>${pr.link ? `<span style="color:${accent}; font-size:0.85em;">${pr.link}</span>` : ''}</div>
        ${pr.technologies.length ? `<div style="color:#718096; font-size:0.85em; margin-bottom:2px;">${pr.technologies.join(' • ')}</div>` : ''}
        ${pr.description ? `<div style="color:#4a5568;">${pr.description}</div>` : ''}
      </div>`).join('')}
  </div>` : ''}

  ${education.length ? `
  <div>
    <h2>Education</h2>
    ${education.map(edu => `
      <div style="margin-bottom:8px;">
        <div class="exp-header"><span>${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</span><span style="color:${accent}; font-size:0.9em;">${fmt(edu.startDate)} – ${fmt(edu.endDate)}</span></div>
        <div style="color:#718096; font-size:${fontSize - 0.5}pt;">${edu.institution}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
      </div>`).join('')}
  </div>` : ''}

  ${awards.length ? `
  <div>
    <h2>Awards</h2>
    ${awards.map(a => `<div style="margin-bottom:4px;"><strong>${a.title}</strong> – ${a.issuer} ${a.date ? `(${fmt(a.date)})` : ''}</div>`).join('')}
  </div>` : ''}

  ${customSections.map(sec => `
  <div>
    <h2>${sec.title}</h2>
    <ul>${sec.entries.map(e => `<li>${e.text}</li>`).join('')}</ul>
  </div>`).join('')}
</div>
</body></html>`
}

// 3. Minimal Template (Scandinavian Whitespace)
function renderMinimal(cv: CVData): string {
  const { personal: p, summary, experience, education, skills, projects, certifications, languages, awards, customSections, settings: s } = cv
  const font = s.font || 'Helvetica, Arial, sans-serif'
  const fontSize = s.fontSize || 10.5
  const headingSize = s.headingSize || 13
  const margin = s.margins || 0.6

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: ${font}; font-size: ${fontSize}pt; line-height: ${s.lineSpacing + 0.1 || 1.25}; color: #1a202c; padding: ${margin}in; background: #fff; }
h1 { font-size: ${headingSize + 8}pt; font-weight: 300; letter-spacing: -0.5px; color: #000; margin-bottom: 2px; }
.title { font-size: ${fontSize + 2}pt; color: #718096; margin-bottom: 6px; }
.contact { font-size: ${fontSize - 1}pt; color: #a0aec0; display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 16px; }
.divider { height: 1px; background-color: #e2e8f0; margin-bottom: 16px; }
.sec-title { font-size: ${fontSize - 1}pt; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #a0aec0; margin: 14px 0 8px; }
.row { display: flex; justify-content: space-between; align-items: baseline; }
ul { margin: 0 0 6px 16px; color: #4a5568; } li { margin-bottom: 2px; }
</style></head><body>
<h1>${p.name || ''}</h1>
${p.title ? `<div class="title">${p.title}</div>` : ''}
<div class="contact">${[p.email, p.phone, p.location, p.linkedin, p.github, p.portfolio].filter(Boolean).map(x => `<span>${x}</span>`).join('')}</div>
<div class="divider"></div>

${summary ? `<div class="sec-title">About</div><div style="color:#4a5568;">${summary}</div>` : ''}

${experience.length ? `
<div class="sec-title">Experience</div>
${experience.map(e => `
  <div style="margin-bottom:12px;">
    <div class="row"><span style="font-weight:600; color:#1a202c;">${e.title}</span><span style="font-size:${fontSize - 1}pt; color:#a0aec0;">${fmt(e.startDate)} — ${e.current ? 'Present' : fmt(e.endDate)}</span></div>
    <div style="color:#718096; font-size:${fontSize - 0.5}pt; margin-bottom:3px;">${e.company}${e.location ? ` · ${e.location}` : ''}</div>
    ${e.bullets.length ? `<ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
  </div>`).join('')}` : ''}

${education.length ? `
<div class="sec-title">Education</div>
${education.map(edu => `
  <div style="margin-bottom:8px;">
    <div class="row"><span style="font-weight:600; color:#1a202c;">${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</span><span style="font-size:${fontSize - 1}pt; color:#a0aec0;">${fmt(edu.startDate)} — ${fmt(edu.endDate)}</span></div>
    <div style="color:#718096; font-size:${fontSize - 0.5}pt;">${edu.institution}${edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</div>
  </div>`).join('')}` : ''}

${projects.length ? `
<div class="sec-title">Projects</div>
${projects.map(pr => `
  <div style="margin-bottom:8px;">
    <div class="row"><span style="font-weight:600; color:#1a202c;">${pr.name}</span>${pr.link ? `<span style="font-size:0.85em; color:#718096;">${pr.link}</span>` : ''}</div>
    ${pr.technologies.length ? `<div style="font-size:0.85em; color:#a0aec0; margin-bottom:2px;">${pr.technologies.join(' · ')}</div>` : ''}
    <div style="color:#4a5568;">${pr.description || ''}</div>
  </div>`).join('')}` : ''}

${skills.length ? `
<div class="sec-title">Skills</div>
${skills.map(s => `<div style="display:flex; gap:8px; margin-bottom:3px;"><span style="font-weight:600; min-width:140px; color:#2d3748;">${s.name}:</span><span style="color:#4a5568;">${s.skills.join(', ')}</span></div>`).join('')}` : ''}

${(certifications.length || languages.length) ? `
<div style="display:flex; gap:24px; margin-top:8px;">
  ${certifications.length ? `<div style="flex:1;"><div class="sec-title">Certifications</div>${certifications.map(c => `<div style="margin-bottom:3px; font-size:${fontSize - 0.5}pt;"><strong>${c.name}</strong> — <span style="color:#718096;">${c.issuer}</span></div>`).join('')}</div>` : ''}
  ${languages.length ? `<div style="flex:1;"><div class="sec-title">Languages</div><div style="font-size:${fontSize - 0.5}pt; color:#4a5568;">${languages.map(l => `${l.name} (${l.proficiency})`).join('  ·  ')}</div></div>` : ''}
</div>` : ''}

${awards.length ? `<div class="sec-title">Awards</div>${awards.map(a => `<div style="margin-bottom:3px;"><strong>${a.title}</strong> · ${a.issuer} ${a.date ? `(${fmt(a.date)})` : ''}</div>`).join('')}` : ''}

${customSections.map(sec => `<div class="sec-title">${sec.title}</div><ul>${sec.entries.map(e => `<li>${e.text}</li>`).join('')}</ul>`).join('')}
</body></html>`
}

// 4. Executive Template (Top Banner & Authoritative Structure)
function renderExecutive(cv: CVData): string {
  const { personal: p, summary, experience, education, skills, projects, certifications, languages, awards, customSections, settings: s } = cv
  const accent = s.accentColor || '#1e3a8a'
  const font = s.font || 'Georgia, serif'
  const fontSize = s.fontSize || 10.5
  const headingSize = s.headingSize || 13

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: ${font}; font-size: ${fontSize}pt; line-height: ${s.lineSpacing || 1.15}; color: #1a202c; background: #fff; }
.banner { background-color: ${accent}; color: #ffffff; padding: 20px 28px; text-align: center; }
.banner h1 { font-size: ${headingSize + 9}pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px; }
.banner .job-title { font-size: ${fontSize + 2}pt; font-weight: 300; text-transform: uppercase; letter-spacing: 2px; opacity: 0.95; }
.sub-bar { background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 6px 28px; display: flex; justify-content: center; gap: 18px; font-size: ${fontSize - 1}pt; color: #475569; }
.content { padding: ${s.margins || 0.6}in; }
.sec-title { font-size: ${headingSize}pt; font-weight: bold; color: ${accent}; border-bottom: 2px solid ${accent}; padding-bottom: 2px; margin: 12px 0 8px; text-transform: uppercase; letter-spacing: 1px; }
.row { display: flex; justify-content: space-between; font-weight: bold; }
ul { margin: 0 0 6px 18px; color: #334155; } li { margin-bottom: 2px; }
</style></head><body>
<div class="banner">
  <h1>${p.name || ''}</h1>
  ${p.title ? `<div class="job-title">${p.title}</div>` : ''}
</div>
<div class="sub-bar">
  ${[p.email, p.phone, p.location, p.linkedin, p.github, p.portfolio].filter(Boolean).map(x => `<span>${x}</span>`).join('')}
</div>

<div class="content">
  ${summary ? `<div class="sec-title">Executive Profile</div><div style="text-align:justify; color:#334155;">${summary}</div>` : ''}

  ${skills.length ? `
  <div class="sec-title">Core Competencies & Skills</div>
  <div style="display:grid; grid-template-columns: 1fr 1fr; gap:6px;">
    ${skills.map(s => `<div><strong style="color:${accent};">${s.name}: </strong>${s.skills.join(', ')}</div>`).join('')}
  </div>` : ''}

  ${experience.length ? `
  <div class="sec-title">Professional Experience</div>
  ${experience.map(e => `
    <div style="margin-bottom:12px;">
      <div class="row"><span>${e.title}</span><span style="color:${accent};">${fmt(e.startDate)} – ${e.current ? 'Present' : fmt(e.endDate)}</span></div>
      <div style="font-style:italic; color:#475569; margin-bottom:3px;">${e.company}${e.location ? `, ${e.location}` : ''}</div>
      ${e.bullets.length ? `<ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
    </div>`).join('')}` : ''}

  ${projects.length ? `
  <div class="sec-title">Key Initiatives & Projects</div>
  ${projects.map(pr => `
    <div style="margin-bottom:8px;">
      <div class="row"><span>${pr.name}</span>${pr.link ? `<span style="color:${accent}; font-weight:normal;">${pr.link}</span>` : ''}</div>
      ${pr.technologies.length ? `<div style="font-size:0.9em; color:#64748b; font-style:italic;">${pr.technologies.join(' • ')}</div>` : ''}
      <div>${pr.description || ''}</div>
    </div>`).join('')}` : ''}

  ${education.length ? `
  <div class="sec-title">Education & Credentials</div>
  ${education.map(edu => `
    <div style="margin-bottom:6px;">
      <div class="row"><span>${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</span><span style="color:${accent};">${fmt(edu.startDate)} – ${fmt(edu.endDate)}</span></div>
      <div style="color:#475569;">${edu.institution}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
    </div>`).join('')}` : ''}

  ${(certifications.length || languages.length) ? `
  <div style="display:flex; gap:24px; margin-top:6px;">
    ${certifications.length ? `<div style="flex:1;"><div class="sec-title">Certifications</div>${certifications.map(c => `<div><strong>${c.name}</strong> – ${c.issuer} ${c.date ? `(${fmt(c.date)})` : ''}</div>`).join('')}</div>` : ''}
    ${languages.length ? `<div style="flex:1;"><div class="sec-title">Languages</div><div>${languages.map(l => `${l.name} (${l.proficiency})`).join('  •  ')}</div></div>` : ''}
  </div>` : ''}

  ${awards.length ? `<div class="sec-title">Honors & Accolades</div>${awards.map(a => `<div style="margin-bottom:3px;"><strong>${a.title}</strong> – ${a.issuer} ${a.date ? `(${fmt(a.date)})` : ''}</div>`).join('')}` : ''}

  ${customSections.map(sec => `<div class="sec-title">${sec.title}</div><ul>${sec.entries.map(e => `<li>${e.text}</li>`).join('')}</ul>`).join('')}
</div>
</body></html>`
}

// 5. Technical Template (Developer / Engineer Focus)
function renderTechnical(cv: CVData): string {
  const { personal: p, summary, experience, education, skills, projects, certifications, languages, awards, customSections, settings: s } = cv
  const accent = s.accentColor || '#0ea5e9'
  const font = s.font || 'Calibri, sans-serif'
  const fontSize = s.fontSize || 10.5
  const headingSize = s.headingSize || 13
  const margin = s.margins || 0.6

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: ${font}; font-size: ${fontSize}pt; line-height: ${s.lineSpacing || 1.15}; color: #1e293b; padding: ${margin}in; background: #fff; }
.header-box { border-bottom: 2px solid ${accent}; padding-bottom: 10px; margin-bottom: 12px; }
h1 { font-size: ${headingSize + 8}pt; font-weight: bold; color: #0f172a; margin-bottom: 2px; }
.job-title { font-size: ${fontSize + 2}pt; color: ${accent}; font-weight: 600; }
.badge { font-family: ui-monospace, monospace; font-size: ${fontSize - 1.5}pt; background: #f1f5f9; border: 1px solid #cbd5e1; padding: 2px 7px; border-radius: 4px; color: #0f172a; display: inline-block; margin-right: 6px; }
.sec-title { font-size: ${headingSize}pt; font-weight: bold; color: #0f172a; margin: 10px 0 6px; }
.sec-title span { color: ${accent}; font-family: monospace; }
.row { display: flex; justify-content: space-between; font-weight: bold; }
ul { margin: 0 0 6px 18px; color: #334155; } li { margin-bottom: 2px; }
</style></head><body>
<div class="header-box">
  <div style="display:flex; justify-content:space-between; align-items:flex-start;">
    <div>
      <h1>${p.name || ''}</h1>
      ${p.title ? `<div class="job-title">${p.title}</div>` : ''}
    </div>
    <div style="text-align:right; font-family:ui-monospace, monospace; font-size:${fontSize - 1}pt; color:#475569;">
      ${p.email ? `<div>${p.email}</div>` : ''}
      ${p.phone ? `<div>${p.phone}</div>` : ''}
      ${p.location ? `<div>${p.location}</div>` : ''}
    </div>
  </div>
  <div style="margin-top:8px;">
    ${p.github ? `<span class="badge">gh: ${p.github}</span>` : ''}
    ${p.linkedin ? `<span class="badge">li: ${p.linkedin}</span>` : ''}
    ${p.portfolio ? `<span class="badge">web: ${p.portfolio}</span>` : ''}
  </div>
</div>

${summary ? `<div class="sec-title"><span>//</span> Summary</div><div style="color:#334155;">${summary}</div>` : ''}

${skills.length ? `
<div class="sec-title"><span>//</span> Technical Stack</div>
${skills.map(s => `
  <div style="display:flex; gap:8px; margin-bottom:3px;">
    <span style="font-weight:600; min-width:150px; color:#0f172a;">${s.name}:</span>
    <span style="font-family:ui-monospace, monospace; font-size:${fontSize - 1}pt; color:#334155;">${s.skills.join('  •  ')}</span>
  </div>`).join('')}` : ''}

${experience.length ? `
<div class="sec-title"><span>//</span> Work Experience</div>
${experience.map(e => `
  <div style="margin-bottom:10px;">
    <div class="row"><span>${e.title}</span><span style="font-family:ui-monospace, monospace; color:${accent}; font-weight:600;">${fmt(e.startDate)} – ${e.current ? 'Present' : fmt(e.endDate)}</span></div>
    <div style="color:#475569; font-size:${fontSize - 0.5}pt; margin-bottom:3px;">${e.company}${e.location ? ` | ${e.location}` : ''}</div>
    ${e.bullets.length ? `<ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
  </div>`).join('')}` : ''}

${projects.length ? `
<div class="sec-title"><span>//</span> Projects & Code</div>
${projects.map(pr => `
  <div style="margin-bottom:8px;">
    <div class="row"><span>${pr.name}</span>${pr.link ? `<span style="color:${accent}; font-family:monospace; font-size:0.85em;">[${pr.link}]</span>` : ''}</div>
    ${pr.technologies.length ? `<div style="font-family:ui-monospace, monospace; font-size:${fontSize - 1.5}pt; color:#64748b; margin-bottom:2px;">stack: ${pr.technologies.join(', ')}</div>` : ''}
    <div>${pr.description || ''}</div>
  </div>`).join('')}` : ''}

${education.length ? `
<div class="sec-title"><span>//</span> Education</div>
${education.map(edu => `
  <div style="margin-bottom:6px;">
    <div class="row"><span>${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</span><span style="font-family:ui-monospace, monospace; color:#64748b;">${fmt(edu.startDate)} – ${fmt(edu.endDate)}</span></div>
    <div style="color:#475569; font-size:${fontSize - 0.5}pt;">${edu.institution}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>
  </div>`).join('')}` : ''}

${(certifications.length || languages.length) ? `
<div style="display:flex; gap:20px; margin-top:6px;">
  ${certifications.length ? `<div style="flex:1;"><div class="sec-title"><span>//</span> Certifications</div>${certifications.map(c => `<div><strong>${c.name}</strong> – ${c.issuer} ${c.date ? `(${fmt(c.date)})` : ''}</div>`).join('')}</div>` : ''}
  ${languages.length ? `<div style="flex:1;"><div class="sec-title"><span>//</span> Languages</div><div>${languages.map(l => `${l.name} (${l.proficiency})`).join('  •  ')}</div></div>` : ''}
</div>` : ''}

${awards.length ? `<div class="sec-title"><span>//</span> Honors & Awards</div>${awards.map(a => `<div><strong>${a.title}</strong> – ${a.issuer} ${a.date ? `(${fmt(a.date)})` : ''}</div>`).join('')}` : ''}

${customSections.map(sec => `<div class="sec-title"><span>//</span> ${sec.title}</div><ul>${sec.entries.map(e => `<li>${e.text}</li>`).join('')}</ul>`).join('')}
</body></html>`
}

// 6. Academic Template (Scholarly Hierarchy)
function renderAcademic(cv: CVData): string {
  const { personal: p, summary, experience, education, skills, projects, certifications, languages, awards, customSections, settings: s } = cv
  const font = s.font || 'Georgia, Garamond, serif'
  const fontSize = s.fontSize || 11
  const headingSize = s.headingSize || 13
  const margin = s.margins || 0.6

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: ${font}; font-size: ${fontSize}pt; line-height: ${s.lineSpacing + 0.05 || 1.2}; color: #111827; padding: ${margin}in; background: #fff; }
.header { text-align: center; border-bottom: 1px solid #111827; padding-bottom: 10px; margin-bottom: 14px; }
h1 { font-size: ${headingSize + 8}pt; font-weight: normal; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 4px; }
.job-title { font-size: ${fontSize + 1}pt; font-style: italic; color: #4b5563; margin-bottom: 6px; }
.contact { font-size: ${fontSize - 1}pt; color: #4b5563; }
.cv-sub { text-align: center; font-style: italic; color: #6b7280; font-size: ${fontSize - 1}pt; margin-bottom: 12px; }
h2 { font-size: ${headingSize}pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #d1d5db; padding-bottom: 2px; margin: 12px 0 6px; }
.row { display: flex; justify-content: space-between; font-weight: bold; }
ul { margin: 0 0 6px 18px; } li { margin-bottom: 2px; }
</style></head><body>
<div class="header">
  <h1>${p.name || ''}</h1>
  ${p.title ? `<div class="job-title">${p.title}</div>` : ''}
  <div class="contact">${[p.location, p.email, p.phone, p.linkedin, p.github, p.portfolio].filter(Boolean).join('   •   ')}</div>
</div>
<div class="cv-sub">Curriculum Vitae</div>

${education.length ? `
<h2>Education</h2>
${education.map(edu => `
  <div style="margin-bottom:8px;">
    <div class="row"><span>${edu.institution}</span><span style="font-style:italic; font-weight:normal;">${fmt(edu.startDate)} – ${fmt(edu.endDate)}</span></div>
    <div style="padding-left:12px;">
      <div>${edu.degree}${edu.field ? ` in ${edu.field}` : ''}${edu.gpa ? ` (GPA: ${edu.gpa})` : ''}</div>
      ${edu.honors ? `<div style="font-style:italic; color:#4b5563;">Honors: ${edu.honors}</div>` : ''}
    </div>
  </div>`).join('')}` : ''}

${summary ? `<h2>Research Profile & Summary</h2><div style="text-align:justify;">${summary}</div>` : ''}

${experience.length ? `
<h2>Appointments & Experience</h2>
${experience.map(e => `
  <div style="margin-bottom:10px;">
    <div class="row"><span>${e.title}</span><span style="font-style:italic; font-weight:normal;">${fmt(e.startDate)} – ${e.current ? 'Present' : fmt(e.endDate)}</span></div>
    <div style="color:#4b5563; font-style:italic; margin-bottom:3px;">${e.company}${e.location ? `, ${e.location}` : ''}</div>
    ${e.bullets.length ? `<ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
  </div>`).join('')}` : ''}

${projects.length ? `
<h2>Research & Technical Projects</h2>
${projects.map(pr => `
  <div style="margin-bottom:8px;">
    <div class="row"><span>${pr.name}</span><span style="font-style:italic; font-weight:normal;">${fmt(pr.startDate)} ${pr.endDate ? `– ${fmt(pr.endDate)}` : ''}</span></div>
    ${pr.technologies.length ? `<div style="font-style:italic; color:#6b7280; font-size:0.95em;">Methodologies: ${pr.technologies.join(', ')}</div>` : ''}
    <div>${pr.description || ''}</div>
  </div>`).join('')}` : ''}

${skills.length ? `
<h2>Areas of Expertise & Skills</h2>
${skills.map(s => `<div style="margin-bottom:3px;"><strong>${s.name}: </strong>${s.skills.join(', ')}</div>`).join('')}` : ''}

${awards.length ? `
<h2>Honors, Awards & Grants</h2>
${awards.map(a => `<div style="display:flex; justify-content:space-between; margin-bottom:3px;"><span><strong>${a.title}</strong>${a.issuer ? `, ${a.issuer}` : ''}</span><span style="font-style:italic;">${fmt(a.date)}</span></div>`).join('')}` : ''}

${certifications.length ? `
<h2>Certifications</h2>
${certifications.map(c => `<div style="margin-bottom:3px;"><strong>${c.name}</strong>, ${c.issuer} ${c.date ? `(${fmt(c.date)})` : ''}</div>`).join('')}` : ''}

${languages.length ? `
<h2>Languages</h2>
<div>${languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}</div>` : ''}

${customSections.map(sec => `
<h2>${sec.title}</h2>
<ul>${sec.entries.map(e => `<li>${e.text}</li>`).join('')}</ul>`).join('')}
</body></html>`
}

// Router for HTML Template based on user's selected design
export function buildHTMLTemplate(cv: CVData): string {
  const templateId = cv.settings?.template || 'classic-ats'

  switch (templateId) {
    case 'modern':
      return renderModern(cv)
    case 'minimal':
      return renderMinimal(cv)
    case 'executive':
      return renderExecutive(cv)
    case 'technical':
      return renderTechnical(cv)
    case 'academic':
      return renderAcademic(cv)
    case 'classic-ats':
    default:
      return renderClassicATS(cv)
  }
}

export async function generatePDFFromHTML(html: string): Promise<Buffer> {
  const getPuppeteer = new Function("return import('puppeteer')");
  const pModule = await getPuppeteer();
  const puppeteer = pModule.default || pModule;
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-first-run',
      '--no-zygote',
      '--single-process'
    ]
  })
  try {
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'load' })
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    })
    return Buffer.from(pdf)
  } finally {
    await browser.close()
  }
}
