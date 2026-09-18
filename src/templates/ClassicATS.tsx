import { CVData } from '../types/cv'

export default function ClassicATS({ cv }: { cv: CVData }) {
  const s = cv.settings
  const p = cv.personal

  const renderSectionHeader = (title: string) => (
    <div style={{ marginBottom: '0' }}>
      <div
        style={{
          fontSize: `${s.headingSize}pt`,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: '#000',
          lineHeight: 1.2
        }}
      >
        {title}
      </div>
      <div style={{ height: '1.5px', backgroundColor: '#000', marginTop: '6px', marginBottom: '7px' }} />
    </div>
  )

  return (
    <div
      style={{
        fontFamily: s.font || 'Times New Roman, serif',
        fontSize: `${s.fontSize}pt`,
        lineHeight: s.lineSpacing,
        padding: `${s.margins}in`,
        color: '#000',
        backgroundColor: '#fff',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <h1
          style={{
            fontSize: `${s.headingSize + 8}pt`,
            fontWeight: 'bold',
            margin: '0 0 4px 0',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          {p.name || 'Your Full Name'}
        </h1>
        {p.title && (
          <div style={{ fontSize: `${s.fontSize + 1}pt`, color: '#333', marginBottom: '4px', fontWeight: 600 }}>
            {p.title}
          </div>
        )}
        <div style={{ fontSize: `${s.fontSize - 0.5}pt`, color: '#333' }}>
          {[p.email, p.phone, p.location, p.linkedin, p.github, p.portfolio].filter(Boolean).join('  |  ')}
        </div>
      </div>

      {/* Summary */}
      {cv.summary && (
        <div style={{ marginBottom: '10px' }}>
          {renderSectionHeader('Professional Summary')}
          <div style={{ textAlign: 'left' }}>{cv.summary}</div>
        </div>
      )}

      {/* Experience */}
      {cv.experience.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          {renderSectionHeader('Work Experience')}
          {cv.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 'bold' }}>
                <span>{exp.title}</span>
                <span style={{ whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px' }}>
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', color: '#444' }}>
                <span>{exp.company}</span>
                {exp.location && <span>{exp.location}</span>}
              </div>
              {exp.bullets.length > 0 && (
                <ul style={{ margin: '3px 0 0 0', paddingLeft: '20px' }}>
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

      {/* Education */}
      {cv.education.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          {renderSectionHeader('Education')}
          {cv.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 'bold' }}>
                <span>
                  {edu.degree}
                  {edu.field ? ` in ${edu.field}` : ''}
                </span>
                <span style={{ whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px' }}>
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{edu.institution}</span>
                {edu.gpa && <span style={{ fontWeight: 600 }}>GPA: {edu.gpa}</span>}
              </div>
              {edu.honors && <div style={{ fontStyle: 'italic', fontSize: '0.95em', color: '#444' }}>{edu.honors}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {cv.skills.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          {renderSectionHeader('Technical & Professional Skills')}
          {cv.skills.map((cat) => (
            <div key={cat.id} style={{ display: 'flex', alignItems: 'baseline', marginBottom: '3px' }}>
              <strong style={{ display: 'inline-block', width: '200px', minWidth: '200px', flexShrink: 0 }}>{cat.name}:</strong>
              <span style={{ flex: 1 }}>{cat.skills.join(', ')}</span>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {cv.projects.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          {renderSectionHeader('Projects')}
          {cv.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '7px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 'bold' }}>
                <span>{proj.name}</span>
                {proj.startDate && (
                  <span style={{ fontWeight: 'normal', color: '#555', whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px' }}>
                    {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                  </span>
                )}
              </div>
              {proj.technologies.length > 0 && (
                <div style={{ fontStyle: 'italic', fontSize: '0.95em', color: '#444', marginBottom: '2px' }}>
                  Technologies: {proj.technologies.join(', ')}
                </div>
              )}
              {proj.description && <div>{proj.description}</div>}
              {(proj.github || proj.link) && (
                <div style={{ fontSize: '0.9em', color: '#333', marginTop: '2px' }}>
                  {[proj.github ? `GitHub: ${proj.github}` : '', proj.link ? `Demo: ${proj.link}` : '']
                    .filter(Boolean)
                    .join('  |  ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {cv.certifications.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          {renderSectionHeader('Certifications')}
          {cv.certifications.map((c) => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
              <span>
                <strong>{c.name}</strong> – {c.issuer}
                {c.credentialId ? ` (ID: ${c.credentialId})` : ''}
              </span>
              <span style={{ whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px' }}>{c.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* Languages & Awards */}
      {(cv.languages.length > 0 || cv.awards.length > 0) && (
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          {cv.languages.length > 0 && (
            <div style={{ flex: 1, paddingRight: cv.awards.length > 0 ? '12px' : '0' }}>
              {renderSectionHeader('Languages')}
              <div>{cv.languages.map((l) => `${l.name} (${l.proficiency})`).join('  •  ')}</div>
            </div>
          )}
          {cv.awards.length > 0 && (
            <div style={{ flex: 1, paddingLeft: cv.languages.length > 0 ? '12px' : '0' }}>
              {renderSectionHeader('Honors & Awards')}
              {cv.awards.map((a) => (
                <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                  <span>
                    <strong>{a.title}</strong>
                    {a.issuer ? ` – ${a.issuer}` : ''}
                  </span>
                  {a.date && <span style={{ whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px' }}>({a.date})</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Sections */}
      {cv.customSections
        .filter((sec) => sec.title?.trim() || (sec.entries && sec.entries.some((e) => e.text?.trim())))
        .map((sec) => (
          <div key={sec.id} style={{ marginBottom: '10px' }}>
            {sec.title?.trim() && renderSectionHeader(sec.title)}
            {sec.entries && sec.entries.length > 0 && (
              <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                {sec.entries.map((e) => (
                  <li key={e.id}>{e.text}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
    </div>
  )
}