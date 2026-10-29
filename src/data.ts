export interface Project {
  id: string;
  number: string;
  category: string;
  title: string;
  tagline: string;
  chips: string[];
  link: string;
  type: 'compiler' | 'tinyform' | 'timetable';
}

export interface JourneyItem {
  year: string;
  title: string;
  org: string;
  desc: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  decimals: number;
  sublabel: string;
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
  };
  hero: {
    greeting: string;
    tagline: string;
    primaryCta: string;
    secondaryCta: string;
    resumeUrl: string;
  };
  about: {
    label: string;
    manifesto: string[];
    keywords: string[];
    stats: StatItem[];
  };
  work: {
    label: string;
    projects: Project[];
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
  skills: {
    label: string;
    title: {
      line1: string;
      line2: string;
    };
    orbitList: string[];
    marqueeList: string[];
  };
  awards: {
    label: string;
    counters: AwardItem[];
    certifications: CertItem[];
  };
  contact: {
    label: string;
    title: {
      line1: string;
      line2: string;
    };
    emailUser: string;
    emailDomain: string;
    fullEmail: string;
    links: { name: string; url: string; cursor: string }[];
    copyrightYear: number;
  };
}

export const PORTFOLIO_DATA: PortfolioData = {
  name: {
    first: 'MURARI',
    last: 'GANGAVARAPU',
    full: 'Gangavarapu Murari',
  },
  role: {
    line1: 'FULL-STACK',
    line2: 'DEVELOPER.',
  },
  hero: {
    greeting: "Hi, I'm Gangavarapu Murari —",
    tagline:
      'Computer Science engineer specializing in AI/ML and reactive full-stack architectures. Building intelligent compilers, offline neural systems, and constraint engines with uncompromising precision.',
    primaryCta: 'See my work ↘',
    secondaryCta: 'Download résumé',
    resumeUrl: './resume.pdf',
  },
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
  },
  work: {
    label: '(02) — FEATURED WORK',
    projects: [
      {
        id: 'compiler',
        number: '01',
        category: 'AUTONOMOUS SYSTEM ARCHITECTURE',
        title: 'AI APP COMPILER',
        tagline:
          'Natural-language requirements compiler that synthesizes complete full-stack codebases, database schemas, and FastAPI endpoints automatically.',
        chips: ['Python', 'FastAPI', 'React', 'Render Cloud'],
        link: 'https://github.com/gmurari2006/ai-app-compiler',
        type: 'compiler',
      },
      {
        id: 'tinyform',
        number: '02',
        category: 'LOCAL-FIRST MACHINE LEARNING',
        title: 'TINYFORM AI',
        tagline:
          'Lightweight neural inference pipeline running entirely on-device with zero server dependencies, guaranteeing strict client-side data privacy.',
        chips: ['Python', 'NLP Inference', 'On-Device', 'Zero-Cloud'],
        link: 'https://github.com/gmurari2006/tinyform-ai',
        type: 'tinyform',
      },
      {
        id: 'timetable',
        number: '03',
        category: 'CONSTRAINT SATISFACTION ENGINE',
        title: 'INTELLIGENT TIMETABLE',
        tagline:
          'Mathematical constraint solver utilizing graph colorings and logic heuristic search to generate zero-conflict university schedules in sub-seconds.',
        chips: ['Python', 'Optimization', 'Constraint Logic', 'Algorithms'],
        link: 'https://github.com/gmurari2006/timetable-generator',
        type: 'timetable',
      },
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
  contact: {
    label: '(06) — GET IN TOUCH',
    title: {
      line1: "LET'S",
      line2: 'TALK.',
    },
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
