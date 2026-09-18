import { CVData } from '../types/cv'

export default function Executive({ cv }: { cv: CVData }) {
  const s = cv.settings
  const p = cv.personal
  const accent = s.accentColor || '#1e3a8a'

  const renderSectionHeader = (title: string, borderBottomWidth: string = '2px') => (
    <div style={{ marginBottom: '8px' }}>
      <div
        style={{
          fontSize: `${s.headingSize}pt`,
          fontWeight: 'bold',
          color: accent,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          lineHeight: 'normal'
        }}
      >
        {title}
      </div>
      <div style={{ height: borderBottomWidth, backgroundColor: accent, margin: '2px 0 0 0' }} />
    </div>
  )

  return (
    <div
      style={{
        fontFamily: s.font || 'Georgia, serif',
        fontSize: `${s.fontSize}pt`,
        lineHeight: s.lineSpacing,
        color: '#1a202c',
        backgroundColor: '#fff',
        boxSizing: 'border-box'
      }}
    >
      {/* Top Banner Header */}
      <div
        style={{
          backgroundColor: accent,
          color: '#ffffff',
          padding: '24px 32px',
          textAlign: 'center'
        }}
      >
        <h1
          style={{
            fontSize: `${s.headingSize + 9}pt`,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            margin: '0 0 4px 0',
            lineHeight: 1.1
          }}
        >
          {p.name || 'Your Full Name'}
        </h1>
        {p.title && (
          <div
            style={{
              fontSize: `${s.fontSize + 2}pt`,
              fontWeight: 300,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              opacity: 0.95
            }}
          >
            {p.title}
          </div>
        )}
      </div>

      {/* Sub-Header Contact Bar */}
      <div
        style={{
          backgroundColor: '#f8fafc',
          padding: '8px 32px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          fontSize: `${s.fontSize - 1}pt`,
          color: '#475569'
        }}
      >
        {p.email && <span style={{ marginRight: '16px', marginBottom: '2px' }}>✉ {p.email}</span>}
        {p.phone && <span style={{ marginRight: '16px', marginBottom: '2px' }}>☎ {p.phone}</span>}
        {p.location && <span style={{ marginRight: '16px', marginBottom: '2px' }}>📍 {p.location}</span>}
        {p.linkedin && <span style={{ marginRight: '16px', marginBottom: '2px' }}>in {p.linkedin}</span>}
        {p.github && <span style={{ marginRight: '16px', marginBottom: '2px' }}>⚡ {p.github}</span>}
        {p.portfolio && <span style={{ marginBottom: '2px' }}>🌐 {p.portfolio}</span>}
      </div>
      <div style={{ height: '1px', backgroundColor: '#e2e8f0' }} />

      <div style={{ padding: `${s.margins}in` }}>
        {/* Executive Summary */}
        {cv.summary && (
          <div style={{ marginBottom: '18px' }}>
            {renderSectionHeader('Executive Profile')}
            <div style={{ textAlign: 'justify', color: '#334155' }}>{cv.summary}</div>
          </div>
        )}

        {/* Core Competencies / Skills */}
        {cv.skills.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            {renderSectionHeader('Core Competencies & Skills')}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {cv.skills.map((cat) => (
                <div key={cat.id} style={{ width: '50%', paddingRight: '12px', marginBottom: '6px', boxSizing: 'border-box', fontSize: `${s.fontSize - 0.5}pt` }}>
                  <strong style={{ color: accent }}>{cat.name}: </strong>
                  <span>{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Experience */}
        {cv.experience.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            {renderSectionHeader('Professional Experience')}
            {cv.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 'bold', fontSize: `${s.fontSize + 0.5}pt`, color: '#0f172a' }}>
                    {exp.title}
                  </span>
                  <span style={{ fontWeight: 600, color: accent, fontSize: `${s.fontSize - 0.5}pt` }}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div style={{ fontStyle: 'italic', color: '#475569', marginBottom: '4px' }}>
                  {exp.company}
                  {exp.location ? `, ${exp.location}` : ''}
                </div>
                {exp.bullets.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155' }}>
                    {exp.bullets.map((b, i) => (
                      <li key={i} style={{ marginBottom: '3px' }}>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Selected Projects */}
        {cv.projects.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            {renderSectionHeader('Key Initiatives & Projects')}
            {cv.projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>{proj.name}</span>
                  {proj.link && <span style={{ color: accent, fontWeight: 'normal', fontSize: '0.9em' }}>{proj.link}</span>}
                </div>
                {proj.technologies.length > 0 && (
                  <div style={{ fontSize: '0.9em', color: '#64748b', fontStyle: 'italic', marginBottom: '2px' }}>
                    {proj.technologies.join(' • ')}
                  </div>
                )}
                {proj.description && <div style={{ color: '#334155' }}>{proj.description}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {cv.education.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            {renderSectionHeader('Education & Credentials')}
            {cv.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>
                    {edu.degree}
                    {edu.field ? ` in ${edu.field}` : ''}
                  </span>
                  <span style={{ color: accent }}>
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <div style={{ color: '#475569' }}>
                  {edu.institution}
                  {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
                </div>
                {edu.honors && <div style={{ fontStyle: 'italic', color: '#64748b' }}>{edu.honors}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Certifications & Languages */}
        {(cv.certifications.length > 0 || cv.languages.length > 0) && (
          <div style={{ display: 'flex', marginBottom: '16px' }}>
            {cv.certifications.length > 0 && (
              <div style={{ flex: 1, paddingRight: '16px' }}>
                {renderSectionHeader('Certifications', '1px')}
                {cv.certifications.map((c) => (
                  <div key={c.id} style={{ marginBottom: '4px' }}>
                    <strong>{c.name}</strong> – {c.issuer} {c.date ? `(${c.date})` : ''}
                  </div>
                ))}
              </div>
            )}
            {cv.languages.length > 0 && (
              <div style={{ flex: 1 }}>
                {renderSectionHeader('Languages', '1px')}
                <div>{cv.languages.map((l) => `${l.name} (${l.proficiency})`).join('  •  ')}</div>
              </div>
            )}
          </div>
        )}

        {/* Awards */}
        {cv.awards.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            {renderSectionHeader('Honors & Accolades', '1px')}
            {cv.awards.map((a) => (
              <div key={a.id} style={{ marginBottom: '4px' }}>
                <strong>{a.title}</strong> – {a.issuer} {a.date ? `(${a.date})` : ''}
                {a.description && <div style={{ color: '#475569', fontSize: '0.95em' }}>{a.description}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Custom Sections */}
        {cv.customSections.map((sec) => (
          <div key={sec.id} style={{ marginBottom: '16px' }}>
            {renderSectionHeader(sec.title)}
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#334155' }}>
              {sec.entries.map((e) => (
                <li key={e.id}>{e.text}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}