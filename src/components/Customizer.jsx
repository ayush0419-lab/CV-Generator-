import React from 'react';
import { 
  Palette, 
  Type, 
  Layout, 
  SlidersHorizontal,
  CircleDot
} from 'lucide-react';

const PRESET_PALETTES = [
  { name: 'Navy & Slate', primary: '#1e3a8a', secondary: '#475569', labelBg: '#f1f5f9' },
  { name: 'Emerald forest', primary: '#047857', secondary: '#334155', labelBg: '#ecfdf5' },
  { name: 'Deep Purple', primary: '#6d28d9', secondary: '#475569', labelBg: '#f5f3ff' },
  { name: 'Classic Black', primary: '#0f172a', secondary: '#475569', labelBg: '#f8fafc' },
  { name: 'Rose Gold', primary: '#b91c1c', secondary: '#78716c', labelBg: '#fff5f5' }
];

const GOOGLE_FONTS = [
  { name: 'Outfit', family: "'Outfit', sans-serif" },
  { name: 'Inter', family: "'Inter', sans-serif" },
  { name: 'Montserrat', family: "'Montserrat', sans-serif" },
  { name: 'Playfair Display', family: "'Playfair Display', serif" },
  { name: 'Merriweather', family: "'Merriweather', serif" },
  { name: 'Roboto', family: "'Roboto', sans-serif" }
];

function Customizer({ styles, updateStyle }) {
  const applyPalette = (palette) => {
    updateStyle('themeColor', palette.primary);
    updateStyle('secondaryColor', palette.secondary);
  };

  return (
    <>
      <div className="panel-header">
        <span className="panel-title">
          <Palette size={18} className="accordion-icon" />
          Style & Layout
        </span>
      </div>

      <div className="scrollable-content">
        {/* Templates Selection */}
        <div className="customizer-section">
          <div className="customizer-title">Blueprints</div>
          <div className="template-grid">
            {[
              { id: 'modern', name: 'Modern' },
              { id: 'minimal', name: 'Minimalist' },
              { id: 'creative', name: 'Creative' },
              { id: 'executive', name: 'Executive' },
              { id: 'developer', name: 'Dev / Techie' },
              { id: 'academic', name: 'Academic / CV' }
            ].map(tpl => (
              <div 
                key={tpl.id}
                className={`template-card ${styles.template === tpl.id ? 'active' : ''}`}
                onClick={() => updateStyle('template', tpl.id)}
              >
                <div className="template-card-preview">
                  <div className="mini-layout">
                    {tpl.id === 'modern' && (
                      <div className="mini-body">
                        <div className="mini-sidebar" style={{ background: 'rgba(59, 130, 246, 0.4)' }} />
                        <div className="mini-main">
                          <div className="mini-line" />
                          <div className="mini-line short" />
                        </div>
                      </div>
                    )}
                    {tpl.id === 'minimal' && (
                      <div className="mini-main" style={{ gap: '4px' }}>
                        <div className="mini-header" style={{ height: '5px' }} />
                        <div className="mini-line" />
                        <div className="mini-line" />
                        <div className="mini-line short" />
                      </div>
                    )}
                    {tpl.id === 'creative' && (
                      <div className="mini-main" style={{ gap: '4.5px' }}>
                        <div className="mini-header" style={{ height: '7px', background: 'linear-gradient(to right, #a855f7, #ec4899)' }} />
                        <div className="mini-line" style={{ width: '90%' }} />
                        <div className="mini-line" />
                      </div>
                    )}
                    {tpl.id === 'executive' && (
                      <div className="mini-main" style={{ alignItems: 'center', gap: '4px' }}>
                        <div className="mini-header" style={{ height: '4px', width: '50%' }} />
                        <div className="mini-line" style={{ width: '95%' }} />
                        <div className="mini-line" style={{ width: '95%' }} />
                        <div className="mini-line short" style={{ width: '40%' }} />
                      </div>
                    )}
                    {tpl.id === 'developer' && (
                      <div className="mini-main" style={{ gap: '3px', background: 'rgba(21, 38, 64, 0.4)', padding: '4px', borderRadius: '2px' }}>
                        <div className="mini-header" style={{ height: '4px', background: '#3b82f6' }} />
                        <div className="mini-line" style={{ width: '80%', background: '#cbd5e1' }} />
                        <div className="mini-line" style={{ width: '90%', background: '#cbd5e1' }} />
                        <div className="mini-line short" style={{ width: '50%', background: '#3b82f6' }} />
                      </div>
                    )}
                    {tpl.id === 'academic' && (
                      <div className="mini-main" style={{ gap: '3px', padding: '4px' }}>
                        <div className="mini-header" style={{ height: '3px', width: '70%', background: '#475569', margin: '0 auto' }} />
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                          <span style={{ width: '12px', height: '2px', background: '#94a3b8', display: 'block' }} />
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <div className="mini-line" style={{ width: '90%' }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                          <span style={{ width: '12px', height: '2px', background: '#94a3b8', display: 'block' }} />
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <div className="mini-line" style={{ width: '80%' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="template-card-name">{tpl.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div className="customizer-section">
          <div className="customizer-title">Color accents</div>
          <div className="palette-container">
            {PRESET_PALETTES.map((pal, idx) => (
              <div 
                key={idx}
                className={`palette-row ${styles.themeColor === pal.primary && styles.secondaryColor === pal.secondary ? 'active' : ''}`}
                onClick={() => applyPalette(pal)}
              >
                <div className="palette-name">{pal.name}</div>
                <div className="palette-colors">
                  <div className="palette-color-dot" style={{ backgroundColor: pal.primary }} />
                  <div className="palette-color-dot" style={{ backgroundColor: pal.secondary }} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="custom-colors-row">
            <div className="color-picker-box">
              <span>Accent</span>
              <input 
                type="color" 
                className="picker-input" 
                value={styles.themeColor} 
                onChange={(e) => updateStyle('themeColor', e.target.value)} 
              />
            </div>
            <div className="color-picker-box">
              <span>Secondary</span>
              <input 
                type="color" 
                className="picker-input" 
                value={styles.secondaryColor} 
                onChange={(e) => updateStyle('secondaryColor', e.target.value)} 
              />
            </div>
            <div className="color-picker-box">
              <span>Text</span>
              <input 
                type="color" 
                className="picker-input" 
                value={styles.textColor} 
                onChange={(e) => updateStyle('textColor', e.target.value)} 
              />
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="customizer-section">
          <div className="customizer-title">Typography</div>
          <div style={{ marginBottom: '1rem' }} className="font-select-list">
            {GOOGLE_FONTS.map(f => (
              <div 
                key={f.name}
                className={`font-option ${styles.fontFamily === f.name ? 'active' : ''}`}
                style={{ fontFamily: f.family }}
                onClick={() => updateStyle('fontFamily', f.name)}
              >
                <span>{f.name}</span>
                {styles.fontFamily === f.name && <CircleDot size={12} style={{ color: 'var(--accent)' }} />}
              </div>
            ))}
          </div>

          <div className="form-group">
            <span className="input-label">Font Scale</span>
            <div className="segmented-select">
              {[
                { id: 'small', val: 'Small' },
                { id: 'medium', val: 'Medium' },
                { id: 'large', val: 'Large' }
              ].map(opt => (
                <div 
                  key={opt.id}
                  className={`segmented-option ${styles.fontSize === opt.id ? 'active' : ''}`}
                  onClick={() => updateStyle('fontSize', opt.id)}
                >
                  {opt.val}
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <span className="input-label">Line Spacing</span>
            <div className="segmented-select">
              {[
                { id: 'snug', val: 'Snug' },
                { id: 'normal', val: 'Normal' },
                { id: 'relaxed', val: 'Relaxed' }
              ].map(opt => (
                <div 
                  key={opt.id}
                  className={`segmented-option ${styles.lineHeight === opt.id ? 'active' : ''}`}
                  onClick={() => updateStyle('lineHeight', opt.id)}
                >
                  {opt.val}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Framing Layout Options */}
        <div className="customizer-section">
          <div className="customizer-title">A4 Framing</div>
          
          <div className="form-group">
            <span className="input-label">Page Margins</span>
            <div className="segmented-select">
              {[
                { id: 'compact', val: 'Compact' },
                { id: 'normal', val: 'Normal' },
                { id: 'spacious', val: 'Wide' }
              ].map(opt => (
                <div 
                  key={opt.id}
                  className={`segmented-option ${styles.margin === opt.id ? 'active' : ''}`}
                  onClick={() => updateStyle('margin', opt.id)}
                >
                  {opt.val}
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <span className="input-label">User Photo</span>
            <div className="segmented-select">
              {[
                { id: true, val: 'Show Photo' },
                { id: false, val: 'Hide Photo' }
              ].map(opt => (
                <div 
                  key={opt.id.toString()}
                  className={`segmented-option ${styles.avatarVisible === opt.id ? 'active' : ''}`}
                  onClick={() => updateStyle('avatarVisible', opt.id)}
                >
                  {opt.val}
                </div>
              ))}
            </div>
          </div>

          {styles.avatarVisible && (
            <div className="form-group">
              <span className="input-label">Photo Shape</span>
              <div className="segmented-select">
                {[
                  { id: 'circle', val: 'Circle' },
                  { id: 'square', val: 'Square' },
                  { id: 'rounded', val: 'Rounded' }
                ].map(opt => (
                  <div 
                    key={opt.id}
                    className={`segmented-option ${styles.avatarShape === opt.id ? 'active' : ''}`}
                    onClick={() => updateStyle('avatarShape', opt.id)}
                  >
                    {opt.val}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="form-group">
            <span className="input-label">Skill styling</span>
            <div className="segmented-select">
              {[
                { id: 'tags', val: 'Tags' },
                { id: 'simple', val: 'Simple List' }
              ].map(opt => (
                <div 
                  key={opt.id}
                  className={`segmented-option ${styles.skillStyle === opt.id ? 'active' : ''}`}
                  onClick={() => updateStyle('skillStyle', opt.id)}
                >
                  {opt.val}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customizer;
