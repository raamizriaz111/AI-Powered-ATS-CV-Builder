import { CVData } from '../types/cv'

export default function Minimal({ cv }: { cv: CVData }) {
  const s = cv.settings
  const p = cv.personal

  return (
    <div
      style={{
        fontFamily: s.font || 'Helvetica, Arial, sans-serif',
        fontSize: `${s.fontSize}pt`,
        lineHeight: s.lineSpacing + 0.1,
        padding: `${s.margins}in`,
        color: '#1a202c',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1
          style={{
            fontSize: `${s.headingSize + 8}pt`,
            fontWeight: 300,
            margin: '0 0 4px 0',
            letterSpacing: '-0.5px',
            color: '#000000'
          }}
        >
          {p.name || 'Your Full Name'}
        </h1>
        {p.title && (
          <div style={{ fontSize: `${s.fontSize + 2}pt`, color: '#718096', fontWeight: 400, marginBottom: '8px' }}>
            {p.title}
          </div>
        )}
        <div style={{ fontSize: `${s.fontSize - 1}pt`, color: '#a0aec0', display: 'flex', flexWrap: 'wrap' }}>
          {p.email && <span style={{ marginRight: '16px', marginBottom: '4px' }}>{p.email}</span>}
          {p.phone && <span style={{ marginRight: '16px', marginBottom: '4px' }}>{p.phone}</span>}
          {p.location && <span style={{ marginRight: '16px', marginBottom: '4px' }}>{p.location}</span>}
          {p.linkedin && <span style={{ marginRight: '16px', marginBottom: '4px' }}>{p.linkedin}</span>}
          {p.github && <span style={{ marginRight: '16px', marginBottom: '4px' }}>{p.github}</span>}
          {p.portfolio && <span style={{ marginRight: '16px', marginBottom: '4px' }}>{p.portfolio}</span>}
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: '#e2e8f0', marginBottom: '20px' }} />

      {/* Summary */}
      {cv.summary && (
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: `${s.fontSize - 1}pt`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#a0aec0',
              marginBottom: '8px'
            }}
          >
            About
          </h3>
          <p style={{ margin: 0, color: '#4a5568', fontSize: `${s.fontSize}pt` }}>{cv.summary}</p>
        </div>
      )}

      {/* Experience */}
      {cv.experience.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: `${s.fontSize - 1}pt`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#a0aec0',
              marginBottom: '12px'
            }}
          >
            Experience
          </h3>
          {cv.experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600, color: '#1a202c', fontSize: `${s.fontSize + 0.5}pt` }}>{exp.title}</span>
                <span style={{ fontSize: `${s.fontSize - 1}pt`, color: '#a0aec0', whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px' }}>
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div style={{ color: '#718096', fontSize: `${s.fontSize - 0.5}pt`, marginBottom: '4px' }}>
                {exp.company} {exp.location ? `· ${exp.location}` : ''}
              </div>
              {exp.bullets.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: '16px', color: '#4a5568' }}>
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
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: `${s.fontSize - 1}pt`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#a0aec0',
              marginBottom: '10px'
            }}
          >
            Education
          </h3>
          {cv.education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600, color: '#1a202c' }}>
                  {edu.degree} {edu.field ? `in ${edu.field}` : ''}
                </span>
                <span style={{ fontSize: `${s.fontSize - 1}pt`, color: '#a0aec0', whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px' }}>
                  {edu.startDate} — {edu.endDate}
                </span>
              </div>
              <div style={{ color: '#718096', fontSize: `${s.fontSize - 0.5}pt` }}>
                {edu.institution} {edu.gpa ? `· GPA ${edu.gpa}` : ''}
              </div>
              {edu.honors && <div style={{ color: '#a0aec0', fontSize: '0.9em' }}>{edu.honors}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {cv.projects.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: `${s.fontSize - 1}pt`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#a0aec0',
              marginBottom: '10px'
            }}
          >
            Selected Projects
          </h3>
          {cv.projects.map((p) => (
            <div key={p.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600, color: '#1a202c' }}>{p.name}</span>
                {p.link && <span style={{ fontSize: '0.85em', color: '#718096', whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px' }}>{p.link}</span>}
              </div>
              {p.technologies.length > 0 && (
                <div style={{ fontSize: '0.85em', color: '#a0aec0', marginBottom: '2px' }}>
                  {p.technologies.join(' · ')}
                </div>
              )}
              {p.description && <div style={{ color: '#4a5568' }}>{p.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {cv.skills.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: `${s.fontSize - 1}pt`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#a0aec0',
              marginBottom: '8px'
            }}
          >
            Skills
          </h3>
          <div>
            {cv.skills.map((cat) => (
              <div key={cat.id} style={{ display: 'flex', alignItems: 'baseline', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, width: '200px', minWidth: '200px', flexShrink: 0, color: '#2d3748', marginRight: '8px' }}>{cat.name}</span>
                <span style={{ color: '#4a5568' }}>{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Languages */}
      {(cv.certifications.length > 0 || cv.languages.length > 0) && (
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          {cv.certifications.length > 0 && (
            <div style={{ flex: 1, paddingRight: cv.languages.length > 0 ? '15px' : '0' }}>
              <h3
                style={{
                  fontSize: `${s.fontSize - 1}pt`,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: '#a0aec0',
                  marginBottom: '8px'
                }}
              >
                Certifications
              </h3>
              {cv.certifications.map((c) => (
                <div key={c.id} style={{ marginBottom: '4px', fontSize: `${s.fontSize - 0.5}pt` }}>
                  <strong>{c.name}</strong> <span style={{ color: '#718096' }}>— {c.issuer}</span>
                </div>
              ))}
            </div>
          )}
          {cv.languages.length > 0 && (
            <div style={{ flex: 1, paddingLeft: cv.certifications.length > 0 ? '15px' : '0' }}>
              <h3
                style={{
                  fontSize: `${s.fontSize - 1}pt`,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: '#a0aec0',
                  marginBottom: '8px'
                }}
              >
                Languages
              </h3>
              <div style={{ fontSize: `${s.fontSize - 0.5}pt`, color: '#4a5568' }}>
                {cv.languages.map((l) => `${l.name} (${l.proficiency})`).join('  ·  ')}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Awards */}
      {cv.awards.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3
            style={{
              fontSize: `${s.fontSize - 1}pt`,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#a0aec0',
              marginBottom: '8px'
            }}
          >
            Awards
          </h3>
          {cv.awards.map((a) => (
            <div key={a.id} style={{ marginBottom: '4px' }}>
              <strong>{a.title}</strong> · {a.issuer} {a.date ? `(${a.date})` : ''}
            </div>
          ))}
        </div>
      )}

      {/* Custom Sections */}
      {cv.customSections
        .filter((sec) => sec.title?.trim() || sec.entries?.some((e) => e.text?.trim()))
        .map((sec) => (
          <div key={sec.id} style={{ marginBottom: '16px' }}>
            <h3
              style={{
                fontSize: `${s.fontSize - 1}pt`,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#a0aec0',
                marginBottom: '8px'
              }}
            >
              {sec.title}
            </h3>
            <ul style={{ margin: 0, paddingLeft: '16px', color: '#4a5568' }}>
              {sec.entries.map((e) => (
                <li key={e.id}>{e.text}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  )
}