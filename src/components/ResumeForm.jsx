import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit2, 
  Award, 
  Globe, 
  Layers, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  ChevronDown, 
  ChevronUp, 
  Upload,
  Link,
  MapPin,
  Calendar
} from 'lucide-react';

function ResumeForm({
  resumeData,
  updatePersonal,
  addWork,
  updateWork,
  deleteWork,
  moveWork,
  addEducation,
  updateEducation,
  deleteEducation,
  moveEducation,
  addProject,
  updateProject,
  deleteProject,
  moveProject,
  addCertification,
  updateCertification,
  deleteCertification,
  addLanguage,
  updateLanguage,
  deleteLanguage,
  addSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
  addSkillItem,
  deleteSkillItem,
  moveSection
}) {
  const [activeTab, setActiveTab] = useState('personal'); 
  const [newSkillText, setNewSkillText] = useState({}); // K: catIdx, V: current writing text

  const toggleTab = (tabName) => {
    setActiveTab(prev => prev === tabName ? '' : tabName);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonal('avatar', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper labels mapping for display
  const sectionLabels = {
    summary: 'Summary / Bio',
    work: 'Work Experience',
    education: 'Education History',
    projects: 'Projects',
    skills: 'Skills Categories',
    certifications: 'Certifications',
    languages: 'Languages'
  };

  return (
    <>
      <div className="panel-header">
        <span className="panel-title">
          <Layers size={18} className="accordion-icon" />
          Content Editor
        </span>
      </div>

      <div className="scrollable-content">
        {/* PERSONAL DETAILS ACCORDION */}
        <div className="accordion-wrapper">
          <div className="accordion-header" onClick={() => toggleTab('personal')}>
            <div className="accordion-header-left">
              <User size={16} className="accordion-icon" />
              <span>Personal Details</span>
            </div>
            {activeTab === 'personal' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          
          {activeTab === 'personal' && (
            <div className="accordion-content">
              {/* Profile Image Uploader */}
              <div className="avatar-upload-container">
                <div className="avatar-preview-box">
                  {resumeData.personal.avatar ? (
                    <img 
                      src={resumeData.personal.avatar} 
                      alt="Avatar" 
                      className="avatar-preview-img" 
                    />
                  ) : (
                    <User size={30} style={{ color: 'var(--text-muted)' }} />
                  )}
                </div>
                <div className="avatar-options">
                  <label className="file-input-btn">
                    <Upload size={12} style={{ marginRight: '4px', display:'inline-block' }} />
                    Upload Photo
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleAvatarChange} 
                      style={{ display: 'none' }} 
                    />
                  </label>
                  {resumeData.personal.avatar && (
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => updatePersonal('avatar', '')}
                      style={{ marginTop: '4px', padding: '2px 8px' }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="input-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={resumeData.personal.fullName}
                  onChange={(e) => updatePersonal('fullName', e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label className="input-label">Professional Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={resumeData.personal.title}
                  onChange={(e) => updatePersonal('title', e.target.value)}
                  placeholder="Senior Software Engineer"
                />
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label className="input-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    value={resumeData.personal.email}
                    onChange={(e) => updatePersonal('email', e.target.value)}
                    placeholder="john.doe@domain.com"
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Phone Number</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    value={resumeData.personal.phone}
                    onChange={(e) => updatePersonal('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label className="input-label">Location</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={resumeData.personal.location}
                    onChange={(e) => updatePersonal('location', e.target.value)}
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">Personal Website</label>
                  <input 
                    type="url" 
                    className="form-input" 
                    value={resumeData.personal.website}
                    onChange={(e) => updatePersonal('website', e.target.value)}
                    placeholder="https://johndoe.dev"
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label className="input-label">LinkedIn username</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={resumeData.personal.linkedin}
                    onChange={(e) => updatePersonal('linkedin', e.target.value)}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div className="form-group">
                  <label className="input-label">GitHub username</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={resumeData.personal.github}
                    onChange={(e) => updatePersonal('github', e.target.value)}
                    placeholder="github.com/johndoe"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="input-label">Professional Summary</label>
                <textarea 
                  className="form-input" 
                  value={resumeData.personal.summary}
                  onChange={(e) => updatePersonal('summary', e.target.value)}
                  placeholder="Brief pitch about your experience, engineering skills, and what makes you unique..."
                />
              </div>
            </div>
          )}
        </div>

        {/* WORK EXPERIENCE ACCORDION */}
        <div className="accordion-wrapper">
          <div className="accordion-header" onClick={() => toggleTab('work')}>
            <div className="accordion-header-left">
              <Briefcase size={16} className="accordion-icon" />
              <span>Work Experience</span>
            </div>
            {activeTab === 'work' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>

          {activeTab === 'work' && (
            <div className="accordion-content">
              {resumeData.work.map((item, idx) => (
                <div key={item.id} className="list-item-card">
                  <div className="list-item-header">
                    <span>{item.company || `Company #${idx+1}`} {item.role && `- ${item.role}`}</span>
                    <div className="list-item-drag-actions">
                      <button className="btn btn-secondary btn-circle btn-sm" onClick={() => moveWork(idx, 'up')} title="Move Up">
                        <ArrowUp size={10} />
                      </button>
                      <button className="btn btn-secondary btn-circle btn-sm" onClick={() => moveWork(idx, 'down')} title="Move Down">
                        <ArrowDown size={10} />
                      </button>
                      <button className="btn btn-danger btn-circle btn-sm" onClick={() => deleteWork(item.id)} title="Delete">
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </div>
                  <div className="list-item-body">
                    <div className="form-group-row">
                      <div className="form-group">
                        <label className="input-label">Job Title / Role</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={item.role} 
                          onChange={(e) => updateWork(item.id, 'role', e.target.value)}
                          placeholder="Software Architect"
                        />
                      </div>
                      <div className="form-group">
                        <label className="input-label">Company Name</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={item.company} 
                          onChange={(e) => updateWork(item.id, 'company', e.target.value)}
                          placeholder="Google LLC"
                        />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-group">
                        <label className="input-label">Location</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={item.location} 
                          onChange={(e) => updateWork(item.id, 'location', e.target.value)}
                          placeholder="Mountain View, CA"
                        />
                      </div>
                      <div className="form-group">
                        <label className="input-label">Currently Employed Here</label>
                        <div style={{ display: 'flex', alignItems: 'center', height: '36px' }}>
                          <input 
                            type="checkbox" 
                            checked={item.current} 
                            style={{ width: '18px', height: '18px', cursor:'pointer' }}
                            onChange={(e) => updateWork(item.id, 'current', e.target.checked)}
                          />
                          <span style={{ marginLeft: '8px', fontSize: '0.9rem' }}>Yes, currently working</span>
                        </div>
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-group">
                        <label className="input-label">Start Date</label>
                        <input 
                          type="month" 
                          className="form-input" 
                          value={item.startDate} 
                          onChange={(e) => updateWork(item.id, 'startDate', e.target.value)}
                        />
                      </div>
                      {!item.current && (
                        <div className="form-group">
                          <label className="input-label">End Date</label>
                          <input 
                            type="month" 
                            className="form-input" 
                            value={item.endDate} 
                            onChange={(e) => updateWork(item.id, 'endDate', e.target.value)}
                          />
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="input-label">Description (Markdown/Bullet Points)</label>
                      <textarea 
                        className="form-input" 
                        value={item.description} 
                        onChange={(e) => updateWork(item.id, 'description', e.target.value)}
                        placeholder="- Led production migration of client databases...&#10;- Configured server deployments..."
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button className="btn btn-secondary" onClick={addWork} style={{ width: '100%' }}>
                <Plus size={14} />
                Add Experience
              </button>
            </div>
          )}
        </div>

        {/* EDUCATION ACCORDION */}
        <div className="accordion-wrapper">
          <div className="accordion-header" onClick={() => toggleTab('education')}>
            <div className="accordion-header-left">
              <GraduationCap size={16} className="accordion-icon" />
              <span>Education</span>
            </div>
            {activeTab === 'education' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>

          {activeTab === 'education' && (
            <div className="accordion-content">
              {resumeData.education.map((item, idx) => (
                <div key={item.id} className="list-item-card">
                  <div className="list-item-header">
                    <span>{item.degree || `Education #${idx+1}`} {item.school && `at ${item.school}`}</span>
                    <div className="list-item-drag-actions">
                      <button className="btn btn-secondary btn-circle btn-sm" onClick={() => moveEducation(idx, 'up')} title="Move Up">
                        <ArrowUp size={10} />
                      </button>
                      <button className="btn btn-secondary btn-circle btn-sm" onClick={() => moveEducation(idx, 'down')} title="Move Down">
                        <ArrowDown size={10} />
                      </button>
                      <button className="btn btn-danger btn-circle btn-sm" onClick={() => deleteEducation(item.id)} title="Delete">
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </div>
                  <div className="list-item-body">
                    <div className="form-group">
                      <label className="input-label">Degree / Certificate / Course</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={item.degree} 
                        onChange={(e) => updateEducation(item.id, 'degree', e.target.value)}
                        placeholder="Bachelor of Science in Computer Science"
                      />
                    </div>
                    <div className="form-group-row">
                      <div className="form-group">
                        <label className="input-label">School / University / Institution</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={item.school} 
                          onChange={(e) => updateEducation(item.id, 'school', e.target.value)}
                          placeholder="Stanford University"
                        />
                      </div>
                      <div className="form-group">
                        <label className="input-label">Location</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={item.location} 
                          onChange={(e) => updateEducation(item.id, 'location', e.target.value)}
                          placeholder="Stanford, CA"
                        />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-group">
                        <label className="input-label">Graduation Date (or expected)</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={item.date} 
                          onChange={(e) => updateEducation(item.id, 'date', e.target.value)}
                          placeholder="June 2021"
                        />
                      </div>
                      <div className="form-group">
                        <label className="input-label">Details / GPA / Honors</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={item.details} 
                          onChange={(e) => updateEducation(item.id, 'details', e.target.value)}
                          placeholder="GPA 3.9/4.0. Special honors project in Web Assembly."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button className="btn btn-secondary" onClick={addEducation} style={{ width: '100%' }}>
                <Plus size={14} />
                Add Education
              </button>
            </div>
          )}
        </div>

        {/* PROJECTS ACCORDION */}
        <div className="accordion-wrapper">
          <div className="accordion-header" onClick={() => toggleTab('projects')}>
            <div className="accordion-header-left">
              <FolderGit2 size={16} className="accordion-icon" />
              <span>Projects</span>
            </div>
            {activeTab === 'projects' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>

          {activeTab === 'projects' && (
            <div className="accordion-content">
              {resumeData.projects.map((item, idx) => (
                <div key={item.id} className="list-item-card">
                  <div className="list-item-header">
                    <span>{item.name || `Project #${idx+1}`} {item.role && `- ${item.role}`}</span>
                    <div className="list-item-drag-actions">
                      <button className="btn btn-secondary btn-circle btn-sm" onClick={() => moveProject(idx, 'up')} title="Move Up">
                        <ArrowUp size={10} />
                      </button>
                      <button className="btn btn-secondary btn-circle btn-sm" onClick={() => moveProject(idx, 'down')} title="Move Down">
                        <ArrowDown size={10} />
                      </button>
                      <button className="btn btn-danger btn-circle btn-sm" onClick={() => deleteProject(item.id)} title="Delete">
                        <Trash2 size={10} />
                      </button>
                    </div>
                  </div>
                  <div className="list-item-body">
                    <div className="form-group-row">
                      <div className="form-group">
                        <label className="input-label">Project Name</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={item.name} 
                          onChange={(e) => updateProject(item.id, 'name', e.target.value)}
                          placeholder="Personal Portfolio Web App"
                        />
                      </div>
                      <div className="form-group">
                        <label className="input-label">Your Role</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={item.role} 
                          onChange={(e) => updateProject(item.id, 'role', e.target.value)}
                          placeholder="Sole Dev / Creator"
                        />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-group">
                        <label className="input-label">Project Link</label>
                        <input 
                          type="url" 
                          className="form-input" 
                          value={item.link} 
                          onChange={(e) => updateProject(item.id, 'link', e.target.value)}
                          placeholder="https://github.com/myproject"
                        />
                      </div>
                      <div className="form-group">
                        <label className="input-label">Technologies Used</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={item.tech} 
                          onChange={(e) => updateProject(item.id, 'tech', e.target.value)}
                          placeholder="React, Sass, Vite, Node.js"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="input-label">Project Description</label>
                      <textarea 
                        className="form-input" 
                        value={item.description} 
                        onChange={(e) => updateProject(item.id, 'description', e.target.value)}
                        placeholder="Explain the scope and achievements..."
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button className="btn btn-secondary" onClick={addProject} style={{ width: '100%' }}>
                <Plus size={14} />
                Add Project
              </button>
            </div>
          )}
        </div>

        {/* SKILLS ACCORDION */}
        <div className="accordion-wrapper">
          <div className="accordion-header" onClick={() => toggleTab('skills')}>
            <div className="accordion-header-left">
              <Wrench size={16} className="accordion-icon" />
              <span>Skills Categories</span>
            </div>
            {activeTab === 'skills' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>

          {activeTab === 'skills' && (
            <div className="accordion-content">
              {resumeData.skills.map((cat, catIdx) => (
                <div key={catIdx} className="list-item-card" style={{ borderStyle: 'dotted' }}>
                  <div className="list-item-header" style={{ background: 'transparent' }}>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={cat.category} 
                      onChange={(e) => updateSkillCategory(catIdx, e.target.value)} 
                      style={{ padding: '0.2rem 0.5rem', background: 'var(--bg-panel)', width: 'auto', fontWeight: 'bold' }}
                    />
                    <button className="btn btn-danger btn-circle btn-sm" onClick={() => deleteSkillCategory(catIdx)}>
                      <Trash2 size={10} />
                    </button>
                  </div>
                  
                  <div className="list-item-body" style={{ padding: '0.75rem 1rem' }}>
                    {/* Tags Lists */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '0.75rem' }}>
                      {cat.items.map((skill, skillIdx) => (
                        <span 
                          key={skillIdx} 
                          style={{
                            background: 'var(--bg-input)',
                            border: '1px solid var(--border-color)',
                            fontSize: '0.8rem',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          {skill}
                          <button 
                            style={{ background: 'none', border:'none', cursor: 'pointer', color: 'var(--danger)', fontWeight: 'bold', fontSize: '0.8rem' }}
                            onClick={() => deleteSkillItem(catIdx, skillIdx)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Add skill (e.g. Git, React)"
                        value={newSkillText[catIdx] || ''}
                        onChange={(e) => setNewSkillText(prev => ({ ...prev, [catIdx]: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkillItem(catIdx, newSkillText[catIdx] || '');
                            setNewSkillText(prev => ({ ...prev, [catIdx]: '' }));
                          }
                        }}
                        style={{ padding: '0.4rem 0.60rem', fontSize: '0.85rem' }}
                      />
                      <button 
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          addSkillItem(catIdx, newSkillText[catIdx] || '');
                          setNewSkillText(prev => ({ ...prev, [catIdx]: '' }));
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button className="btn btn-secondary" onClick={addSkillCategory} style={{ width: '100%' }}>
                <Plus size={14} />
                Add Skill Category
              </button>
            </div>
          )}
        </div>

        {/* CERTIFICATIONS AND AWARDS ACCORDION */}
        <div className="accordion-wrapper">
          <div className="accordion-header" onClick={() => toggleTab('certifications')}>
            <div className="accordion-header-left">
              <Award size={16} className="accordion-icon" />
              <span>Certifications</span>
            </div>
            {activeTab === 'certifications' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>

          {activeTab === 'certifications' && (
            <div className="accordion-content">
              {resumeData.certifications.map((item, idx) => (
                <div key={item.id} className="list-item-card" style={{ padding: '10px' }}>
                  <div className="form-group">
                    <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      Certification Name
                      <button 
                        className="btn btn-danger btn-circle btn-sm" 
                        onClick={() => deleteCertification(item.id)}
                        style={{ width: '20px', height: '20px' }}
                      >
                        🗑️
                      </button>
                    </label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={item.name} 
                      onChange={(e) => updateCertification(item.id, 'name', e.target.value)}
                      placeholder="AWS Certified Solutions Architect"
                    />
                  </div>
                  <div className="form-group-row">
                    <div className="form-group">
                      <label className="input-label">Issuer</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={item.issuer} 
                        onChange={(e) => updateCertification(item.id, 'issuer', e.target.value)}
                        placeholder="Amazon Web Services"
                      />
                    </div>
                    <div className="form-group">
                      <label className="input-label">Year</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={item.date} 
                        onChange={(e) => updateCertification(item.id, 'date', e.target.value)}
                        placeholder="2023"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button className="btn btn-secondary" onClick={addCertification} style={{ width: '100%' }}>
                <Plus size={14} />
                Add Certification
              </button>
            </div>
          )}
        </div>

        {/* LANGUAGES ACCORDION */}
        <div className="accordion-wrapper">
          <div className="accordion-header" onClick={() => toggleTab('languages')}>
            <div className="accordion-header-left">
              <Globe size={16} className="accordion-icon" />
              <span>Languages</span>
            </div>
            {activeTab === 'languages' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>

          {activeTab === 'languages' && (
            <div className="accordion-content">
              {resumeData.languages.map((item, idx) => (
                <div key={item.id} className="list-item-card" style={{ padding: '10px' }}>
                  <div className="form-group-row">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="input-label">Language</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={item.name} 
                        onChange={(e) => updateLanguage(item.id, 'name', e.target.value)}
                        placeholder="French"
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="input-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        Proficiency
                        <button 
                          onClick={() => deleteLanguage(item.id)}
                          style={{ border: 'none', background: 'none', color: 'var(--danger)', cursor: 'pointer' }}
                        >
                          Remove
                        </button>
                      </label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={item.level} 
                        onChange={(e) => updateLanguage(item.id, 'level', e.target.value)}
                        placeholder="Professional / C1"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button className="btn btn-secondary" onClick={addLanguage} style={{ width: '100%' }}>
                <Plus size={14} />
                Add Language
              </button>
            </div>
          )}
        </div>

        {/* SECTION REORDER ACCORDION */}
        <div className="accordion-wrapper">
          <div className="accordion-header" onClick={() => toggleTab('reorder')}>
            <div className="accordion-header-left">
              <Layers size={16} className="accordion-icon" />
              <span>Section Ordering</span>
            </div>
            {activeTab === 'reorder' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>

          {activeTab === 'reorder' && (
            <div className="accordion-content">
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.4' }}>
                Organize the vertical structure of your resume by rearranging these panels:
              </p>
              {resumeData.sectionsOrder.map((sectionKey, idx) => (
                <div key={sectionKey} className="section-reorder-item">
                  <div className="section-reorder-info">
                    <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{idx + 1}.</span>
                    <span>{sectionLabels[sectionKey]}</span>
                  </div>
                  <div className="list-item-drag-actions">
                    <button className="btn btn-secondary btn-circle btn-sm" onClick={() => moveSection(idx, 'up')} title="Move Up">
                      <ArrowUp size={10} />
                    </button>
                    <button className="btn btn-secondary btn-circle btn-sm" onClick={() => moveSection(idx, 'down')} title="Move Down">
                      <ArrowDown size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ResumeForm;
