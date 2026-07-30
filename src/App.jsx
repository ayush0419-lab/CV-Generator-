import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ResumeForm from './components/ResumeForm';
import Customizer from './components/Customizer';
import ResumePreview from './components/ResumePreview';
import ThreeBackground from './components/ThreeBackground';
import { sampleResumeData, emptyResumeData } from './mockData';
import { Sparkles } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' | 'editor'
  
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    card.style.setProperty('--rx', `${-y / 8}deg`);
    card.style.setProperty('--ry', `${x / 8}deg`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resucraft_resume');
    return saved ? JSON.parse(saved) : sampleResumeData;
  });

  // Autosave to localStorage
  useEffect(() => {
    localStorage.setItem('resucraft_resume', JSON.stringify(resumeData));
  }, [resumeData]);

  // State update handlers
  const updatePersonal = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  // Work experience handlers
  const addWork = () => {
    const newItem = {
      id: `work-${Date.now()}`,
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      work: [...prev.work, newItem]
    }));
  };

  const updateWork = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      work: prev.work.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const deleteWork = (id) => {
    setResumeData(prev => ({
      ...prev,
      work: prev.work.filter(item => item.id !== id)
    }));
  };

  const moveWork = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === resumeData.work.length - 1) return;
    
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const newWork = [...resumeData.work];
    const temp = newWork[index];
    newWork[index] = newWork[targetIdx];
    newWork[targetIdx] = temp;

    setResumeData(prev => ({ ...prev, work: newWork }));
  };

  // Education handlers
  const addEducation = () => {
    const newItem = {
      id: `edu-${Date.now()}`,
      degree: '',
      school: '',
      location: '',
      date: '',
      details: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newItem]
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const deleteEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  };

  const moveEducation = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === resumeData.education.length - 1) return;
    
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const newEdu = [...resumeData.education];
    const temp = newEdu[index];
    newEdu[index] = newEdu[targetIdx];
    newEdu[targetIdx] = temp;

    setResumeData(prev => ({ ...prev, education: newEdu }));
  };

  // Project handlers
  const addProject = () => {
    const newItem = {
      id: `proj-${Date.now()}`,
      name: '',
      role: '',
      link: '',
      tech: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newItem]
    }));
  };

  const updateProject = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const deleteProject = (id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(item => item.id !== id)
    }));
  };

  const moveProject = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === resumeData.projects.length - 1) return;
    
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const newProj = [...resumeData.projects];
    const temp = newProj[index];
    newProj[index] = newProj[targetIdx];
    newProj[targetIdx] = temp;

    setResumeData(prev => ({ ...prev, projects: newProj }));
  };

  // Certifications handlers
  const addCertification = () => {
    const newItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: ''
    };
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newItem]
    }));
  };

  const updateCertification = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const deleteCertification = (id) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(item => item.id !== id)
    }));
  };

  // Languages handlers
  const addLanguage = () => {
    const newItem = {
      id: `lang-${Date.now()}`,
      name: '',
      level: ''
    };
    setResumeData(prev => ({
      ...prev,
      languages: [...prev.languages, newItem]
    }));
  };

  const updateLanguage = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const deleteLanguage = (id) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(item => item.id !== id)
    }));
  };

  // Skills handlers (Categorized list of skills)
  const addSkillCategory = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { category: 'New Skill Category', items: [] }]
    }));
  };

  const updateSkillCategory = (index, value) => {
    setResumeData(prev => {
      const newSkills = [...prev.skills];
      newSkills[index].category = value;
      return { ...prev, skills: newSkills };
    });
  };

  const deleteSkillCategory = (index) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, idx) => idx !== index)
    }));
  };

  const addSkillItem = (categoryIndex, skillText) => {
    if (!skillText.trim()) return;
    setResumeData(prev => {
      const newSkills = [...prev.skills];
      newSkills[categoryIndex].items = [...newSkills[categoryIndex].items, skillText.trim()];
      return { ...prev, skills: newSkills };
    });
  };

  const deleteSkillItem = (categoryIndex, itemIndex) => {
    setResumeData(prev => {
      const newSkills = [...prev.skills];
      newSkills[categoryIndex].items = newSkills[categoryIndex].items.filter((_, idx) => idx !== itemIndex);
      return { ...prev, skills: newSkills };
    });
  };

  // Change sections order
  const moveSection = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === resumeData.sectionsOrder.length - 1) return;

    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const newOrder = [...resumeData.sectionsOrder];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;

    setResumeData(prev => ({ ...prev, sectionsOrder: newOrder }));
  };

  // Style customization handler
  const updateStyle = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      styles: {
        ...prev.styles,
        [field]: value
      }
    }));
  };

  // Preset operations
  const loadSample = () => {
    if(window.confirm('Are you sure you want to load mock data? This will overwrite your current changes.')){
      setResumeData(sampleResumeData);
    }
  };

  const clearAll = () => {
    if(window.confirm('Clear all resume data? This action cannot be undone.')){
      setResumeData(emptyResumeData);
    }
  };

  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(resumeData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `resucraft_${resumeData.personal.fullName?.toLowerCase().replace(/\s+/g, '_') || 'cv'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    if (!file) return;

    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.personal && parsed.styles && parsed.sectionsOrder) {
          setResumeData(parsed);
          alert('Resume data imported successfully!');
        } else {
          alert('Invalid format. Please make sure the JSON file was exported from this generator.');
        }
      } catch (err) {
        alert('Failed to parse file: ' + err.message);
      }
    };
    fileReader.readAsText(file);
  };

  const handlePrint = () => {
    window.print();
  };

  const selectTemplateAndEdit = (templateName) => {
    updateStyle('template', templateName);
    setCurrentPage('editor');
  };

  return (
    <div className="app-container">
      {currentPage === 'landing' && <ThreeBackground />}
      {currentPage === 'landing' ? (
        <div className="landing-hero" onMouseMove={handleHeroMouseMove}>
          <div className="landing-hero-split">
            <div className="landing-hero-left">
              <div className="landing-accent">
                <Sparkles size={14} style={{ marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
                Premium Resume Builder Engine
              </div>
              <h1 className="landing-title">
                Craft Resumes That Land <br />
                <span>Executive Offers.</span>
              </h1>
              <p className="landing-subtitle">
                Generate and customize professional, print-ready ATS-optimized resumes in real-time. Choose design styles, fonts, and colors to tailor your story perfectly.
              </p>

              <button 
                className="btn btn-primary" 
                style={{ padding: '0.85rem 2rem', fontSize: '1rem', borderRadius: '40px', fontWeight: 'bold' }}
                onClick={() => setCurrentPage('editor')}
              >
                Create My Resume Now
              </button>
            </div>

            <div className="landing-hero-right">
              <div className="isometric-container">
                {/* Mockup card 1: Modern */}
                <div className="isometric-card-3d card-3d-1" onClick={() => selectTemplateAndEdit('modern')}>
                  <div className="mock-cv-header">
                    <div className="mock-cv-avatar" />
                    <div>
                      <div className="mock-cv-name" style={{ width: '45px' }} />
                      <div className="mock-cv-title" style={{ background: '#3b82f6' }} />
                    </div>
                  </div>
                  <div className="mock-cv-line highlight" />
                  <div className="mock-cv-line" />
                  <div className="mock-cv-line" style={{ width: '80%' }} />
                  
                  <div className="mock-cv-section">
                    <div className="mock-cv-sectitle" />
                    <div className="mock-cv-line" style={{ height: '3px' }} />
                    <div className="mock-cv-line" style={{ height: '3px', width: '90%' }} />
                  </div>
                  
                  <div className="mock-cv-section" style={{ marginTop: '8px' }}>
                    <div className="mock-cv-sectitle" style={{ width: '25px' }} />
                    <div className="mock-cv-line" style={{ height: '3px', width: '60%' }} />
                  </div>
                </div>
                
                {/* Mockup card 2: Minimalist */}
                <div className="isometric-card-3d card-3d-2" onClick={() => selectTemplateAndEdit('minimal')}>
                  <div className="mock-cv-header" style={{ justifyContent: 'center', borderBottomColor: '#2563eb' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div className="mock-cv-name" style={{ width: '55px', margin: '0 auto' }} />
                      <div className="mock-cv-title" style={{ width: '35px', background: '#2563eb', margin: '3px auto 0 auto' }} />
                    </div>
                  </div>
                  <div className="mock-cv-line" style={{ height: '3px' }} />
                  <div className="mock-cv-line" style={{ height: '3px' }} />
                  <div className="mock-cv-line highlight" style={{ height: '3px', background: 'rgba(37, 99, 235, 0.15)' }} />
                  
                  <div className="mock-cv-section" style={{ marginTop: '8px' }}>
                    <div className="mock-cv-sectitle" style={{ background: '#2563eb', width: '30px' }} />
                    <div className="mock-cv-line" style={{ height: '3px' }} />
                    <div className="mock-cv-line" style={{ height: '3px', width: '85%' }} />
                  </div>
                </div>
                
                {/* Mockup card 3: Creative */}
                <div className="isometric-card-3d card-3d-3" onClick={() => selectTemplateAndEdit('creative')}>
                  <div className="mock-cv-header" style={{ borderBottom: 'none', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', padding: '8px', borderRadius: '4px', color: 'white', marginBottom: '8px' }}>
                    <div className="mock-cv-avatar" style={{ border: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.2)' }} />
                    <div>
                      <div className="mock-cv-name" style={{ background: '#ffffff', width: '40px' }} />
                      <div className="mock-cv-title" style={{ background: '#ffffff', width: '25px', opacity: 0.9 }} />
                    </div>
                  </div>
                  <div className="mock-cv-line highlight" style={{ background: 'rgba(139, 92, 246, 0.15)' }} />
                  <div className="mock-cv-line" />
                  
                  <div className="mock-cv-section" style={{ marginTop: '8px' }}>
                    <div className="mock-cv-sectitle" style={{ background: '#8b5cf6', width: '35px' }} />
                    <div className="mock-cv-line" style={{ height: '3px' }} />
                    <div className="mock-cv-line" style={{ height: '3px', width: '75%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', maxWidth: '1100px', textAlign: 'left', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Choose a design blueprint:
            </h3>
            <div className="landing-cards">
              <div 
                className="landing-card tilt-card-3d" 
                style={{ cursor: 'pointer' }} 
                onClick={() => selectTemplateAndEdit('modern')}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="card-icon">⚡</div>
                <div className="card-title">Modern & Professional</div>
                <div className="card-desc">Sleek split-column layout. Highlights certifications and skills alongside a robust experience timeline.</div>
              </div>
              <div 
                className="landing-card tilt-card-3d" 
                style={{ cursor: 'pointer' }} 
                onClick={() => selectTemplateAndEdit('minimal')}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="card-icon">🍃</div>
                <div className="card-title">Minimalist Canvas</div>
                <div className="card-desc">Understated elegance. Utilizes ample whitespace, clean rules, and precise font multipliers.</div>
              </div>
              <div 
                className="landing-card tilt-card-3d" 
                style={{ cursor: 'pointer' }} 
                onClick={() => selectTemplateAndEdit('creative')}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="card-icon">🎨</div>
                <div className="card-title">Creative Portfolio</div>
                <div className="card-desc">Features bold headers, customizable visual skill trackers, and stylish container boundaries.</div>
              </div>
              <div 
                className="landing-card tilt-card-3d" 
                style={{ cursor: 'pointer' }} 
                onClick={() => selectTemplateAndEdit('executive')}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="card-icon">💼</div>
                <div className="card-title">Classic Executive</div>
                <div className="card-desc">Centered header styles, italicized headers, and traditional serif rendering. High corporate appeal.</div>
              </div>
              <div 
                className="landing-card tilt-card-3d" 
                style={{ cursor: 'pointer' }} 
                onClick={() => selectTemplateAndEdit('developer')}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="card-icon">💻</div>
                <div className="card-title">Developer & Techie</div>
                <div className="card-desc">Monospace code attributes, visual tech brackets, and custom layouts built specifically for engineers.</div>
              </div>
              <div 
                className="landing-card tilt-card-3d" 
                style={{ cursor: 'pointer' }} 
                onClick={() => selectTemplateAndEdit('academic')}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="card-icon">🎓</div>
                <div className="card-title">Academic CV</div>
                <div className="card-desc">Modern research timeline. Emphasizes publications, grants, and side-by-side date alignments.</div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="landing-section">
            <h3 className="section-title-3d">Engine Powers & Features</h3>
            <div className="features-grid-3d">
              <div className="feature-card-3d">
                <div className="feature-icon-3d">🎨</div>
                <h4>Real-Time Aesthetic Studio</h4>
                <p>Swap templates, pick Google Fonts (Inter, Playfair Display, Outfit), adjust base multipliers, set custom margins, and control brand color palettes dynamically.</p>
              </div>
              <div className="feature-card-3d">
                <div className="feature-icon-3d">🔍</div>
                <h4>100% ATS-Optimized Outputs</h4>
                <p>Uses native browser rendering stylesheets. Outputting searchable text-based vectors instead of flat pixelated images to ensure parsers index your data accurately.</p>
              </div>
              <div className="feature-card-3d">
                <div className="feature-icon-3d">🔒</div>
                <h4>Local Sandbox Security</h4>
                <p>Your details are personal. We store all data inside your local browser storage. Export JSON files on-demand for offline backups, or import them next time.</p>
              </div>
              <div className="feature-card-3d">
                <div className="feature-icon-3d">⚡</div>
                <h4>Smart Editing Tools</h4>
                <p>Rearrange entire work/school blocks dynamically, upload profile avatars, and write descriptions with bullet lines parsed automatically into HTML tags.</p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="landing-section" style={{ marginBottom: '6rem' }}>
            <h3 className="section-title-3d">Dynamic Crafting Workflow</h3>
            <div className="steps-row-3d">
              <div className="step-item-3d">
                <div className="step-num-3d">01</div>
                <h4>Choose Blueprint</h4>
                <p>Pick a template style from Classic Executive, Modern, Creative, or Minimalist.</p>
              </div>
              <div className="step-arrow-3d">➔</div>
              <div className="step-item-3d">
                <div className="step-num-3d">02</div>
                <h4>Structure Data</h4>
                <p>Load the mock portfolio template or type in your career logs, academic credentials, and skills.</p>
              </div>
              <div className="step-arrow-3d">➔</div>
              <div className="step-item-3d">
                <div className="step-num-3d">03</div>
                <h4>Download PDF</h4>
                <p>Click Print, adjust standard paper destination, and save your pixel-perfect document.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Header 
            onBack={() => setCurrentPage('landing')} 
            onLoadSample={loadSample}
            onClearAll={clearAll}
            onExportJSON={handleExportJSON}
            onImportJSON={handleImportJSON}
            onPrint={handlePrint}
          />
          <div className="main-content">
            <div className="editor-sidebar">
              <ResumeForm 
                resumeData={resumeData}
                updatePersonal={updatePersonal}
                
                addWork={addWork}
                updateWork={updateWork}
                deleteWork={deleteWork}
                moveWork={moveWork}
                
                addEducation={addEducation}
                updateEducation={updateEducation}
                deleteEducation={deleteEducation}
                moveEducation={moveEducation}
                
                addProject={addProject}
                updateProject={updateProject}
                deleteProject={deleteProject}
                moveProject={moveProject}
                
                addCertification={addCertification}
                updateCertification={updateCertification}
                deleteCertification={deleteCertification}
                
                addLanguage={addLanguage}
                updateLanguage={updateLanguage}
                deleteLanguage={deleteLanguage}
                
                addSkillCategory={addSkillCategory}
                updateSkillCategory={updateSkillCategory}
                deleteSkillCategory={deleteSkillCategory}
                addSkillItem={addSkillItem}
                deleteSkillItem={deleteSkillItem}

                moveSection={moveSection}
              />
            </div>
            
            <ResumePreview resumeData={resumeData} />
            
            <div className="customizer-drawer">
              <Customizer 
                styles={resumeData.styles}
                updateStyle={updateStyle} 
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
