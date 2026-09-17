import { CVData } from '../types/cv'

export default function ClassicATS({ cv }: { cv: CVData }) {
  const s = cv.settings
  const p = cv.personal

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
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
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
        <div style={{ marginBottom: '12px' }}>
          <h2
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1.5px solid #000',
              margin: '0 0 4px 0',
              paddingBottom: '2px',
              letterSpacing: '0.5px'
            }}
          >
            Professional Summary
          </h2>
          <div style={{ textAlign: 'justify' }}>{cv.summary}</div>
        </div>
      )}

      {/* Experience */}
      {cv.experience.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1.5px solid #000',
              margin: '0 0 6px 0',
              paddingBottom: '2px',
              letterSpacing: '0.5px'
            }}
          >
            Work Experience
          </h2>
          {cv.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{exp.title}</span>
                <span>
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic', color: '#444' }}>
                <span>{exp.company}</span>
                {exp.location && <span>{exp.location}</span>}
              </div>
              {exp.bullets.length > 0 && (
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
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
        <div style={{ marginBottom: '12px' }}>
          <h2
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1.5px solid #000',
              margin: '0 0 6px 0',
              paddingBottom: '2px',
              letterSpacing: '0.5px'
            }}
          >
            Education
          </h2>
          {cv.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>
                  {edu.degree}
                  {edu.field ? ` in ${edu.field}` : ''}
                </span>
                <span>
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
        <div style={{ marginBottom: '12px' }}>
          <h2
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1.5px solid #000',
              margin: '0 0 6px 0',
              paddingBottom: '2px',
              letterSpacing: '0.5px'
            }}
          >
            Technical & Professional Skills
          </h2>
          {cv.skills.map((cat) => (
            <div key={cat.id} style={{ marginBottom: '4px' }}>
              <strong style={{ display: 'inline-block', minWidth: '160px' }}>{cat.name}:</strong>
              <span>{cat.skills.join(', ')}</span>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {cv.projects.length > 0 && (
        <div style={{ marginBottom: '12px' }}>
          <h2
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1.5px solid #000',
              margin: '0 0 6px 0',
              paddingBottom: '2px',
              letterSpacing: '0.5px'
            }}
          >
            Projects
          </h2>
          {cv.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{proj.name}</span>
                {proj.startDate && (
                  <span style={{ fontWeight: 'normal', color: '#555' }}>
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
        <div style={{ marginBottom: '12px' }}>
          <h2
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1.5px solid #000',
              margin: '0 0 6px 0',
              paddingBottom: '2px',
              letterSpacing: '0.5px'
            }}
          >
            Certifications
          </h2>
          {cv.certifications.map((c) => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>
                <strong>{c.name}</strong> – {c.issuer}
                {c.credentialId ? ` (ID: ${c.credentialId})` : ''}
              </span>
              <span>{c.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* Languages & Awards */}
      {(cv.languages.length > 0 || cv.awards.length > 0) && (
        <div style={{ display: 'flex', gap: '24px', marginBottom: '12px' }}>
          {cv.languages.length > 0 && (
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: `${s.headingSize}pt`,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  borderBottom: '1.5px solid #000',
                  margin: '0 0 6px 0',
                  paddingBottom: '2px'
                }}
              >
                Languages
              </h2>
              <div>{cv.languages.map((l) => `${l.name} (${l.proficiency})`).join('  •  ')}</div>
            </div>
          )}
          {cv.awards.length > 0 && (
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: `${s.headingSize}pt`,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  borderBottom: '1.5px solid #000',
                  margin: '0 0 6px 0',
                  paddingBottom: '2px'
                }}
              >
                Honors & Awards
              </h2>
              {cv.awards.map((a) => (
                <div key={a.id} style={{ marginBottom: '3px' }}>
                  <strong>{a.title}</strong>
                  {a.issuer ? ` – ${a.issuer}` : ''} {a.date ? `(${a.date})` : ''}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Sections */}
      {cv.customSections.map((sec) => (
        <div key={sec.id} style={{ marginBottom: '12px' }}>
          <h2
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1.5px solid #000',
              margin: '0 0 6px 0',
              paddingBottom: '2px'
            }}
          >
            {sec.title}
          </h2>
          <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
            {sec.entries.map((e) => (
              <li key={e.id}>{e.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}