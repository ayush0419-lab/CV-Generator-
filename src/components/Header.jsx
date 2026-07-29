import React from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Trash2, 
  FileJson, 
  Upload, 
  Printer,
  Compass
} from 'lucide-react';

function Header({ 
  onBack, 
  onLoadSample, 
  onClearAll, 
  onExportJSON, 
  onImportJSON, 
  onPrint 
}) {
  return (
    <header className="app-header no-print">
      <div className="logo-section">
        <button 
          className="btn btn-secondary btn-circle"
          onClick={onBack}
          title="Back to Dashboard"
          id="btn-back-dashboard"
        >
          <ArrowLeft size={16} />
        </button>
        <div className="logo-icon">📝</div>
        <span className="logo-text">ResuCraft <span style={{fontSize: '0.75rem', verticalAlign: 'middle', background: '#3b82f6', color: 'white', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px', fontWeight: 'normal'}}>Vite v1</span></span>
      </div>

      <div className="header-actions">
        <button 
          className="btn btn-secondary btn-sm"
          onClick={onLoadSample}
          title="Load sample resume data"
          id="btn-load-sample"
        >
          <Sparkles size={14} />
          Load Demo
        </button>
        
        <button 
          className="btn btn-secondary btn-sm"
          onClick={onClearAll}
          title="Clear all fields"
          id="btn-clear-all"
        >
          <Trash2 size={14} />
          Clear
        </button>

        <span style={{ borderLeft: '1px solid var(--border-color)', height: '24px', margin: '0 4px' }} />

        <label 
          className="btn btn-secondary btn-sm" 
          title="Import resume from JSON config"
          style={{ margin: 0 }}
          id="lbl-import-json"
        >
          <Upload size={14} />
          Import JSON
          <input 
            type="file" 
            accept=".json" 
            onChange={onImportJSON} 
            style={{ display: 'none' }} 
          />
        </label>
        
        <button 
          className="btn btn-secondary btn-sm"
          onClick={onExportJSON}
          title="Export resume file to local machine"
          id="btn-export-json"
        >
          <FileJson size={14} />
          Export JSON
        </button>

        <button 
          className="btn btn-primary btn-sm"
          onClick={onPrint}
          title="Get PDF of your resume"
          id="btn-download-pdf"
          style={{ paddingLeft: '1.25rem', paddingRight: '1.25rem', fontWeight: 'bold' }}
        >
          <Printer size={14} />
          Print / PDF
        </button>
      </div>
    </header>
  );
}

export default Header;
