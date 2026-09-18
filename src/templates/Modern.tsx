import { CVData } from '../types/cv'

export default function Modern({ cv }: { cv: CVData }) {
  const s = cv.settings
  const p = cv.personal
  const accent = s.accentColor || '#2563eb'

  const renderSidebarHeader = (title: string) => (
    <div
      style={{
        fontSize: `${s.fontSize + 1}pt`,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#ffffff',
        borderBottom: '1px solid rgba(255,255,255,0.35)',
        paddingBottom: '6px',
        marginBottom: '10px',
        lineHeight: 1.2
      }}
    >
      {title}
    </div>
  )

  const renderMainHeader = (title: string) => (
    <div
      style={{
        fontSize: `${s.headingSize}pt`,
        fontWeight: 'bold',
        color: accent,
        letterSpacing: '0.5px',
        borderBottom: `2px solid ${accent}`,
        paddingBottom: '7px',
        marginBottom: '10px',
        lineHeight: 1.2
      }}
    >
      {title}
    </div>
  )

  return (
    <div
      style={{
        fontFamily: s.font || 'Arial, sans-serif',
        fontSize: `${s.fontSize}pt`,
        lineHeight: s.lineSpacing,
        display: 'flex',
        minHeight: '297mm',
        color: '#2d3748',
        backgroundColor: '#fff',
        boxSizing: 'border-box'
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: '35%',
          minWidth: '35%',
          backgroundColor: accent,
          color: '#ffffff',
          padding: `${Math.min(s.margins || 0.6, 0.4)}in`,
          boxSizing: 'border-box',
          alignSelf: 'stretch'
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <h1
            style={{
              fontSize: `${s.headingSize + 6}pt`,
              fontWeight: 'bold',
              margin: '0 0 6px 0',
              lineHeight: 1.1,
              letterSpacing: '-0.5px',
              wordBreak: 'break-word'
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
        <div style={{ marginBottom: '20px' }}>
          {renderSidebarHeader('Contact')}
          <div style={{ fontSize: `${s.fontSize - 1}pt` }}>
            {p.email && (
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '6px' }}>
                <span style={{ marginRight: '6px', opacity: 0.9 }}>✉</span>
                <span style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>{p.email}</span>
              </div>
            )}
            {p.phone && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ marginRight: '6px', opacity: 0.9 }}>☎</span>
                <span style={{ whiteSpace: 'nowrap' }}>{p.phone}</span>
              </div>
            )}
            {p.location && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ marginRight: '6px', opacity: 0.9 }}>📍</span>
                <span>{p.location}</span>
              </div>
            )}
            {p.linkedin && (
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '6px' }}>
                <span style={{ marginRight: '6px', fontWeight: 'bold', opacity: 0.9 }}>in</span>
                <span style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>{p.linkedin}</span>
              </div>
            )}
            {p.github && (
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '6px' }}>
                <span style={{ marginRight: '6px', opacity: 0.9 }}>⚡</span>
                <span style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>{p.github}</span>
              </div>
            )}
            {p.portfolio && (
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '6px' }}>
                <span style={{ marginRight: '6px', opacity: 0.9 }}>🌐</span>
                <span style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>{p.portfolio}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {cv.skills.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            {renderSidebarHeader('Skills')}
            {cv.skills.map((cat) => (
              <div key={cat.id} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 600, fontSize: `${s.fontSize - 0.5}pt`, marginBottom: '4px' }}>
                  {cat.name}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {cat.skills.map((skill, i) => (
                    <span
                      key={i}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.18)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: `${s.fontSize - 1.5}pt`,
                        marginRight: '4px',
                        marginBottom: '4px',
                        display: 'inline-block'
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
          <div style={{ marginBottom: '20px' }}>
            {renderSidebarHeader('Languages')}
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
          <div style={{ marginBottom: '20px' }}>
            {renderSidebarHeader('Certifications')}
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
          width: '65%',
          padding: `${s.margins}in`,
          boxSizing: 'border-box'
        }}
      >
        {/* Profile */}
        {cv.summary && (
          <div style={{ marginBottom: '18px' }}>
            {renderMainHeader('Profile Summary')}
            <div style={{ color: '#4a5568' }}>{cv.summary}</div>
          </div>
        )}

        {/* Work Experience */}
        {cv.experience.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            {renderMainHeader('Experience')}
            {cv.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 'bold' }}>
                  <span style={{ fontSize: `${s.fontSize + 0.5}pt` }}>{exp.title}</span>
                  <span style={{ color: accent, fontSize: `${s.fontSize - 0.5}pt`, whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px' }}>
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
          <div style={{ marginBottom: '18px' }}>
            {renderMainHeader('Key Projects')}
            {cv.projects.map((pr) => (
              <div key={pr.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 'bold' }}>
                  <span>{pr.name}</span>
                  {pr.link && (
                    <span style={{ color: accent, fontSize: '0.85em', fontWeight: 'normal', whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px' }}>{pr.link}</span>
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
          <div style={{ marginBottom: '18px' }}>
            {renderMainHeader('Education')}
            {cv.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 'bold' }}>
                  <span>
                    {edu.degree}
                    {edu.field ? ` in ${edu.field}` : ''}
                  </span>
                  <span style={{ color: accent, fontSize: `${s.fontSize - 0.5}pt`, whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px' }}>
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
          <div style={{ marginBottom: '18px' }}>
            {renderMainHeader('Awards & Honors')}
            {cv.awards.map((a) => (
              <div key={a.id} style={{ marginBottom: '4px' }}>
                <strong>{a.title}</strong> – {a.issuer} {a.date ? `(${a.date})` : ''}
              </div>
            ))}
          </div>
        )}

        {cv.customSections
          .filter((sec) => sec.title?.trim() || (sec.entries && sec.entries.some((e) => e.text?.trim())))
          .map((sec) => (
            <div key={sec.id} style={{ marginBottom: '18px' }}>
              {sec.title?.trim() && renderMainHeader(sec.title)}
              {sec.entries && sec.entries.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: '18px', color: '#4a5568' }}>
                  {sec.entries.map((e) => (
                    <li key={e.id}>{e.text}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}