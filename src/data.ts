export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AI & Machine Learning' | 'Full-Stack Systems' | 'Core Engineering';
  featured: boolean;
  description: string;
  longDescription: string;
  highlights: string[];
  tags: string[];
  chips: string[];
  githubUrl: string;
  link: string;
  liveUrl?: string;
  number?: string;
  type?: 'compiler' | 'tinyform' | 'timetable' | string;
  metrics?: { label: string; value: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score?: string;
  scoreLabel?: string;
  location: string;
  highlights: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  category: 'Competition' | 'Credential' | 'Delegation' | 'Engineering';
  description: string;
  badgeText: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level?: string; featured?: boolean }[];
}

export interface StatItem {
  id?: string;
  label: string;
  value: any;
  suffix?: string;
  decimals?: number;
  sublabel: string;
}

export interface JourneyItem {
  year: string;
  title: string;
  org: string;
  desc: string;
}

export interface AwardItem {
  platform: string;
  count: string;
  label: string;
  accent: 'red' | 'black';
}

export interface CertItem {
  title: string;
  issuer: string;
  year: string;
  isRed: boolean;
}

export interface PortfolioData {
  name: {
    first: string;
    last: string;
    full: string;
  };
  role: {
    line1: string;
    line2: string;
    full: string;
  };
  status: {
    available: boolean;
    text: string;
  };
  hero: {
    greeting: string;
    headline: string;
    subheadline: string;
    summary: string;
    tagline: string;
    primaryCta: string;
    secondaryCta: string;
    resumeUrl: string;
  };
  stats: StatItem[];
  about: {
    label: string;
    bio: string[];
    manifesto: string[];
    keywords: string[];
    stats: StatItem[];
    focusAreas: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  work: {
    label: string;
    projects: Project[];
  };
  projects: Project[];
  skillCategories: SkillCategory[];
  skills: {
    label: string;
    title: {
      line1: string;
      line2: string;
    };
    orbitList: string[];
    marqueeList: string[];
  };
  journey: {
    label: string;
    title: {
      line1: string;
      line2: string;
    };
    startYear: number;
    gradYear: number;
    items: JourneyItem[];
  };
  awards: {
    label: string;
    counters: AwardItem[];
    certifications: CertItem[];
  };
  education: EducationItem[];
  achievements: AchievementItem[];
  contact: {
    label: string;
    title: {
      line1: string;
      line2: string;
    };
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    resumeUrl: string;
    emailUser: string;
    emailDomain: string;
    fullEmail: string;
    links: { name: string; url: string; cursor: string }[];
    copyrightYear: number;
  };
}

export const PORTFOLIO_DATA: PortfolioData = {
  name: {
    first: 'Murari',
    last: 'Gangavarapu',
    full: 'Gangavarapu Murari',
  },
  role: {
    line1: 'AI & MACHINE LEARNING',
    line2: 'FULL-STACK ENGINEER',
    full: 'AI & Machine Learning Engineer • Full-Stack Developer',
  },
  status: {
    available: true,
    text: 'Available for Summer 2026 AI & SWE Internships',
  },
  hero: {
    greeting: 'Hello, I am Gangavarapu Murari',
    headline: 'Engineering High-Performance AI Systems & Modern Web Applications',
    subheadline:
      'Computer Science (AI & ML) undergraduate at G. D. Goenka University with an 8.56 CGPA. Combining deep learning, explainable AI, and reactive full-stack architectures.',
    summary:
      'Passionate about building production-ready applications where mathematical machine learning models integrate seamlessly with low-latency, scalable web systems.',
    tagline:
      'Computer Science engineer specializing in AI/ML and reactive full-stack architectures. Building intelligent compilers, offline neural systems, and constraint engines with uncompromising precision.',
    primaryCta: 'Explore Projects',
    secondaryCta: 'Download Résumé',
    resumeUrl: './resume.pdf',
  },
  stats: [
    {
      id: 'cgpa',
      value: '8.56',
      label: 'Academic CGPA',
      sublabel: 'G. D. Goenka University (AI & ML)',
    },
    {
      id: 'problems',
      value: '500+',
      label: 'Algorithmic Problems',
      sublabel: 'Data Structures & Competitive Coding',
    },
    {
      id: 'systems',
      value: '4+',
      label: 'Core AI & Web Systems',
      sublabel: 'From MRI Diagnostics to Compilers',
    },
    {
      id: 'rank',
      value: '2nd',
      label: 'Hackathon Podium',
      sublabel: 'Competitive Programming Prize',
    },
  ],
  about: {
    label: '(01) — ABOUT ME',
    manifesto: [
      'I BUILD SYSTEMS WHERE',
      'INTELLIGENCE MEETS PURE PERFORMANCE.',
      'FROM COMPILED FULL-STACK APPS',
      'TO PRIVATE ON-DEVICE NEURAL MODELS,',
      'EVERY ARCHITECTURE IS DESIGNED',
      'FOR SCALE, SPEED, AND DETERMINISTIC CLARITY.',
    ],
    keywords: ['INTELLIGENCE', 'PERFORMANCE', 'FULL-STACK', 'ON-DEVICE', 'SCALE'],
    bio: [
      'I am a Computer Science and Engineering undergraduate specializing in Artificial Intelligence and Machine Learning at G. D. Goenka University. My journey combines algorithmic rigor with practical software craftsmanship.',
      'From developing medical diagnostic computer vision models with Grad-CAM explainability to engineering autonomous full-stack compilers deployed on cloud infrastructure, I focus on building systems that solve tangible problems with high reliability and zero unnecessary complexity.',
      'When I am not training models or architecting backend services, I solve competitive programming problems on LeetCode and explore local on-device neural inference techniques for privacy-first AI applications.',
    ],
    stats: [
      {
        id: 'cgpa',
        label: 'ACADEMIC CGPA',
        value: 8.56,
        suffix: '',
        decimals: 2,
        sublabel: 'G. D. Goenka University B.Tech CSE (AI & ML)',
      },
      {
        id: 'problems',
        label: 'ALGORITHMS SOLVED',
        value: 520,
        suffix: '+',
        decimals: 0,
        sublabel: 'Competitive Programming & Data Structures',
      },
      {
        id: 'rank',
        label: 'CODING PRIZE',
        value: 2,
        suffix: 'ND',
        decimals: 0,
        sublabel: 'Statewide Competitive Hackathon Podium',
      },
    ],
    focusAreas: [
      {
        title: 'Deep Learning & Explainable AI',
        description:
          'Designing convolutional and transformer architectures for computer vision and NLP with interpretability layers such as Grad-CAM for clinical and enterprise transparency.',
        icon: 'brain',
      },
      {
        title: 'Reactive Full-Stack Architecture',
        description:
          'Constructing end-to-end web applications with modern React, TypeScript, FastAPI, and PostgreSQL designed for sub-second responses and clean API ergonomics.',
        icon: 'layers',
      },
      {
        title: 'Algorithms & Constraint Optimization',
        description:
          'Applying mathematical constraint satisfaction algorithms, graph colorings, and heuristic search to resolve complex combinatorial scheduling and resource allocation problems.',
        icon: 'cpu',
      },
    ],
  },
  projects: [
    {
      id: 'neurovision-ai',
      number: '01',
      title: 'NeuroVision AI',
      tagline: 'Deep Learning Brain MRI Tumor Classification with Grad-CAM Explainability',
      category: 'AI & Machine Learning',
      type: 'compiler',
      featured: true,
      description:
        'A deep convolutional neural network system for automated multi-class brain MRI tumor detection and classification (Glioma, Meningioma, Pituitary, and Normal scans). Incorporates Grad-CAM visual explainability to provide clinicians with transparent radiological heatmaps.',
      longDescription:
        'NeuroVision AI addresses a critical challenge in clinical AI diagnostics: the "black box" problem. Built with PyTorch and FastAPI, the model performs high-accuracy multi-class tumor classification on T1-weighted contrast-enhanced MRI scans. Through Gradient-weighted Class Activation Mapping (Grad-CAM), the application computes gradients flowing into final convolutional layers to generate interpretable visual heatmaps, confirming that predictions correlate with anatomical lesions rather than image artifacts.',
      highlights: [
        'Multi-class brain MRI tumor classification across four distinct diagnostic classes.',
        'Grad-CAM heatmap overlays rendered in real-time for clinical explainability and verification.',
        'High-performance FastAPI inference endpoint with comprehensive image preprocessing and normalization.',
        'Clean, accessible web interface for scan upload, confidence distribution analysis, and report generation.',
      ],
      tags: ['Python', 'PyTorch', 'Grad-CAM', 'Computer Vision', 'FastAPI', 'React', 'Medical AI'],
      chips: ['Python', 'PyTorch', 'Grad-CAM', 'FastAPI'],
      githubUrl: 'https://github.com/gmurari2006/neurovision-ai',
      link: 'https://github.com/gmurari2006/neurovision-ai',
      liveUrl: 'https://github.com/gmurari2006/neurovision-ai',
      metrics: [
        { label: 'Classification Classes', value: '4 Classes' },
        { label: 'Explainability', value: 'Grad-CAM' },
        { label: 'Inference Latency', value: '<120ms' },
      ],
    },
    {
      id: 'lifesync',
      number: '02',
      title: 'LifeSync',
      tagline: 'AI-Assisted Pre-Hospital Emergency Coordination & Trauma Readiness Platform',
      category: 'AI & Machine Learning',
      type: 'tinyform',
      featured: true,
      description:
        'A mission-critical emergency triage and dispatch platform that synchronizes first responders, emergency medical technicians, and trauma center surgical teams to maximize survival outcomes during the golden hour.',
      longDescription:
        'LifeSync transforms pre-hospital emergency care by closing the data gap between ambulances in transit and receiving hospital trauma bays. The platform continuously ingests on-scene vital signs, mechanism of injury, and patient telemetry to compute predictive emergency severity scores. Operating over low-latency WebSockets, LifeSync alerts trauma teams in advance, ensuring surgical suites, blood banks, and critical specialists are prepared prior to ambulance arrival.',
      highlights: [
        'Real-time vital sign telemetry streaming and AI-assisted emergency severity indexing.',
        'Automated hospital matching based on live ICU bed status, surgical capacity, and transit proximity.',
        'Bidirectional incident messaging between paramedic crews and emergency physicians.',
        'Privacy-conscious architectural design with strict encrypted data transmission.',
      ],
      tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'WebSockets', 'Healthcare AI', 'Tailwind CSS'],
      chips: ['Python', 'FastAPI', 'React', 'WebSockets'],
      githubUrl: 'https://github.com/gmurari2006/lifesync',
      link: 'https://github.com/gmurari2006/lifesync',
      liveUrl: 'https://github.com/gmurari2006/lifesync',
      metrics: [
        { label: 'Sync Latency', value: '<50ms' },
        { label: 'Telemetry Channels', value: 'Real-Time' },
        { label: 'Triage Assistance', value: 'Severity Index' },
      ],
    },
    {
      id: 'avishkar-portal',
      number: '03',
      title: 'AVISHKAR Student Registration Portal',
      tagline: 'Enterprise University Symposium Registration & Administrative Event System',
      category: 'Full-Stack Systems',
      type: 'timetable',
      featured: true,
      description:
        'An enterprise-grade registration, team formation, and administrative management portal built for the university-wide annual AVISHKAR symposium, handling hundreds of concurrent student submissions.',
      longDescription:
        'Architected to replace fragmented spreadsheet workflows with an automated, role-based platform. The AVISHKAR portal enables students to seamlessly browse technical symposium tracks, create cross-departmental teams, submit project abstracts, and receive automated registration tickets with unique verification QR codes. University administrators benefit from real-time analytics dashboards, batch email notifications, and automated check-in scanning on event day.',
      highlights: [
        'High-concurrency student registration pipeline with automated schema validation and duplicate detection.',
        'Dynamic team assembly system with invite tokens, captain permissions, and track locking.',
        'QR-code generation and validation for rapid event-day attendee check-ins.',
        'Comprehensive administrative analytics panel for tracking registration quotas and team demographics.',
      ],
      tags: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'QR Verification'],
      chips: ['React', 'TypeScript', 'PostgreSQL', 'FastAPI'],
      githubUrl: 'https://github.com/gmurari2006/avishkar-portal',
      link: 'https://github.com/gmurari2006/avishkar-portal',
      liveUrl: 'https://github.com/gmurari2006/avishkar-portal',
      metrics: [
        { label: 'Workflow', value: '100% Automated' },
        { label: 'Check-In System', value: 'Instant QR' },
        { label: 'User Roles', value: 'RBAC Security' },
      ],
    },
    {
      id: 'ai-study-buddy',
      number: '04',
      title: 'AI Study Buddy',
      tagline: 'Intelligent Adaptive Learning Assistant & Semantic Note Synthesizer',
      category: 'AI & Machine Learning',
      type: 'compiler',
      featured: true,
      description:
        'A conversational study assistant powered by retrieval-augmented generation (RAG) that ingests academic lecture slides, notes, and textbooks to generate tailored flashcards, practice quizzes, and cited explanations.',
      longDescription:
        'AI Study Buddy bridges the gap between passive reading and active recall. Using vector embeddings and local or API-driven LLMs, the platform allows students to upload course syllabi and PDF readings. It generates interactive concept maps, creates spaced-repetition flashcards, and conducts diagnostic quiz sessions that adapt question difficulty based on the student’s demonstrated comprehension.',
      highlights: [
        'Retrieval-Augmented Generation (RAG) over uploaded course materials with source paragraph citations.',
        'Active recall flashcard generation and adaptive self-assessment quizzes.',
        'Semantic search across semester lecture notes and textbook chapters.',
        'Clean responsive UI with distraction-free dark study interface.',
      ],
      tags: ['Python', 'LangChain', 'RAG', 'Vector Embeddings', 'FastAPI', 'React', 'TypeScript'],
      chips: ['Python', 'LangChain', 'RAG', 'FastAPI'],
      githubUrl: 'https://github.com/gmurari2006/ai-study-buddy',
      link: 'https://github.com/gmurari2006/ai-study-buddy',
      liveUrl: 'https://github.com/gmurari2006/ai-study-buddy',
      metrics: [
        { label: 'Retrieval Method', value: 'Vector RAG' },
        { label: 'Learning Modes', value: 'Quiz & Flashcards' },
        { label: 'Source Verification', value: 'Cited References' },
      ],
    },
    {
      id: 'compiler',
      number: '05',
      title: 'AI App Compiler',
      tagline: 'Natural-Language Full-Stack Code Synthesizer & Deployment Pipeline',
      category: 'Full-Stack Systems',
      type: 'compiler',
      featured: false,
      description:
        'Automated software generator that converts natural language requirements into complete full-stack application blueprints, database schemas, and FastAPI endpoints packaged for cloud deployment.',
      longDescription:
        'Engineered to accelerate early prototyping. The system parses functional software requirements, synthesizes data models with foreign-key relationships, creates RESTful route handlers, and scaffolds responsive React frontend pages. Deployed on Render Cloud with an interactive web code explorer and zip packaging.',
      highlights: [
        'Automated database schema synthesis and FastAPI endpoint generation.',
        'Interactive web-based code explorer with file tree navigation.',
        'Production containerization and continuous hosting on Render Cloud.',
      ],
      tags: ['Python', 'FastAPI', 'React', 'Docker', 'Render Cloud'],
      chips: ['Python', 'FastAPI', 'React', 'Render Cloud'],
      githubUrl: 'https://github.com/gmurari2006/ai-app-compiler',
      link: 'https://github.com/gmurari2006/ai-app-compiler',
      liveUrl: 'https://github.com/gmurari2006/ai-app-compiler',
    },
    {
      id: 'tinyform',
      number: '06',
      title: 'TinyFormAI',
      tagline: 'Private On-Device NLP Inference Engine with Zero Server Dependencies',
      category: 'AI & Machine Learning',
      type: 'tinyform',
      featured: false,
      description:
        'A lightweight natural language processing pipeline running entirely offline on client hardware, eliminating server latency and guaranteeing 100% data privacy.',
      longDescription:
        'Built for sensitive offline environments where cloud transmission is unacceptable. TinyFormAI utilizes compressed local models to execute text classification, sentiment detection, and entity extraction directly inside the runtime environment without calling external cloud APIs.',
      highlights: [
        'Zero cloud reliance: all weights and computation remain strictly on-device.',
        'Zero API subscription costs and immune to external network outages.',
        'Optimized computational footprint tailored for commodity hardware.',
      ],
      tags: ['Python', 'On-Device AI', 'NLP', 'Privacy-First', 'Edge Compute'],
      chips: ['Python', 'NLP Inference', 'On-Device', 'Zero-Cloud'],
      githubUrl: 'https://github.com/gmurari2006/tinyform-ai',
      link: 'https://github.com/gmurari2006/tinyform-ai',
      liveUrl: 'https://github.com/gmurari2006/tinyform-ai',
    },
    {
      id: 'timetable',
      number: '07',
      title: 'Intelligent Timetable Generator',
      tagline: 'Constraint Satisfaction & Graph Coloring Scheduling Engine',
      category: 'Core Engineering',
      type: 'timetable',
      featured: false,
      description:
        'Mathematical scheduling engine applying graph coloring heuristics and constraint logic programming to generate zero-conflict university timetables across hundreds of faculty and rooms.',
      longDescription:
        'Transforms a classic NP-complete combinatorial scheduling dilemma into an automated sub-second solver. Considers complex constraints including professor availability, room capacities, lab equipment requirements, and student batch overlaps.',
      highlights: [
        'Constraint satisfaction solver utilizing graph coloring heuristics.',
        'Drastic reduction in manual scheduling hours with zero room or instructor collisions.',
        'Modular input specifications supporting custom university policy constraints.',
      ],
      tags: ['Python', 'Constraint Logic', 'Graph Theory', 'Algorithms', 'Optimization'],
      chips: ['Python', 'Optimization', 'Constraint Logic', 'Algorithms'],
      githubUrl: 'https://github.com/gmurari2006/timetable-generator',
      link: 'https://github.com/gmurari2006/timetable-generator',
      liveUrl: 'https://github.com/gmurari2006/timetable-generator',
    },
    {
      id: 'chat-with-pdf',
      number: '08',
      title: 'Chat with PDF System',
      tagline: 'Context-Aware Natural Language Document Comprehension Tool',
      category: 'AI & Machine Learning',
      type: 'compiler',
      featured: false,
      description:
        'Document question-answering tool allowing users to query dense technical PDFs in natural language with precise semantic context retrieval.',
      longDescription:
        'Extracts, chunks, and indexes PDF contents to provide accurate, hallucination-resistant answers with paragraph-level references, serving as a dependable reference reader for academic research papers.',
      highlights: [
        'Semantic document chunking and vector retrieval.',
        'High-accuracy factual question-answering over multi-page technical texts.',
        'Context-grounded responses with direct citations.',
      ],
      tags: ['Python', 'NLP', 'PDF Processing', 'RAG', 'Vector Search'],
      chips: ['Python', 'NLP', 'PDF Processing'],
      githubUrl: 'https://github.com/gmurari2006',
      link: 'https://github.com/gmurari2006',
      liveUrl: 'https://github.com/gmurari2006',
    },
  ],
  work: {
    label: '(02) — FEATURED WORK',
    get projects() {
      return PORTFOLIO_DATA.projects;
    },
  },
  skillCategories: [
    {
      title: 'AI, Machine Learning & Vision',
      description:
        'Deep learning architectures, computer vision diagnostics, and natural language pipelines.',
      skills: [
        { name: 'Python', featured: true },
        { name: 'PyTorch', featured: true },
        { name: 'TensorFlow', featured: false },
        { name: 'Deep Learning (CNNs)', featured: true },
        { name: 'Grad-CAM Explainability', featured: true },
        { name: 'Computer Vision (OpenCV)', featured: true },
        { name: 'NLP & Vector Embeddings', featured: true },
        { name: 'Scikit-learn', featured: false },
        { name: 'NumPy & Pandas', featured: true },
      ],
    },
    {
      title: 'Languages & Core Systems',
      description:
        'Strong computational foundation across compiled, interpreted, and typed languages.',
      skills: [
        { name: 'Python', featured: true },
        { name: 'TypeScript', featured: true },
        { name: 'JavaScript (ES6+)', featured: true },
        { name: 'C Language', featured: true },
        { name: 'Java', featured: true },
        { name: 'SQL (PostgreSQL)', featured: true },
        { name: 'HTML5 & CSS3', featured: false },
      ],
    },
    {
      title: 'Web & Cloud Architecture',
      description:
        'Modern reactive frontend frameworks, asynchronous APIs, containerization, and cloud hosting.',
      skills: [
        { name: 'React (Hooks & Vite)', featured: true },
        { name: 'FastAPI', featured: true },
        { name: 'Node.js & Express', featured: true },
        { name: 'RESTful API Design', featured: true },
        { name: 'WebSockets Telemetry', featured: false },
        { name: 'Docker Containerization', featured: true },
        { name: 'Linux / Unix CLI', featured: true },
        { name: 'Git & GitHub CI/CD', featured: true },
        { name: 'Render Cloud Platform', featured: false },
        { name: 'Vercel Deployment', featured: false },
      ],
    },
    {
      title: 'Core Computer Science & Theory',
      description:
        'Algorithmic problem-solving, mathematical optimization, and robust software patterns.',
      skills: [
        { name: 'Data Structures & Algorithms', featured: true },
        { name: 'Competitive Programming (500+ solved)', featured: true },
        { name: 'Constraint Satisfaction Problems', featured: true },
        { name: 'Graph Theory & Heuristics', featured: false },
        { name: 'Relational Database Normalization', featured: false },
        { name: 'Object-Oriented Design (OOP)', featured: true },
        { name: 'Analytical Thinking & Teamwork', featured: false },
      ],
    },
  ],
  skills: {
    label: '(04) — TECHNICAL ARSENAL',
    title: {
      line1: 'EVERYTHING',
      line2: 'IN ORBIT.',
    },
    orbitList: [
      'Python',
      'FastAPI',
      'TypeScript',
      'React',
      'Machine Learning',
      'C Language',
      'Java',
      'NumPy',
      'Pandas',
      'Algorithms',
      'Data Structures',
      'Docker',
      'Linux Kernel',
      'VS Code',
      'Render Cloud',
      'Git Architecture',
    ],
    marqueeList: [
      'PYTHON',
      'FASTAPI',
      'REACT',
      'TYPESCRIPT',
      'MACHINE LEARNING',
      'ALGORITHMS',
      'NEURAL NETWORKS',
      'ON-DEVICE AI',
      'DATA STRUCTURES',
      'DOCKER',
      'OPTIMIZATION',
      'NUMPY',
      'PANDAS',
      'GIT CI/CD',
    ],
  },
  journey: {
    label: '(03) — THE JOURNEY',
    title: {
      line1: 'LEARNING',
      line2: 'OUT LOUD.',
    },
    startYear: 2024,
    gradYear: 2028,
    items: [
      {
        year: '2024 — 2028',
        title: 'B.TECH IN CSE (AI & ML)',
        org: 'G. D. GOENKA UNIVERSITY',
        desc: 'Core specialisation in Artificial Intelligence, Machine Learning algorithms, Distributed Systems, and High-Performance Compute.',
      },
      {
        year: '2022 — 2024',
        title: 'HIGHER SECONDARY EDUCATION (12TH)',
        org: 'KRISHNAVENI JUNIOR COLLEGE',
        desc: 'Advanced mathematics, physics, and computational foundations with distinction.',
      },
      {
        year: '2022',
        title: 'SECONDARY SCHOOL CERTIFICATE (10TH)',
        org: 'TRIVENI TALENT SCHOOL',
        desc: 'Formative analytical training and state-level science symposium honors.',
      },
    ],
  },
  awards: {
    label: '(05) — RECOGNITION',
    counters: [
      {
        platform: 'COMPETITION',
        count: '2',
        label: 'ND PRIZE PODIUM',
        accent: 'red',
      },
      {
        platform: 'INDIA AI SUMMIT',
        count: '2026',
        label: 'SUMMIT DELEGATE',
        accent: 'black',
      },
      {
        platform: 'ANTHROPIC',
        count: '100',
        label: '% CLAUDE COURSE',
        accent: 'red',
      },
      {
        platform: 'LEETCODE / DSA',
        count: '500+',
        label: 'PROBLEMS SOLVED',
        accent: 'black',
      },
    ],
    certifications: [
      {
        title: 'CLAUDE AI CERTIFICATION',
        issuer: 'ANTHROPIC ACADEMY',
        year: '2026',
        isRed: false,
      },
      {
        title: 'FULL-STACK COMPILER SPEC',
        issuer: 'RENDER CLOUD PLATFORM',
        year: '2026',
        isRed: false,
      },
      {
        title: 'INDIA AI SUMMIT CREDENTIAL',
        issuer: 'MINISTRY OF ELECTRONICS & IT',
        year: '2026',
        isRed: true,
      },
      {
        title: 'ALGORITHMS & DATA STRUCTURES',
        issuer: 'COMPETITIVE CODING PODIUM',
        year: '2025',
        isRed: false,
      },
      {
        title: 'MACHINE LEARNING CORE',
        issuer: 'DEEP LEARNING SPECIALIZATION',
        year: '2025',
        isRed: false,
      },
      {
        title: 'ON-DEVICE NLP INFERENCE',
        issuer: 'EDGE COMPUTING ALLIANCE',
        year: '2024',
        isRed: true,
      },
    ],
  },
  education: [
    {
      degree: 'B.Tech in Computer Science and Engineering (AI & ML)',
      institution: 'G. D. Goenka University',
      period: '2024 — 2028',
      score: '8.56 CGPA',
      scoreLabel: 'Cumulative Grade Point Average',
      location: 'Gurugram, Haryana, India',
      highlights: [
        'Specialization in Artificial Intelligence, Neural Network Architectures, and Machine Learning Systems.',
        'Coursework: Advanced Data Structures, Algorithms, Machine Learning Foundations, Operating Systems, Database Management Systems, Discrete Mathematics.',
        'Active participant in university coding symposiums, hackathons, and technical symposium organizing committees.',
      ],
    },
    {
      degree: 'Higher Secondary Education (12th Standard - Intermediate)',
      institution: 'Krishnaveni Junior College',
      period: '2022 — 2024',
      location: 'India',
      highlights: [
        'Comprehensive foundation in Mathematics, Physics, and Chemistry.',
        'Graduated with distinction and analytical honors.',
      ],
    },
    {
      degree: 'Secondary School Certificate (10th Standard - SSC)',
      institution: 'Triveni Talent School',
      period: 'Graduated 2022',
      location: 'India',
      highlights: [
        'Excellence in analytical science and foundational mathematics.',
        'Active participation in regional science talent competitions.',
      ],
    },
  ],
  achievements: [
    {
      id: 'hackathon-podium',
      title: '2nd Prize Podium — Competitive Coding Hackathon',
      organization: 'State-Level Programming Competition',
      year: '2025',
      category: 'Competition',
      description:
        'Secured 2nd place podium finish in an intensive competitive programming hackathon, formulating optimal algorithmic solutions for complex graph and dynamic programming challenges under stringent time limits.',
      badgeText: '2nd Prize Podium',
    },
    {
      id: 'india-ai-summit',
      title: 'Selected Delegate — India AI Summit 2026',
      organization: 'India AI Summit',
      year: '2026',
      category: 'Delegation',
      description:
        'Selected as delegate representing emerging student AI developers and researchers, engaging with national leaders and AI architects on responsible machine learning deployment and sovereign AI infrastructure.',
      badgeText: 'Summit Delegate',
    },
    {
      id: 'claude-ai-cert',
      title: 'Anthropic Claude AI Certification',
      organization: 'Anthropic Academy',
      year: '2026',
      category: 'Credential',
      description:
        'Completed comprehensive credential covering advanced prompt engineering, tool integration, agentic workflows, and safe generative model alignment with 100% curriculum completion.',
      badgeText: 'Certified Practitioner',
    },
    {
      id: 'compiler-deploy',
      title: 'Production Deployment: AI App Compiler',
      organization: 'Render Cloud Deployment',
      year: '2026',
      category: 'Engineering',
      description:
        'Engineered, containerized, and deployed an end-to-end autonomous full-stack synthesis platform with FastAPI, React, and automated Docker orchestration hosted on Render Cloud.',
      badgeText: 'Production System',
    },
  ],
  contact: {
    label: '(06) — GET IN TOUCH',
    title: {
      line1: "LET'S",
      line2: 'TALK.',
    },
    email: 'g.murari2006@gmail.com',
    phone: '+91 8499960017',
    location: 'Gurugram / Delhi NCR, India',
    github: 'https://github.com/gmurari2006',
    linkedin: 'https://linkedin.com/in/Gangavarapu-Murari',
    resumeUrl: './resume.pdf',
    emailUser: 'g.murari2006',
    emailDomain: 'gmail.com',
    fullEmail: 'g.murari2006@gmail.com',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/gmurari2006',
        cursor: 'Open',
      },
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/Gangavarapu-Murari',
        cursor: 'Open',
      },
      {
        name: 'Download Résumé',
        url: './resume.pdf',
        cursor: 'PDF',
      },
    ],
    copyrightYear: 2026,
  },
};
