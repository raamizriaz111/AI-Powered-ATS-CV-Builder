import { CVData } from '../types/cv'

export default function Executive({ cv }: { cv: CVData }) {
  const s = cv.settings
  const p = cv.personal
  const accent = s.accentColor || '#1e3a8a'

  return (
    <div
      style={{
        fontFamily: s.font || 'Georgia, serif',
        fontSize: `${s.fontSize}pt`,
        lineHeight: s.lineSpacing,
        color: '#1a202c',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box'
      }}
    >
      {/* Executive Header Banner */}
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
            fontSize: `${s.headingSize + 10}pt`,
            fontWeight: 'bold',
            letterSpacing: '1px',
            margin: '0 0 6px 0',
            textTransform: 'uppercase'
          }}
        >
          {p.name || 'Your Full Name'}
        </h1>
        {p.title && (
          <div
            style={{
              fontSize: `${s.fontSize + 2}pt`,
              fontWeight: 300,
              letterSpacing: '2px',
              textTransform: 'uppercase',
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
          borderBottom: '1px solid #e2e8f0',
          padding: '8px 32px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          fontSize: `${s.fontSize - 1}pt`,
          color: '#475569'
        }}
      >
        {p.email && <span>✉ {p.email}</span>}
        {p.phone && <span>☎ {p.phone}</span>}
        {p.location && <span>📍 {p.location}</span>}
        {p.linkedin && <span>in {p.linkedin}</span>}
        {p.github && <span>⚡ {p.github}</span>}
        {p.portfolio && <span>🌐 {p.portfolio}</span>}
      </div>

      <div style={{ padding: `${s.margins}in` }}>
        {/* Executive Summary */}
        {cv.summary && (
          <div style={{ marginBottom: '18px' }}>
            <div
              style={{
                fontSize: `${s.headingSize}pt`,
                fontWeight: 'bold',
                color: accent,
                borderBottom: `2px solid ${accent}`,
                paddingBottom: '3px',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Executive Profile
            </div>
            <div style={{ textAlign: 'justify', color: '#334155' }}>{cv.summary}</div>
          </div>
        )}

        {/* Core Competencies / Skills */}
        {cv.skills.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <div
              style={{
                fontSize: `${s.headingSize}pt`,
                fontWeight: 'bold',
                color: accent,
                borderBottom: `2px solid ${accent}`,
                paddingBottom: '3px',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Core Competencies & Skills
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {cv.skills.map((cat) => (
                <div key={cat.id} style={{ fontSize: `${s.fontSize - 0.5}pt` }}>
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
            <div
              style={{
                fontSize: `${s.headingSize}pt`,
                fontWeight: 'bold',
                color: accent,
                borderBottom: `2px solid ${accent}`,
                paddingBottom: '3px',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Professional Experience
            </div>
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
            <div
              style={{
                fontSize: `${s.headingSize}pt`,
                fontWeight: 'bold',
                color: accent,
                borderBottom: `2px solid ${accent}`,
                paddingBottom: '3px',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Key Initiatives & Projects
            </div>
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
            <div
              style={{
                fontSize: `${s.headingSize}pt`,
                fontWeight: 'bold',
                color: accent,
                borderBottom: `2px solid ${accent}`,
                paddingBottom: '3px',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              Education & Credentials
            </div>
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
          <div style={{ display: 'flex', gap: '32px', marginBottom: '16px' }}>
            {cv.certifications.length > 0 && (
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: `${s.headingSize - 1}pt`,
                    fontWeight: 'bold',
                    color: accent,
                    borderBottom: `1px solid ${accent}`,
                    paddingBottom: '2px',
                    marginBottom: '6px',
                    textTransform: 'uppercase'
                  }}
                >
                  Certifications
                </div>
                {cv.certifications.map((c) => (
                  <div key={c.id} style={{ marginBottom: '4px' }}>
                    <strong>{c.name}</strong> – {c.issuer} {c.date ? `(${c.date})` : ''}
                  </div>
                ))}
              </div>
            )}
            {cv.languages.length > 0 && (
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: `${s.headingSize - 1}pt`,
                    fontWeight: 'bold',
                    color: accent,
                    borderBottom: `1px solid ${accent}`,
                    paddingBottom: '2px',
                    marginBottom: '6px',
                    textTransform: 'uppercase'
                  }}
                >
                  Languages
                </div>
                <div>{cv.languages.map((l) => `${l.name} (${l.proficiency})`).join('  •  ')}</div>
              </div>
            )}
          </div>
        )}

        {/* Awards */}
        {cv.awards.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontSize: `${s.headingSize - 1}pt`,
                fontWeight: 'bold',
                color: accent,
                borderBottom: `1px solid ${accent}`,
                paddingBottom: '2px',
                marginBottom: '6px',
                textTransform: 'uppercase'
              }}
            >
              Honors & Accolades
            </div>
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
            <div
              style={{
                fontSize: `${s.headingSize}pt`,
                fontWeight: 'bold',
                color: accent,
                borderBottom: `2px solid ${accent}`,
                paddingBottom: '3px',
                marginBottom: '6px',
                textTransform: 'uppercase'
              }}
            >
              {sec.title}
            </div>
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