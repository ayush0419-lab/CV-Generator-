# Project Report: ResuCraft - ATS-Optimized Premium Resume Builder Engine

**ResuCraft** is a premium, client-side React web application designed to allow job seekers to draft, structure, style, and compile professional, Applicant Tracking System (ATS) optimized resumes. Built in React 19 and Vite with zero external database dependencies, the application ensures absolute privacy through localized sandboxing and dynamic browser typesetting.

---

## 1. Project Objectives
*   **Data Privacy & Client Sandboxing**: Maintain security by storing all data locally in the browser sandbox (`localStorage`), supplemented by offline backup options.
*   **High-Fidelity Customization**: Enable instantaneous real-time rendering adjustments for page margins, fonts, spacing size, section ordering, and color accents.
*   **ATS Optimization**: Compile selectable-text vector PDFs via native browser print directives instead of rasterized canvases, ensuring ATS parser indexing.
*   **Premium Interactive Design**: Wow visitors on first load with Three.js-powered responsive WebGL backgrounds and cursor-tracking 3D hover effects.

---

## 2. Technology Stack
The application is constructed with clean and modular dependencies:
*   **Core Logic**: React.js (v19.2) & React-DOM.
*   **Build Environment**: Vite (v8.1) for high-speed hot-reload compilation (HMR).
*   **Graphics & Render Engines**: Three.js (v0.185) for compiling and rendering WebGL models and particles.
*   **Vector Iconography**: Lucide React (v1.27) for high-performance outline glyphs.
*   **Linting Suite**: Oxlint (v1.71) for immediate Rust-powered syntax validation.
*   **Styling**: Pure CSS3 utilizing customizable variables, flex-grids, and print-media classes.

---

## 3. Directory Layout and Component Map

```
intership2/
├── index.html                   # HTML mount plate with Outfit/Inter Google fonts imports
├── vite.config.js               # Vite configurations for React plugin mapping
├── package.json                 # Declares dependencies (React, Three, Lucide)
├── .oxlintrc.json               # Oxlint linter compiler configuration file
├── src/
│   ├── main.jsx                 # Bootstraps the React root renderer onto the DOM
│   ├── App.jsx                  # Main coordinator of application state and dashboard view-nav
│   ├── App.css                  # Style sheet for editor panels and layout overrides
│   ├── index.css                # Global design system, glassmorphism tokens, and print definitions
│   ├── mockData.js              # Mock resume schemas for both demo loads and blank slates
│   └── components/
│       ├── ThreeBackground.jsx  # Interactive WebGL background (TorusKnot + Particle particles)
│       ├── Header.jsx           # Navigation toolbar (JSON import/export, load sample, trigger print)
│       ├── ResumeForm.jsx       # Forms panel including personal, work, projects, skills, certifications
│       ├── Customizer.jsx       # Styles manager (Blueprints, fonts, A4 margins, shape controllers)
│       ├── ResumePreview.jsx    # Calculates viewport scale to fit A4 paper emulation perfectly
│       └── TemplateRenderer.jsx # Maps data into specified layout templates (Modern/Minimalist...)
```

---

## 4. Key Functional Features & Architecture

### A. Real-Time Style Drawer (Customizer.jsx)
Features a reactive sidebar containing configuration adjustments that maps to the CSS variables declared in `index.css`:
*   **Six Layout Blueprints**:
    1.  *Modern Layout*: Left vertical dark sidebar focusing on contact metrics, categorized tags, and credentials; right column displays core timelines.
    2.  *Minimalist Layout*: Traditional single-column layout centered on clean margins and typographic hierarchy.
    3.  *Creative Layout*: Displays custom horizontal photo banners, gradient headings, and visual tags grid.
    4.  *Executive Layout*: Uses serif formatting, traditional headers, justified text alignment, and italic secondary details for corporate alignment.
    5.  *Developer & Techie Layout*: Monospace styles, code decorations (like brackets wrapper on dates), ecosystem banners, and specific skills grid built for engineers.
    6.  *Academic CV Layout*: Traditional academic timeline utilizing a date-aligned left-hand column and structured appointments details column on the right.
*   **Unified Color Schemes**: Allows manual hex picks or presets (Navy & Slate, Emerald Forest, Rose Gold, Deep Purple, Classic Black) that dynamically rewrite text and highlight colors.
*   **Typography Controls**: Maps direct selector options to Google Fonts (Outfit, Inter, Montserrat, Playfair Display, Merriweather, Roboto).
*   **A4 Spacing Control**: Sets font scale size (Small, Medium, Large), line spacing heights (Snug, Normal, Relaxed), and margins (Compact, Normal, Spacious).

### B. Interactive 3D WebGL Visual Layout (ThreeBackground.jsx)
*   **TorusKnot Geometry**: Builds a spinning TorusKnot (`TorusKnotGeometry(60, 20, 120, 16)`) rendered in wireframe mode with low opacity for an elegant accent.
*   **Particle Engine**: Instantiates a floating particle field utilizing custom buffer attributes (`BufferGeometry`), housing 150 points moving along independent velocity axes inside a bounding coordinate zone.
*   **Dynamic Lerped Parallax**: Captures screen mouse moves, converting coordinates relative to center, and applies a linear interpolation (`lerp`) script to drift the Three.js Perspective Camera:
    ```javascript
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;
    camera.position.x = 250 * Math.sin(targetX * 0.003);
    camera.position.y = -targetY * 0.4;
    camera.lookAt(scene.position);
    ```
*   **3D Hover Tilts**: Features a perspective card effect in the landing page using interactive hover coordinates to compute card rotation style matrices:
    ```javascript
    card.style.setProperty('--rx', `${-y / 8}deg`);
    card.style.setProperty('--ry', `${x / 8}deg`);
    ```

### C. Live A4 Scaling Preview (ResumePreview.jsx)
To ensure the resume preview looks exactly as it will layout when printed on real A4 paper (`210mm x 297mm`), the system uses a design width standard of `794px` (A4 represented at 96 DPI). To fit this screen area responsively, a custom resize watcher calculates scale constraints:
```javascript
const containerWidth = containerRef.current.clientWidth - 64;
const a4WidthPx = 794;
if (containerWidth < a4WidthPx) {
  setScale(containerWidth / a4WidthPx);
} else {
  setScale(1);
}
```
This computed double value is applied as an inline transform: `transform: scale(${scale})`, giving a zoom-independent preview panel.

### D. Bullet Point Parser & Formatter (TemplateRenderer.jsx)
Offers auto-parsing of descriptions. When a user pastes work logs containing bullet symbols, it splits the lines and outputs structured HTML bullet arrays:
```javascript
const formatDescription = (text) => {
  if (!text) return null;
  const lines = text.split('\n');
  const isBullet = lines.some(l => l.trim().startsWith('-') || l.trim().startsWith('*') || l.trim().startsWith('•'));
  
  if (isBullet) {
    return (
      <ul className="desc-bullets">
        {lines.filter(l => l.trim() !== '').map((line, idx) => {
          const content = line.trim().replace(/^[-*•]\s*/, '');
          return <li key={idx}>{content}</li>;
        })}
      </ul>
    );
  }
  return <div style={{ whiteSpace: 'pre-line' }}>{text}</div>;
};
```

### E. Local Portability Sandbox (App.jsx & Header.jsx)
*   **Autosave**: Watches state variations, writing the resume structure string to client storage:
    ```javascript
    useEffect(() => {
      localStorage.setItem('resucraft_resume', JSON.stringify(resumeData));
    }, [resumeData]);
    ```
*   **JSON Portability**: Downloads data objects as formatted text files:
    ```javascript
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(resumeData, null, 2))}`;
    ...
    downloadAnchor.setAttribute('download', `resucraft_name.json`);
    ```
*   **System Print Bindings**: A trigger links to `window.print()`. The global `.no-print` stylesheets dynamically mask headers, customizers, sidebars, and WebGL canvases during compiling, making only the resume page render on the printer output.

---

## 5. Verification Plan
1.  **Local Dev Startup**:
    *   Command: `npm run dev`
    *   Verifies HMR functionality, hot routes, and static asset loading.
2.  **Lint Status**:
    *   Command: `npm run lint`
    *   Runs the `oxlint` engine to verify there are zero runtime syntax errors.
3.  **PDF Layout Check**:
    *   Trigger build and run in mock browser settings.
    *   Verify margins clamp correctly under print page settings and fonts load correctly.
