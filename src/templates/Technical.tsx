import { CVData } from '../types/cv'

export default function Technical({ cv }: { cv: CVData }) {
  const s = cv.settings
  const p = cv.personal
  const accent = s.accentColor || '#0ea5e9'

  return (
    <div
      style={{
        fontFamily: s.font || 'Calibri, sans-serif',
        fontSize: `${s.fontSize}pt`,
        lineHeight: s.lineSpacing,
        padding: `${s.margins}in`,
        color: '#1e293b',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box'
      }}
    >
      {/* Technical Header */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <h1
              style={{
                fontSize: `${s.headingSize + 8}pt`,
                fontWeight: 'bold',
                margin: '0 0 2px 0',
                color: '#0f172a'
              }}
            >
              {p.name || 'Your Full Name'}
            </h1>
            {p.title && (
              <div style={{ fontSize: `${s.fontSize + 2}pt`, color: accent, fontWeight: 600 }}>
                {p.title}
              </div>
            )}
          </div>
          <div
            style={{
              textAlign: 'right',
              fontSize: `${s.fontSize - 1}pt`,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              color: '#475569'
            }}
          >
            {p.email && <div style={{ marginBottom: '2px' }}>{p.email}</div>}
            {p.phone && <div style={{ marginBottom: '2px' }}>{p.phone}</div>}
            {p.location && <div style={{ marginBottom: '2px' }}>{p.location}</div>}
          </div>
        </div>

        {/* Links bar with code badge style */}
        <div style={{ display: 'flex', marginTop: '8px', flexWrap: 'wrap' }}>
          {p.github && (
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: `${s.fontSize - 1.5}pt`,
                backgroundColor: '#f1f5f9',
                border: '1px solid #cbd5e1',
                padding: '2px 8px',
                borderRadius: '4px',
                color: '#0f172a',
                marginRight: '8px',
                marginBottom: '4px'
              }}
            >
              gh: {p.github}
            </span>
          )}
          {p.linkedin && (
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: `${s.fontSize - 1.5}pt`,
                backgroundColor: '#f1f5f9',
                border: '1px solid #cbd5e1',
                padding: '2px 8px',
                borderRadius: '4px',
                color: '#0f172a',
                marginRight: '8px',
                marginBottom: '4px'
              }}
            >
              li: {p.linkedin}
            </span>
          )}
          {p.portfolio && (
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: `${s.fontSize - 1.5}pt`,
                backgroundColor: '#f1f5f9',
                border: '1px solid #cbd5e1',
                padding: '2px 8px',
                borderRadius: '4px',
                color: '#0f172a',
                marginBottom: '4px'
              }}
            >
              web: {p.portfolio}
            </span>
          )}
        </div>
        <div style={{ height: '2px', backgroundColor: accent, margin: '12px 0 0 0' }} />
      </div>

      {/* Summary */}
      {cv.summary && (
        <div style={{ marginBottom: '14px' }}>
          <div
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              color: '#0f172a',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span style={{ color: accent, fontFamily: 'monospace', marginRight: '6px' }}>//</span> Summary
          </div>
          <div style={{ color: '#334155' }}>{cv.summary}</div>
        </div>
      )}

      {/* Technical Skills */}
      {cv.skills.length > 0 && (
        <div style={{ marginBottom: '14px' }}>
          <div
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              color: '#0f172a',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span style={{ color: accent, fontFamily: 'monospace', marginRight: '6px' }}>//</span> Technical Stack & Skills
          </div>
          <div>
            {cv.skills.map((cat) => (
              <div key={cat.id} style={{ display: 'flex', alignItems: 'baseline', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, minWidth: '150px', color: '#0f172a', fontSize: `${s.fontSize - 0.5}pt`, marginRight: '8px' }}>
                  {cat.name}:
                </span>
                <span
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: `${s.fontSize - 1}pt`,
                    color: '#334155'
                  }}
                >
                  {cat.skills.join('  •  ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {cv.experience.length > 0 && (
        <div style={{ marginBottom: '14px' }}>
          <div
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              color: '#0f172a',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span style={{ color: accent, fontFamily: 'monospace', marginRight: '6px' }}>//</span> Work Experience
          </div>
          {cv.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 'bold', fontSize: `${s.fontSize + 0.5}pt`, color: '#0f172a' }}>
                  {exp.title}
                </span>
                <span
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: `${s.fontSize - 1}pt`,
                    color: accent,
                    fontWeight: 600
                  }}
                >
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div style={{ color: '#475569', fontSize: `${s.fontSize - 0.5}pt`, marginBottom: '4px' }}>
                {exp.company}
                {exp.location ? ` | ${exp.location}` : ''}
              </div>
              {exp.bullets.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: '18px', color: '#334155' }}>
                  {exp.bullets.map((b, i) => (
                    <li key={i} style={{ marginBottom: '2px' }}>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {cv.projects.length > 0 && (
        <div style={{ marginBottom: '14px' }}>
          <div
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              color: '#0f172a',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span style={{ color: accent, fontFamily: 'monospace', marginRight: '6px' }}>//</span> Projects & Open Source
          </div>
          {cv.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{proj.name}</span>
                <div style={{ display: 'flex', fontSize: '0.85em' }}>
                  {proj.github && <span style={{ color: accent, fontFamily: 'monospace', marginRight: '8px' }}>[{proj.github}]</span>}
                  {proj.link && <span style={{ color: accent, fontFamily: 'monospace' }}>[{proj.link}]</span>}
                </div>
              </div>
              {proj.technologies.length > 0 && (
                <div
                  style={{
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: `${s.fontSize - 1.5}pt`,
                    color: '#64748b',
                    margin: '2px 0'
                  }}
                >
                  stack: {proj.technologies.join(', ')}
                </div>
              )}
              {proj.description && <div style={{ color: '#334155' }}>{proj.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {cv.education.length > 0 && (
        <div style={{ marginBottom: '14px' }}>
          <div
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              color: '#0f172a',
              marginBottom: '6px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <span style={{ color: accent, fontFamily: 'monospace', marginRight: '6px' }}>//</span> Education
          </div>
          {cv.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 'bold' }}>
                  {edu.degree}
                  {edu.field ? ` in ${edu.field}` : ''}
                </span>
                <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: `${s.fontSize - 1}pt`, color: '#64748b' }}>
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              <div style={{ color: '#475569', fontSize: `${s.fontSize - 0.5}pt` }}>
                {edu.institution}
                {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
              </div>
              {edu.honors && <div style={{ fontStyle: 'italic', fontSize: '0.9em', color: '#64748b' }}>{edu.honors}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications & Languages */}
      {(cv.certifications.length > 0 || cv.languages.length > 0) && (
        <div style={{ display: 'flex', marginBottom: '12px' }}>
          {cv.certifications.length > 0 && (
            <div style={{ flex: 1, paddingRight: '12px' }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>
                <span style={{ color: accent, fontFamily: 'monospace' }}>//</span> Certifications
              </div>
              {cv.certifications.map((c) => (
                <div key={c.id} style={{ fontSize: `${s.fontSize - 0.5}pt`, marginBottom: '2px' }}>
                  <strong>{c.name}</strong> – {c.issuer} {c.date ? `(${c.date})` : ''}
                </div>
              ))}
            </div>
          )}
          {cv.languages.length > 0 && (
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>
                <span style={{ color: accent, fontFamily: 'monospace' }}>//</span> Languages
              </div>
              <div style={{ fontSize: `${s.fontSize - 0.5}pt` }}>
                {cv.languages.map((l) => `${l.name} (${l.proficiency})`).join('  •  ')}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Awards & Custom */}
      {cv.awards.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>
            <span style={{ color: accent, fontFamily: 'monospace' }}>//</span> Honors & Awards
          </div>
          {cv.awards.map((a) => (
            <div key={a.id} style={{ fontSize: `${s.fontSize - 0.5}pt`, marginBottom: '2px' }}>
              <strong>{a.title}</strong> – {a.issuer} {a.date ? `(${a.date})` : ''}
            </div>
          ))}
        </div>
      )}

      {cv.customSections.map((sec) => (
        <div key={sec.id} style={{ marginBottom: '12px' }}>
          <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>
            <span style={{ color: accent, fontFamily: 'monospace' }}>//</span> {sec.title}
          </div>
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#334155' }}>
            {sec.entries.map((e) => (
              <li key={e.id}>{e.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}