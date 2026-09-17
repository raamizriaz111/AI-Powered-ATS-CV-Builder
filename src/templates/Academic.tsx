import { CVData } from '../types/cv'

export default function Academic({ cv }: { cv: CVData }) {
  const s = cv.settings
  const p = cv.personal

  return (
    <div
      style={{
        fontFamily: s.font || 'Georgia, Garamond, serif',
        fontSize: `${s.fontSize}pt`,
        lineHeight: s.lineSpacing + 0.05,
        padding: `${s.margins}in`,
        color: '#111827',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '1px solid #111827', paddingBottom: '12px' }}>
        <h1
          style={{
            fontSize: `${s.headingSize + 8}pt`,
            fontWeight: 'normal',
            letterSpacing: '1.5px',
            margin: '0 0 4px 0',
            textTransform: 'uppercase'
          }}
        >
          {p.name || 'Your Full Name'}
        </h1>
        {p.title && (
          <div style={{ fontSize: `${s.fontSize + 1}pt`, fontStyle: 'italic', color: '#4b5563', marginBottom: '6px' }}>
            {p.title}
          </div>
        )}
        <div style={{ fontSize: `${s.fontSize - 1}pt`, color: '#4b5563' }}>
          {[p.location, p.email, p.phone, p.linkedin, p.github, p.portfolio].filter(Boolean).join('   •   ')}
        </div>
      </div>

      {/* Curriculum Vitae Header */}
      <div style={{ textAlign: 'center', fontStyle: 'italic', fontSize: `${s.fontSize - 1}pt`, color: '#6b7280', marginBottom: '16px' }}>
        Curriculum Vitae
      </div>

      {/* Education First (Traditional Academic Order) */}
      {cv.education.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '1px solid #d1d5db',
              margin: '0 0 8px 0',
              paddingBottom: '2px'
            }}
          >
            Education
          </h2>
          {cv.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold' }}>{edu.institution}</span>
                <span style={{ fontStyle: 'italic' }}>
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              <div style={{ paddingLeft: '12px' }}>
                <div>
                  {edu.degree} in {edu.field}
                  {edu.gpa ? ` (GPA: ${edu.gpa})` : ''}
                </div>
                {edu.honors && <div style={{ fontStyle: 'italic', color: '#4b5563' }}>Honors: {edu.honors}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Research Interests / Summary */}
      {cv.summary && (
        <div style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '1px solid #d1d5db',
              margin: '0 0 8px 0',
              paddingBottom: '2px'
            }}
          >
            Research Profile & Summary
          </h2>
          <div style={{ textAlign: 'justify', lineHeight: 1.5 }}>{cv.summary}</div>
        </div>
      )}

      {/* Academic & Professional Appointments / Experience */}
      {cv.experience.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '1px solid #d1d5db',
              margin: '0 0 8px 0',
              paddingBottom: '2px'
            }}
          >
            Appointments & Experience
          </h2>
          {cv.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold' }}>{exp.title}</span>
                <span style={{ fontStyle: 'italic' }}>
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div style={{ color: '#4b5563', fontStyle: 'italic', marginBottom: '3px' }}>
                {exp.company}
                {exp.location ? `, ${exp.location}` : ''}
              </div>
              {exp.bullets.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
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

      {/* Projects / Research Projects */}
      {cv.projects.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '1px solid #d1d5db',
              margin: '0 0 8px 0',
              paddingBottom: '2px'
            }}
          >
            Research & Technical Projects
          </h2>
          {cv.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{proj.name}</span>
                {(proj.startDate || proj.endDate) && (
                  <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
                    {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                  </span>
                )}
              </div>
              {proj.technologies.length > 0 && (
                <div style={{ fontStyle: 'italic', color: '#6b7280', fontSize: '0.95em' }}>
                  Methodologies & Tools: {proj.technologies.join(', ')}
                </div>
              )}
              {proj.description && <div style={{ marginTop: '2px' }}>{proj.description}</div>}
              {(proj.github || proj.link) && (
                <div style={{ fontSize: '0.9em', color: '#4b5563', marginTop: '2px' }}>
                  {[proj.github ? `Repository: ${proj.github}` : '', proj.link ? `Link: ${proj.link}` : '']
                    .filter(Boolean)
                    .join('  •  ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Areas of Expertise / Skills */}
      {cv.skills.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '1px solid #d1d5db',
              margin: '0 0 8px 0',
              paddingBottom: '2px'
            }}
          >
            Areas of Expertise & Skills
          </h2>
          {cv.skills.map((cat) => (
            <div key={cat.id} style={{ marginBottom: '4px' }}>
              <strong>{cat.name}: </strong>
              <span>{cat.skills.join(', ')}</span>
            </div>
          ))}
        </div>
      )}

      {/* Honors, Awards & Fellowships */}
      {cv.awards.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '1px solid #d1d5db',
              margin: '0 0 8px 0',
              paddingBottom: '2px'
            }}
          >
            Honors, Awards & Grants
          </h2>
          {cv.awards.map((a) => (
            <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>
                <strong>{a.title}</strong>
                {a.issuer ? `, ${a.issuer}` : ''}
                {a.description ? ` — ${a.description}` : ''}
              </span>
              <span style={{ fontStyle: 'italic' }}>{a.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* Certifications & Languages */}
      {(cv.certifications.length > 0 || cv.languages.length > 0) && (
        <div style={{ display: 'flex', gap: '32px', marginBottom: '16px' }}>
          {cv.certifications.length > 0 && (
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: `${s.headingSize}pt`,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  borderBottom: '1px solid #d1d5db',
                  margin: '0 0 8px 0',
                  paddingBottom: '2px'
                }}
              >
                Certifications
              </h2>
              {cv.certifications.map((c) => (
                <div key={c.id} style={{ marginBottom: '3px' }}>
                  <strong>{c.name}</strong>, {c.issuer} {c.date ? `(${c.date})` : ''}
                </div>
              ))}
            </div>
          )}
          {cv.languages.length > 0 && (
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontSize: `${s.headingSize}pt`,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  borderBottom: '1px solid #d1d5db',
                  margin: '0 0 8px 0',
                  paddingBottom: '2px'
                }}
              >
                Languages
              </h2>
              <div>{cv.languages.map((l) => `${l.name} (${l.proficiency})`).join(', ')}</div>
            </div>
          )}
        </div>
      )}

      {/* Publications / Custom Sections */}
      {cv.customSections.map((sec) => (
        <div key={sec.id} style={{ marginBottom: '16px' }}>
          <h2
            style={{
              fontSize: `${s.headingSize}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '1px solid #d1d5db',
              margin: '0 0 8px 0',
              paddingBottom: '2px'
            }}
          >
            {sec.title}
          </h2>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {sec.entries.map((e) => (
              <li key={e.id} style={{ marginBottom: '3px' }}>
                {e.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}