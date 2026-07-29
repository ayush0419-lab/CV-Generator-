import React from 'react';

// Description Parser Helper
const formatDescription = (text) => {
  if (!text) return null;
  const lines = text.split('\n');
  const isBullet = lines.some(l => l.trim().startsWith('-') || l.trim().startsWith('*') || l.trim().startsWith('•'));
  
  if (isBullet) {
    return (
      <ul className="desc-bullets" style={{ margin: '4px 0 0 0', paddingLeft: '16px' }}>
        {lines.filter(l => l.trim() !== '').map((line, idx) => {
          // Remove bullet markers at start
          const content = line.trim().replace(/^[-*•]\s*/, '');
          return <li key={idx} style={{ marginBottom: '2px' }}>{content}</li>;
        })}
      </ul>
    );
  }
  return <div style={{ whiteSpace: 'pre-line' }}>{text}</div>;
};

// Helper for formatting date strings e.g. 2022-03 -> Mar 2022
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  if (dateStr.toLowerCase() === 'present') return 'Present';
  const parts = dateStr.split('-');
  if (parts.length === 2) {
    const d = new Date(parts[0], parts[1] - 1);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
  }
  return dateStr;
};

// Icon map helper
const getInfoIcon = (type) => {
  switch (type) {
    case 'email': 
      return (
        <svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case 'location':
      return (
        <svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case 'website':
      return (
        <svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" width="11" height="11" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    default: return null;
  }
};

function TemplateRenderer({ resumeData }) {
  const { personal, work, education, projects, skills, certifications, languages, sectionsOrder, styles } = resumeData;

  // Formatting variables for spacing based on size
  const fontSizes = {
    small: '12px',
    medium: '14px',
    large: '16px'
  };

  const lineHeights = {
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.7
  };

  const margins = {
    compact: '12mm',
    normal: '20mm',
    spacious: '26mm'
  };

  // Build inline style configurations
  const textStyles = {
    '--resume-fs': fontSizes[styles.fontSize] || '14px',
    '--resume-lh': lineHeights[styles.lineHeight] || 1.5,
    '--resume-margin': margins[styles.margin] || '20mm',
    '--resume-accent': styles.themeColor || '#2563eb',
    '--resume-secondary': styles.secondaryColor || '#475569',
    '--resume-body-color': styles.textColor || '#1e293b',
    '--resume-heading-color': styles.themeColor || '#0a0a0a',
    '--resume-border': '#e2e8f0',
    '--resume-tag-bg': '#f1f5f9',
    '--resume-tag-radius': styles.avatarShape === 'square' ? '2px' : '4px',
  };

  // Check if sections have content to avoid empty headings
  const hasContent = (key) => {
    switch (key) {
      case 'summary': return !!personal.summary;
      case 'work': return work.length > 0;
      case 'education': return education.length > 0;
      case 'projects': return projects.length > 0;
      case 'skills': return skills.some(s => s.items && s.items.length > 0);
      case 'certifications': return certifications.length > 0;
      case 'languages': return languages.length > 0;
      default: return false;
    }
  };

  // Shared widgets rendering
  const renderSkillGroup = (cat, idx) => {
    if (!cat.items || cat.items.length === 0) return null;
    return (
      <div key={idx} className="skill-item-group" style={{ marginBottom: '6px' }}>
        <div className="skill-group-name" style={{ fontWeight: 700, fontSize: '0.85em', color: 'var(--resume-secondary)' }}>
          {cat.category}
        </div>
        {styles.skillStyle === 'tags' ? (
          <div className="skills-tag-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '3px' }}>
            {cat.items.map((it, i) => (
              <span key={i} className="skill-tag" style={{ background: 'var(--resume-tag-bg)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8em', fontWeight: 500 }}>
                {it}
              </span>
            ))}
          </div>
        ) : (
          <div className="skill-group-items" style={{ fontSize: '0.85em', marginTop: '2px' }}>
            {cat.items.join(', ')}
          </div>
        )}
      </div>
    );
  };

  /* ================== TEMPLATE 1: MINIMALIST ================== */
  if (styles.template === 'minimal') {
    return (
      <div className="tpl-minimal" style={textStyles}>
        <div className="minimal-header">
          <h1>{personal.fullName || 'Name Field'}</h1>
          <div className="minimal-title">{personal.title || 'Professional Title'}</div>
          
          <div className="minimal-contact">
            {personal.email && (
              <span className="contact-item">
                {getInfoIcon('email')} {personal.email}
              </span>
            )}
            {personal.phone && (
              <span className="contact-item">
                {getInfoIcon('phone')} {personal.phone}
              </span>
            )}
            {personal.location && (
              <span className="contact-item">
                {getInfoIcon('location')} {personal.location}
              </span>
            )}
            {personal.website && (
              <span className="contact-item">
                {getInfoIcon('website')}
                <a href={personal.website} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  {personal.website.replace(/^https?:\/\//, '')}
                </a>
              </span>
            )}
            {personal.linkedin && (
              <span className="contact-item">
                {getInfoIcon('linkedin')} {personal.linkedin}
              </span>
            )}
            {personal.github && (
              <span className="contact-item">
                {getInfoIcon('github')} {personal.github}
              </span>
            )}
          </div>
        </div>

        {sectionsOrder.map((sectionKey) => {
          if (!hasContent(sectionKey)) return null;

          switch (sectionKey) {
            case 'summary':
              return (
                <div key="summary" className="minimal-section">
                  <h2 className="section-h2">Professional Summary</h2>
                  <p className="minimal-summary">{personal.summary}</p>
                </div>
              );
            case 'work':
              return (
                <div key="work" className="minimal-section">
                  <h2 className="section-h2">Work Experience</h2>
                  {work.map((w) => (
                    <div key={w.id} className="minimal-item">
                      <div className="item-title-row">
                        <span>{w.role}</span>
                        <span>{w.location}</span>
                      </div>
                      <div className="item-meta-row">
                        <span>{w.company}</span>
                        <span>
                          {formatDate(w.startDate)} – {w.current ? 'Present' : formatDate(w.endDate)}
                        </span>
                      </div>
                      <div className="item-desc">{formatDescription(w.description)}</div>
                    </div>
                  ))}
                </div>
              );
            case 'education':
              return (
                <div key="education" className="minimal-section">
                  <h2 className="section-h2">Education</h2>
                  {education.map((edu) => (
                    <div key={edu.id} className="minimal-item" style={{ marginBottom: '8px' }}>
                      <div className="item-title-row">
                        <span>{edu.degree}</span>
                        <span>{edu.location}</span>
                      </div>
                      <div className="item-meta-row">
                        <span>{edu.school}</span>
                        <span>{edu.date}</span>
                      </div>
                      {edu.details && <div className="item-desc" style={{ fontSize: '0.85em', fontStyle: 'italic' }}>{edu.details}</div>}
                    </div>
                  ))}
                </div>
              );
            case 'projects':
              return (
                <div key="projects" className="minimal-section">
                  <h2 className="section-h2">Projects</h2>
                  {projects.map((p) => (
                    <div key={p.id} className="minimal-item">
                      <div className="item-title-row">
                        <span>{p.name} {p.role && <span style={{ fontWeight: 'normal', fontSize: '0.9em' }}>| {p.role}</span>}</span>
                        {p.link && (
                          <span style={{ fontSize: '0.85em', fontWeight: 'normal' }}>
                            <a href={p.link} target="_blank" rel="noreferrer" style={{ color: 'var(--resume-accent)', textDecoration: 'none' }}>Link</a>
                          </span>
                        )}
                      </div>
                      {p.tech && <div style={{ fontSize: '0.8em', color: 'var(--resume-secondary)', fontWeight: 600, margin: '2px 0' }}>Tech Stack: {p.tech}</div>}
                      <div className="item-desc">{formatDescription(p.description)}</div>
                    </div>
                  ))}
                </div>
              );
            case 'skills':
              return (
                <div key="skills" className="minimal-section">
                  <h2 className="section-h2">Skills</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {skills.map((cat, idx) => renderSkillGroup(cat, idx))}
                  </div>
                </div>
              );
            case 'certifications':
              return (
                <div key="certifications" className="minimal-section">
                  <h2 className="section-h2">Certifications</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px', fontSize: '0.9em' }}>
                    {certifications.map((c) => (
                      <div key={c.id}>
                        <span style={{ fontWeight: 700 }}>{c.name}</span> – <span style={{ fontSize: '0.9em' }}>{c.issuer}</span> ({c.date})
                      </div>
                    ))}
                  </div>
                </div>
              );
            case 'languages':
              return (
                <div key="languages" className="minimal-section">
                  <h2 className="section-h2">Languages</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '0.9em' }}>
                    {languages.map((l) => (
                      <div key={l.id}>
                        <span style={{ fontWeight: 700 }}>{l.name}</span>: <span>{l.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  }

  /* ================== TEMPLATE 2: MODERN ================== */
  if (styles.template === 'modern') {
    // For Modern layout, we split sidebar content (skills, languages, contact)
    const renderSidebarContactItem = (type, val) => {
      if (!val) return null;
      return (
        <div className="sidebar-contact-item">
          <span style={{ marginTop: '2px', color: 'rgba(255,255,255,0.7)' }}>{getInfoIcon(type)}</span>
          <span>{type === 'website' ? val.replace(/^https?:\/\//, '') : val}</span>
        </div>
      );
    };

    const sidebarStyle = {
      '--resume-sidebar-bg': styles.themeColor || '#1e293b',
      '--resume-sidebar-text': '#ffffff',
    };

    return (
      <div className="tpl-modern" style={{ ...textStyles, ...sidebarStyle }}>
        {/* SIDEBAR BLOCK */}
        <aside className="modern-sidebar">
          {styles.avatarVisible && personal.avatar && (
            <div className={`avatar-container`} style={{ borderRadius: styles.avatarShape === 'circle' ? '50%' : styles.avatarShape === 'square' ? '4px' : '16px' }}>
              <img src={personal.avatar} alt="Profile" className="avatar-img" />
            </div>
          )}

          <h3 className="sidebar-title" style={{ marginTop: 0 }}>Contact</h3>
          <div className="sidebar-contact-list">
            {renderSidebarContactItem('email', personal.email)}
            {renderSidebarContactItem('phone', personal.phone)}
            {renderSidebarContactItem('location', personal.location)}
            {renderSidebarContactItem('website', personal.website)}
            {renderSidebarContactItem('linkedin', personal.linkedin)}
            {renderSidebarContactItem('github', personal.github)}
          </div>

          {skills.some(c => c.items && c.items.length > 0) && (
            <>
              <h3 className="sidebar-title">Skills</h3>
              <div className="sidebar-skills-list">
                {skills.map((cat, idx) => (
                  <div key={idx} style={{ marginBottom: '6px' }}>
                    <div className="sidebar-skill-gr">{cat.category}</div>
                    <div className="sidebar-skill-dots">
                      {cat.items.map((item, i) => (
                        <span key={i} className="sidebar-skill-dot">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {languages.length > 0 && (
            <>
              <h3 className="sidebar-title">Languages</h3>
              <div className="sidebar-contact-list">
                {languages.map((l) => (
                  <div key={l.id} style={{ display:'flex', flexDirection:'column' }}>
                    <strong style={{ fontSize: '0.85em' }}>{l.name}</strong>
                    <span style={{ fontSize: '0.75em', opacity: 0.8 }}>{l.level}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </aside>

        {/* MAIN BODY BLOCK */}
        <main className="modern-main">
          <header style={{ marginBottom: '1.5rem' }}>
            <h1 className="modern-name">{personal.fullName || 'Name Field'}</h1>
            <div className="modern-title" style={{ color: 'var(--resume-accent)' }}>{personal.title || 'Professional Title'}</div>
          </header>

          {sectionsOrder.map((sectionKey) => {
            // Skip skills and languages because they are in the sidebar
            if (sectionKey === 'skills' || sectionKey === 'languages') return null;
            if (!hasContent(sectionKey)) return null;

            switch (sectionKey) {
              case 'summary':
                return (
                  <div key="summary" className="modern-section">
                    <h2 className="section-h2">Profile Summary</h2>
                    <p className="modern-summary">{personal.summary}</p>
                  </div>
                );
              case 'work':
                return (
                  <div key="work" className="modern-section">
                    <h2 className="section-h2">Professional Experience</h2>
                    {work.map((w) => (
                      <div key={w.id} className="modern-item">
                        <div className="item-header-row">
                          <span className="item-title">{w.role}</span>
                          <span className="item-date">
                            {formatDate(w.startDate)} – {w.current ? 'Present' : formatDate(w.endDate)}
                          </span>
                        </div>
                        <div className="item-sub">{w.company} {w.location && `| ${w.location}`}</div>
                        <div className="item-desc">{formatDescription(w.description)}</div>
                      </div>
                    ))}
                  </div>
                );
              case 'education':
                return (
                  <div key="education" className="modern-section">
                    <h2 className="section-h2">Education</h2>
                    {education.map((edu) => (
                      <div key={edu.id} className="modern-item" style={{ marginBottom: '8px' }}>
                        <div className="item-header-row">
                          <span className="item-title">{edu.degree}</span>
                          <span className="item-date">{edu.date}</span>
                        </div>
                        <div className="item-sub">{edu.school} {edu.location && `| ${edu.location}`}</div>
                        {edu.details && <div className="item-desc" style={{ fontSize: '0.85em', fontStyle: 'italic' }}>{edu.details}</div>}
                      </div>
                    ))}
                  </div>
                );
              case 'projects':
                return (
                  <div key="projects" className="modern-section">
                    <h2 className="section-h2">Highlighted Projects</h2>
                    {projects.map((p) => (
                      <div key={p.id} className="modern-item">
                        <div className="item-header-row">
                          <span className="item-title">{p.name} {p.role && <span style={{ fontWeight: 'normal', fontSize: '0.9em' }}>- {p.role}</span>}</span>
                          {p.link && (
                            <span className="item-date">
                              <a href={p.link} target="_blank" rel="noreferrer" style={{ color: 'var(--resume-accent)', textDecoration: 'none' }}>GitHub Link</a>
                            </span>
                          )}
                        </div>
                        {p.tech && <div style={{ fontSize: '0.8em', color: 'var(--resume-secondary)', fontWeight: 600, margin: '2px 0' }}>Technologies: {p.tech}</div>}
                        <div className="item-desc">{formatDescription(p.description)}</div>
                      </div>
                    ))}
                  </div>
                );
              case 'certifications':
                return (
                  <div key="certifications" className="modern-section">
                    <h2 className="section-h2">Certifications</h2>
                    <ul style={{ paddingLeft: '16px', fontSize: '0.88em' }}>
                      {certifications.map((c) => (
                        <li key={c.id} style={{ marginBottom: '3px' }}>
                          <strong>{c.name}</strong> – {c.issuer} ({c.date})
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              default:
                return null;
            }
          })}
        </main>
      </div>
    );
  }

  /* ================== TEMPLATE 3: CREATIVE ================== */
  if (styles.template === 'creative') {
    return (
      <div className="tpl-creative" style={textStyles}>
        {/* Banner with Gradient Background */}
        <div className="header-banner">
          <div className="header-info-box">
            <h1 className="creative-name">{personal.fullName || 'Name Field'}</h1>
            <p className="creative-title">{personal.title || 'Professional Title'}</p>
          </div>
          {styles.avatarVisible && personal.avatar && (
            <div className="avatar-box-creative" style={{ borderRadius: styles.avatarShape === 'circle' ? '50%' : styles.avatarShape === 'square' ? '4px' : '16px' }}>
              <img src={personal.avatar} alt="Profile" className="avatar-img" />
            </div>
          )}
        </div>

        {/* Contact info strip */}
        <div className="contact-strip">
          {personal.email && <div className="contact-icon-item">{getInfoIcon('email')} {personal.email}</div>}
          {personal.phone && <div className="contact-icon-item">{getInfoIcon('phone')} {personal.phone}</div>}
          {personal.location && <div className="contact-icon-item">{getInfoIcon('location')} {personal.location}</div>}
          {personal.website && (
            <div className="contact-icon-item">
              {getInfoIcon('website')}
              <a href={personal.website} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                {personal.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>

        {/* 2-Columns grid */}
        <div className="creative-columns">
          {/* Main Column */}
          <div className="creative-left-col">
            {sectionsOrder.map((sectionKey) => {
              if (['skills', 'languages', 'certifications'].includes(sectionKey)) return null;
              if (!hasContent(sectionKey)) return null;

              switch (sectionKey) {
                case 'summary':
                  return (
                    <div key="summary" style={{ marginBottom: '1.25rem' }}>
                      <h2 className="section-h2">About Me</h2>
                      <p style={{ fontSize: '0.9em', lineHeight: '1.5' }}>{personal.summary}</p>
                    </div>
                  );
                case 'work':
                  return (
                    <div key="work" style={{ marginBottom: '1.25rem' }}>
                      <h2 className="section-h2">Work History</h2>
                      {work.map((w) => (
                        <div key={w.id} className="creative-item">
                          <div className="item-title">{w.role}</div>
                          <div className="item-company-row">
                            <span>{w.company} | {w.location}</span>
                            <span className="item-dates">
                              {formatDate(w.startDate)} – {w.current ? 'Present' : formatDate(w.endDate)}
                            </span>
                          </div>
                          <div className="item-desc">{formatDescription(w.description)}</div>
                        </div>
                      ))}
                    </div>
                  );
                case 'education':
                  return (
                    <div key="education" style={{ marginBottom: '1.25rem' }}>
                      <h2 className="section-h2">Education</h2>
                      {education.map((edu) => (
                        <div key={edu.id} className="creative-item" style={{ marginBottom: '8px' }}>
                          <div className="item-title">{edu.degree}</div>
                          <div className="item-company-row">
                            <span>{edu.school} | {edu.location}</span>
                            <span className="item-dates">{edu.date}</span>
                          </div>
                          {edu.details && <div className="item-desc" style={{ fontSize: '0.85em', fontStyle: 'italic' }}>{edu.details}</div>}
                        </div>
                      ))}
                    </div>
                  );
                case 'projects':
                  return (
                    <div key="projects" style={{ marginBottom: '1.25rem' }}>
                      <h2 className="section-h2">Projects Portfolio</h2>
                      {projects.map((p) => (
                        <div key={p.id} className="creative-item">
                          <div className="item-title">{p.name} {p.role && <span style={{ fontWeight: 'normal', fontSize: '0.85em' }}>- {p.role}</span>}</div>
                          {p.link && (
                            <div style={{ fontSize: '0.8em', margin: '1px 0' }}>
                              <a href={p.link} target="_blank" rel="noreferrer" style={{ color: 'var(--resume-accent)', textDecoration: 'none' }}>Interactive Showcase</a>
                            </div>
                          )}
                          {p.tech && <div style={{ fontSize: '0.78rem', color: 'var(--resume-secondary)', fontWeight: 700, margin: '2px 0' }}>Stack: {p.tech}</div>}
                          <div className="item-desc">{formatDescription(p.description)}</div>
                        </div>
                      ))}
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>

          {/* Sidebar Column */}
          <div className="creative-right-col" style={{ display:'flex', flexDirection:'column', gap: '1.5rem' }}>
            {skills.some(c => c.items && c.items.length > 0) && (
              <div>
                <h2 className="section-h2">Expertise</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                  {skills.map((cat, idx) => (
                    <div key={idx}>
                      <div style={{ fontSize: '0.82em', fontWeight: 750, color: 'var(--resume-secondary)', marginBottom: '4px' }}>{cat.category}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {cat.items.map((skill, i) => (
                          <span key={i} style={{ fontSize: '0.75em', padding: '2px 8px', background: 'var(--resume-tag-bg)', color: 'var(--resume-body-color)', borderRadius: '12px', border: '1px solid var(--resume-border)', fontWeight: 500 }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <h2 className="section-h2">Certificates</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', fontSize: '0.8em' }}>
                  {certifications.map((c) => (
                    <div key={c.id} style={{ display:'flex', flexDirection:'column', borderBottom: '1px solid var(--resume-border)', paddingBottom: '4px' }}>
                      <strong style={{ color: 'var(--resume-body-color)' }}>{c.name}</strong>
                      <span style={{ opacity: 0.85 }}>{c.issuer} ({c.date})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <h2 className="section-h2">Languages</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '10px', fontSize: '0.8em' }}>
                  {languages.map((l) => (
                    <div key={l.id}>
                      <strong>{l.name}</strong> – <span style={{ opacity: 0.85 }}>{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ================== TEMPLATE 4: EXECUTIVE ================== */
  if (styles.template === 'executive') {
    // Executive has serif styling and centered titles
    const fontOverride = {
      '--resume-font': "'Playfair Display', serif",
      '--resume-heading-color': '#0f172a',
      '--resume-body-color': '#1e293b'
    };

    const contactItems = [];
    if (personal.email) contactItems.push(personal.email);
    if (personal.phone) contactItems.push(personal.phone);
    if (personal.location) contactItems.push(personal.location);
    if (personal.website) contactItems.push(personal.website.replace(/^https?:\/\//, ''));
    if (personal.linkedin) contactItems.push(personal.linkedin);
    if (personal.github) contactItems.push(personal.github);

    return (
      <div className="tpl-executive" style={{ ...textStyles, ...fontOverride }}>
        <div className="executive-header">
          <h1>{personal.fullName || 'Name Field'}</h1>
          <div className="executive-title">{personal.title || 'Professional Title'}</div>
          
          <div className="executive-contact">
            {contactItems.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="contact-sep"> | </span>}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {sectionsOrder.map((sectionKey) => {
          if (!hasContent(sectionKey)) return null;

          switch (sectionKey) {
            case 'summary':
              return (
                <div key="summary" style={{ marginBottom: '1rem' }}>
                  <h2 className="section-h2 font-serif">Executive Profile</h2>
                  <p className="summary-block" style={{ fontSize: '0.88em', textAlign: 'justify', lineHeight: '1.5' }}>{personal.summary}</p>
                </div>
              );
            case 'work':
              return (
                <div key="work" style={{ marginBottom: '1rem' }}>
                  <h2 className="section-h2 font-serif">Professional History</h2>
                  {work.map((w) => (
                    <div key={w.id} className="executive-item">
                      <div className="item-top-line">
                        <span>{w.role}</span>
                        <span>
                          {formatDate(w.startDate)} – {w.current ? 'Present' : formatDate(w.endDate)}
                        </span>
                      </div>
                      <div className="item-mid-line">
                        <span>{w.company}</span>
                        <span>{w.location}</span>
                      </div>
                      <div className="item-desc">{formatDescription(w.description)}</div>
                    </div>
                  ))}
                </div>
              );
            case 'education':
              return (
                <div key="education" style={{ marginBottom: '1rem' }}>
                  <h2 className="section-h2 font-serif">Academic Credentials</h2>
                  {education.map((edu) => (
                    <div key={edu.id} className="executive-item" style={{ marginBottom: '6px' }}>
                      <div className="item-top-line">
                        <span>{edu.degree}</span>
                        <span>{edu.date}</span>
                      </div>
                      <div className="item-mid-line">
                        <span>{edu.school}</span>
                        <span>{edu.location}</span>
                      </div>
                      {edu.details && <div className="item-desc" style={{ fontStyle: 'italic', fontSize: '0.85em' }}>{edu.details}</div>}
                    </div>
                  ))}
                </div>
              );
            case 'projects':
              return (
                <div key="projects" style={{ marginBottom: '1rem' }}>
                  <h2 className="section-h2 font-serif">Acquisitions & Projects</h2>
                  {projects.map((p) => (
                    <div key={p.id} className="executive-item">
                      <div className="item-top-line">
                        <span>{p.name} {p.role && <span style={{ fontWeight: 'normal', fontSize: '0.9em' }}>- {p.role}</span>}</span>
                        {p.link && <span style={{ fontSize: '0.85em', fontWeight: 'normal' }}>{p.link.replace(/^https?:\/\//, '')}</span>}
                      </div>
                      {p.tech && <div style={{ fontSize: '0.8em', fontStyle: 'italic', margin: '1px 0' }}>Ecosystem: {p.tech}</div>}
                      <div className="item-desc">{formatDescription(p.description)}</div>
                    </div>
                  ))}
                </div>
              );
            case 'skills':
              return (
                <div key="skills" style={{ marginBottom: '1rem' }}>
                  <h2 className="section-h2 font-serif">Core Proficiencies</h2>
                  <div className="skills-row">
                    {skills.map((cat, idx) => (
                      <div key={idx} className="executive-skill-group">
                        <div className="skill-group-name">{cat.category}: </div>
                        <div className="skill-group-items">{cat.items.join(', ')}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            case 'certifications':
              return (
                <div key="certifications" style={{ marginBottom: '1rem' }}>
                  <h2 className="section-h2 font-serif">Honors & Certifications</h2>
                  <div style={{ fontSize: '0.88em', lineHeight: 1.5 }}>
                    {certifications.map((c) => (
                      <div key={c.id}>
                        • <strong>{c.name}</strong>, issued by {c.issuer} ({c.date})
                      </div>
                    ))}
                  </div>
                </div>
              );
            case 'languages':
              return (
                <div key="languages" style={{ marginBottom: '1rem' }}>
                  <h2 className="section-h2 font-serif">Languages</h2>
                  <div style={{ fontSize: '0.88em', display:'flex', flexWrap: 'wrap', gap: '15px' }}>
                    {languages.map((l) => (
                      <div key={l.id}>
                        <strong>{l.name}</strong> ({l.level})
                      </div>
                    ))}
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  }

  return null;
}

export default TemplateRenderer;
