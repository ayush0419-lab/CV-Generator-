export const sampleResumeData = {
  personal: {
    fullName: "Alex Rivera",
    title: "Senior Full Stack Devops Engineer",
    email: "alex.rivera@techventure.io",
    phone: "+1 (555) 762-0941",
    location: "Austin, TX (Open to Remote)",
    website: "https://riveradevops.io",
    linkedin: "linkedin.com/in/alex-rivera-devops",
    github: "github.com/riveradevops",
    summary: "Versatile and results-driven Software Engineer with 7+ years of experience designing, building, and deploying microservices architectures, distributed databases, and high-performance cloud environments. Proven track record of automating cloud orchestrations and crafting responsive, accessible user interfaces with rich design systems.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200&h=200" // Premium placeholder image of a professional person
  },
  work: [
    {
      id: "work-1",
      role: "Lead Software & Cloud Engineer",
      company: "CloudBound Systems",
      location: "Austin, TX",
      startDate: "2023-04",
      endDate: "Present",
      current: true,
      description: "- Engineered serverless pipelines handling 5M+ requests daily utilizing Node.js, AWS Lambda, and PostgreSQL.\n- Spearheaded transition from monolithic codebase to Kubernetes microservices, reducing AWS cloud expenditure by 22%.\n- Established developer coding standards, mentored 8 engineers, and cut CI/CD build deployment cycle times in half."
    },
    {
      id: "work-2",
      role: "Senior Full Stack Programmer",
      company: "Quantum Analytics Corp",
      location: "New York, NY",
      startDate: "2020-09",
      endDate: "2023-03",
      current: false,
      description: "- Designed and delivered telemetry charts utilizing React, D3.js, and TypeScript, improving data refresh latency by 35%.\n- Created a robust custom React component library that standardized spacing and theme variables across 4 distinct product lines.\n- Implemented strict WCAG AAA accessibility compliance standards for all public-facing checkout views."
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "M.S. in Computer Science & Distributed Systems",
      school: "University of Texas at Austin",
      location: "Austin, TX",
      date: "2020",
      details: "Top 5% of class. Thesis on optimizing Kubernetes control loops."
    },
    {
      id: "edu-2",
      degree: "B.S. in Software Systems Engineering",
      school: "Georgia Institute of Technology",
      location: "Atlanta, GA",
      date: "2018",
      details: "Graduated Magna Cum Laude. President of Open Source Developers Network."
    }
  ],
  skills: [
    { category: "Programming Languages", items: ["JavaScript (ES6+)", "TypeScript", "Python (Django/Flask)", "Go", "HTML5 & CSS3/Sass"] },
    { category: "Web Ecosystems", items: ["React.js", "Next.js", "Vue.js", "Node.js", "Express", "GraphQL", "REST APIs", "Redux"] },
    { category: "Cloud & Dev Operations", items: ["AWS (EC2, S3, RDS, Lambda)", "Docker", "Kubernetes", "Git & GitHub Actions", "Terraform", "PostgreSQL", "Redis"] }
  ],
  projects: [
    {
      id: "proj-1",
      name: "SaaS Multi-tenant Telemetry Dashboard",
      role: "Lead Architect",
      link: "https://github.com/riveradevops/telemetry",
      tech: "React, TS, Tailwind, ChartJS, WebSockets",
      description: "- Built real-time charting interfaces that render server analytics, database queries, and API response loads in milliseconds.\n- Utilized WebSockets to establish real-time alerts for backend container status changes, serving 1,400 concurrent subscribers."
    },
    {
      id: "proj-2",
      name: "Auto-Deploy Kubernetes Script Toolkit",
      role: "Creator",
      link: "https://github.com/riveradevops/k8s-autotool",
      tech: "Python, Shell scripting, Docker, YAML config",
      description: "- Created automated setup scripts that configure security policies, ingress controllers, and SSL terminations automatically.\n- Streamlined developer pipeline tests, bringing dev environment spin-up times down from 2 hours to 90 seconds."
    }
  ],
  certifications: [
    { id: "cert-1", name: "AWS Certified Solutions Architect – Professional", issuer: "Amazon Web Services", date: "2024" },
    { id: "cert-2", name: "Certified Kubernetes Administrator (CKA)", issuer: "The Linux Foundation", date: "2022" }
  ],
  languages: [
    { id: "lang-1", name: "English", level: "Native / Bilingual" },
    { id: "lang-2", name: "Spanish", level: "Professional Working Proficiency" }
  ],
  sectionsOrder: ["summary", "work", "education", "projects", "skills", "certifications", "languages"],
  styles: {
    template: "modern", // minimal, modern, creative, executive
    themeColor: "#2563eb", // Primary accent
    secondaryColor: "#475569",
    textColor: "#1e293b",
    backgroundColor: "#ffffff",
    fontFamily: "Inter", // Inter, Playfair Display, Outfit, Roboto, Merriweather, Montserrat
    fontSize: "medium", // small, medium, large
    lineHeight: "normal", // snug, normal, relaxed
    margin: "normal", // compact, normal, spacious
    headerStyle: "underline", // simple, underline, banner
    avatarVisible: true,
    avatarShape: "circle", // circle, square, rounded
    skillStyle: "tags", // tags, progress, simple
  }
};

export const emptyResumeData = {
  personal: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    summary: "",
    avatar: ""
  },
  work: [],
  education: [],
  skills: [
    { category: "Skills", items: [] }
  ],
  projects: [],
  certifications: [],
  languages: [],
  sectionsOrder: ["summary", "work", "education", "projects", "skills", "certifications", "languages"],
  styles: {
    template: "minimal",
    themeColor: "#1e293b",
    secondaryColor: "#64748b",
    textColor: "#1e293b",
    backgroundColor: "#ffffff",
    fontFamily: "Inter",
    fontSize: "medium",
    lineHeight: "normal",
    margin: "normal",
    headerStyle: "simple",
    avatarVisible: false,
    avatarShape: "circle",
    skillStyle: "tags",
  }
};
