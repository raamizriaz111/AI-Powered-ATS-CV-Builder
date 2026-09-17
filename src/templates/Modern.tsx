import { CVData } from '../types/cv'

export default function Modern({ cv }: { cv: CVData }) {
  const s = cv.settings
  const p = cv.personal
  const accent = s.accentColor || '#2563eb'

  return (
    <div
      style={{
        fontFamily: s.font || 'Arial, sans-serif',
        fontSize: `${s.fontSize}pt`,
        lineHeight: s.lineSpacing,
        display: 'flex',
        minHeight: '100%',
        color: '#2d3748',
        backgroundColor: '#fff',
        boxSizing: 'border-box'
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: '34%',
          backgroundColor: accent,
          color: '#ffffff',
          padding: `${s.margins}in`,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div>
          <h1
            style={{
              fontSize: `${s.headingSize + 6}pt`,
              fontWeight: 'bold',
              margin: '0 0 6px 0',
              lineHeight: 1.1,
              letterSpacing: '-0.5px'
            }}
          >
            {p.name || 'Your Name'}
          </h1>
          {p.title && (
            <div style={{ fontSize: `${s.fontSize + 1}pt`, opacity: 0.95, fontWeight: 500 }}>
              {p.title}
            </div>
          )}
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              fontSize: `${s.fontSize + 1}pt`,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderBottom: '1px solid rgba(255,255,255,0.3)',
              paddingBottom: '4px',
              marginBottom: '10px'
            }}
          >
            Contact
          </h4>
          <div style={{ fontSize: `${s.fontSize - 0.5}pt`, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {p.email && <div>✉ {p.email}</div>}
            {p.phone && <div>☎ {p.phone}</div>}
            {p.location && <div>📍 {p.location}</div>}
            {p.linkedin && <div>in {p.linkedin}</div>}
            {p.github && <div>⚡ {p.github}</div>}
            {p.portfolio && <div>🌐 {p.portfolio}</div>}
          </div>
        </div>

        {/* Skills */}
        {cv.skills.length > 0 && (
          <div>
            <h4
              style={{
                fontSize: `${s.fontSize + 1}pt`,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: '1px solid rgba(255,255,255,0.3)',
                paddingBottom: '4px',
                marginBottom: '10px'
              }}
            >
              Skills
            </h4>
            {cv.skills.map((cat) => (
              <div key={cat.id} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 600, fontSize: `${s.fontSize - 0.5}pt`, marginBottom: '4px' }}>
                  {cat.name}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {cat.skills.map((skill, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.18)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: `${s.fontSize - 1.5}pt`
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {cv.languages.length > 0 && (
          <div>
            <h4
              style={{
                fontSize: `${s.fontSize + 1}pt`,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: '1px solid rgba(255,255,255,0.3)',
                paddingBottom: '4px',
                marginBottom: '8px'
              }}
            >
              Languages
            </h4>
            <div style={{ fontSize: `${s.fontSize - 0.5}pt` }}>
              {cv.languages.map((l) => (
                <div key={l.id} style={{ marginBottom: '4px' }}>
                  <strong>{l.name}</strong> <span style={{ opacity: 0.85 }}>({l.proficiency})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications in sidebar */}
        {cv.certifications.length > 0 && (
          <div>
            <h4
              style={{
                fontSize: `${s.fontSize + 1}pt`,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: '1px solid rgba(255,255,255,0.3)',
                paddingBottom: '4px',
                marginBottom: '8px'
              }}
            >
              Certifications
            </h4>
            <div style={{ fontSize: `${s.fontSize - 1}pt` }}>
              {cv.certifications.map((c) => (
                <div key={c.id} style={{ marginBottom: '6px' }}>
                  <div style={{ fontWeight: 600 }}>{c.name}</div>
                  <div style={{ opacity: 0.85 }}>
                    {c.issuer} {c.date ? `• ${c.date}` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        style={{
          width: '66%',
          padding: `${s.margins}in`,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}
      >
        {/* Profile */}
        {cv.summary && (
          <div>
            <h2
              style={{
                fontSize: `${s.headingSize}pt`,
                fontWeight: 'bold',
                color: accent,
                borderBottom: `2px solid ${accent}`,
                margin: '0 0 8px 0',
                paddingBottom: '3px'
              }}
            >
              Profile Summary
            </h2>
            <div style={{ color: '#4a5568' }}>{cv.summary}</div>
          </div>
        )}

        {/* Work Experience */}
        {cv.experience.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: `${s.headingSize}pt`,
                fontWeight: 'bold',
                color: accent,
                borderBottom: `2px solid ${accent}`,
                margin: '0 0 10px 0',
                paddingBottom: '3px'
              }}
            >
              Experience
            </h2>
            {cv.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span style={{ fontSize: `${s.fontSize + 0.5}pt` }}>{exp.title}</span>
                  <span style={{ color: accent, fontSize: `${s.fontSize - 0.5}pt` }}>
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div style={{ fontWeight: 600, color: '#718096', fontSize: `${s.fontSize - 0.5}pt`, marginBottom: '4px' }}>
                  {exp.company}
                  {exp.location ? ` | ${exp.location}` : ''}
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', color: '#4a5568' }}>
                  {exp.bullets.map((b, i) => (
                    <li key={i} style={{ marginBottom: '3px' }}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {cv.projects.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: `${s.headingSize}pt`,
                fontWeight: 'bold',
                color: accent,
                borderBottom: `2px solid ${accent}`,
                margin: '0 0 10px 0',
                paddingBottom: '3px'
              }}
            >
              Key Projects
            </h2>
            {cv.projects.map((pr) => (
              <div key={pr.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>{pr.name}</span>
                  {pr.link && (
                    <span style={{ color: accent, fontSize: '0.85em', fontWeight: 'normal' }}>{pr.link}</span>
                  )}
                </div>
                {pr.technologies.length > 0 && (
                  <div style={{ color: '#718096', fontSize: '0.85em', marginBottom: '3px' }}>
                    {pr.technologies.join(' • ')}
                  </div>
                )}
                {pr.description && <div style={{ color: '#4a5568' }}>{pr.description}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {cv.education.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: `${s.headingSize}pt`,
                fontWeight: 'bold',
                color: accent,
                borderBottom: `2px solid ${accent}`,
                margin: '0 0 10px 0',
                paddingBottom: '3px'
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
                  <span style={{ color: accent, fontSize: `${s.fontSize - 0.5}pt` }}>
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <div style={{ color: '#718096', fontSize: `${s.fontSize - 0.5}pt` }}>
                  {edu.institution}
                  {edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                </div>
                {edu.honors && <div style={{ color: '#4a5568', fontStyle: 'italic', fontSize: '0.9em' }}>{edu.honors}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Awards & Custom */}
        {cv.awards.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: `${s.headingSize}pt`,
                fontWeight: 'bold',
                color: accent,
                borderBottom: `2px solid ${accent}`,
                margin: '0 0 8px 0',
                paddingBottom: '3px'
              }}
            >
              Awards & Honors
            </h2>
            {cv.awards.map((a) => (
              <div key={a.id} style={{ marginBottom: '4px' }}>
                <strong>{a.title}</strong> – {a.issuer} {a.date ? `(${a.date})` : ''}
              </div>
            ))}
          </div>
        )}

        {cv.customSections.map((sec) => (
          <div key={sec.id}>
            <h2
              style={{
                fontSize: `${s.headingSize}pt`,
                fontWeight: 'bold',
                color: accent,
                borderBottom: `2px solid ${accent}`,
                margin: '0 0 8px 0',
                paddingBottom: '3px'
              }}
            >
              {sec.title}
            </h2>
            <ul style={{ margin: 0, paddingLeft: '18px', color: '#4a5568' }}>
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