import React, { useRef, useState, useEffect } from 'react';
import TemplateRenderer from './TemplateRenderer';
import { Eye } from 'lucide-react';

function ResumePreview({ resumeData }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.85);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth - 64; // accounting for padding
      const a4WidthPx = 794; // 210mm translated at ~96 DPI A4 standard width is 793.7px
      
      if (containerWidth < a4WidthPx) {
        setScale(containerWidth / a4WidthPx);
      } else {
        setScale(1);
      }
    };

    // Trigger initially and on resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Dynamic timeout to handle drawer toggling animations
    const timer = setTimeout(handleResize, 150);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [resumeData.styles.template, resumeData.styles.fontSize, resumeData.styles.margin]);

  return (
    <div className="preview-container" ref={containerRef}>
      {/* Top Helper badge */}
      <div className="preview-status-bar no-print">
        <Eye size={12} />
        <span>Live Canvas Preview ({Math.round(scale * 100)}% scale)</span>
      </div>

      {/* Styled Scaler Div */}
      <div 
        className="resume-scaler"
        style={{
          transform: `scale(${scale})`,
          width: '794px', // Fixed A4 width representation
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div className="resume-paper" style={{ fontFamily: `'${resumeData.styles.fontFamily}', sans-serif` }}>
          <TemplateRenderer resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
