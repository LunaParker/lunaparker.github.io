import { ref, readonly } from 'vue'
import type { DeepReadonly, Ref } from 'vue'

export type AccentKey = 'primary' | 'secondary' | 'tertiary'

export interface Luna {
  name: string
  pronouns: string
  location: string
  email: string
  linkedin: string
  github: string
  current: string
  availability: string
  tagline: string
  bio: string
}

export interface WhatIDo {
  verb: string
  body: string
}

export interface Experience {
  id: string
  role: string
  org: string
  period: string
  type: string
  location: string
  blurb: string
  bullets: string[]
  stack: string[]
  accent: AccentKey
}

export interface Education {
  school: string
  degree: string
  period: string
  location: string
  specialization?: string
  gpa?: string
  status?: string
  notes: string[]
}

export type ProjectSize = 'featured' | 'wide' | 'tall' | 'square'

export interface ProjectHighlight {
  label: string
  body: string
}

export interface Project {
  id: string
  name: string
  tagline: string
  client: string
  role: string
  year: string
  url: string
  stack: string[]
  size: ProjectSize
  accent: AccentKey
  summary: string
  highlights: ProjectHighlight[]
  why: string
}

export interface BlogPost {
  id: string
  title: string
  date: string
  readingTime: string
  tag: string
  excerpt: string
  body: string[]
}

export interface Skills {
  [category: string]: string[]
}

export interface Service {
  title: string
  body: string
  icon: string
}

export interface PortfolioData {
  luna: Luna
  whatIDo: WhatIDo[]
  experience: Experience[]
  education: Education[]
  projects: Project[]
  blog: BlogPost[]
  skills: Skills
  services: Service[]
}

const DATA: PortfolioData = {
  luna: {
    name: 'Luna Parker',
    pronouns: 'she/her',
    location: 'Ontario, Canada',
    email: 'luna@shyowlstudios.com',
    linkedin: 'linkedin.com/in/luna-parker',
    github: 'github.com/lunaparker',
    current: 'shyowlstudios.com',
    availability: 'Open to Fall 2026 co-op',
    tagline: 'Developer, designer, and problem solver.',
    bio: 'Full-stack web developer with 8+ years of experience building tailored digital solutions for businesses of all sizes. Currently finishing an Honours Bachelor of Computer Science with a Security Specialization at Conestoga College.',
  },

  whatIDo: [
    { verb: 'Build', body: 'High-performance websites and web applications using modern frameworks and battle-tested platforms.' },
    { verb: 'Design', body: "User-friendly interfaces that align with an organization's brand and help them accomplish their goals." },
    { verb: 'Solve', body: 'Custom software — from inventory systems to secure client portals — that makes businesses more productive.' },
    { verb: 'Consult', body: 'Direct collaboration with clients to identify requirements, recommend stacks, and manage timelines.' },
  ],

  experience: [
    {
      id: 'shy-owl',
      role: 'Founder',
      org: 'Shy Owl Studios',
      period: 'Apr 2018 — Present',
      type: 'Freelance',
      location: 'Fergus, ON (Remote)',
      blurb: 'My own consultancy and web solutions firm. Work on contract for agencies and directly with clients.',
      bullets: [
        'Deliver tailored digital solutions for businesses of all sizes — Laravel, WordPress, Shopify, Magento.',
        'Directly consult with clients on requirements, design, business goals, and user flows.',
        'Build AODA-accessible, secure, user-friendly web applications.',
        'Run CMS training sessions and fulfill agency contracts (e.g. Intelligent Computer Systems).',
      ],
      stack: ['Laravel', 'WordPress', 'WooCommerce', 'Vue.js', 'PHP', 'SCSS', 'MySQL', 'Cloudflare'],
      accent: 'primary',
    },
    {
      id: 'digital-chaos',
      role: 'Senior Web Developer',
      org: 'Digital Chaos Inc.',
      period: 'Jun 2020 — Aug 2022',
      type: 'Full-time',
      location: 'Elora, ON (Remote)',
      blurb: 'Promoted to Senior; responsible for key accounts including major redesigns for non-profits and Canadian universities.',
      bullets: [
        'Led development of DigitalChaos.ca rebuild and major client builds for large Canadian orgs.',
        'Advocated for and led adoption of Vue.js as primary front-end framework.',
        'Led adoption of and wrote documentation for Git, Docker, and Vue.js.',
        'Collaborated with PMs and external design firms on estimates and tech stack recommendations.',
      ],
      stack: ['Laravel', 'WordPress', 'Vue.js', 'PHP', 'SCSS', 'MySQL', 'Git', 'Docker'],
      accent: 'tertiary',
    },
    {
      id: 'ocas',
      role: 'Software Developer (Co-op)',
      org: 'Ontario College Application Service',
      period: 'May 2024 — Aug 2024',
      type: 'Co-op',
      location: 'Guelph, ON (Hybrid)',
      blurb: 'Summer co-op gaining enterprise software workflow experience.',
      bullets: [
        'Refactored .NET web applications to improve UX.',
        'Collaborated across project management, lead dev, and other departments on new features.',
        'Used Scrum/Agile to meet milestones on time and quality.',
        'Worked with CI/CD pipelines to catch regressions before production.',
      ],
      stack: ['ASP.NET Core', 'C#', 'Agile/Scrum', 'CI/CD'],
      accent: 'secondary',
    },
    {
      id: 'ics',
      role: 'Web Designer & Developer',
      org: 'Intelligent Computer Systems',
      period: 'Apr 2018 — 2024',
      type: 'Contract',
      location: 'Fergus, ON (Hybrid)',
      blurb: 'Contract web designer and developer for a local IT firm, building sites and apps for their clients.',
      bullets: [],
      stack: ['WordPress', 'Laravel', 'PHP', 'SCSS'],
      accent: 'primary',
    },
  ],

  education: [
    {
      school: 'Conestoga College',
      degree: 'Honours Bachelor of Computer Science',
      period: 'Sep 2022 — Expected 2027',
      location: 'Waterloo, ON',
      specialization: 'Security',
      gpa: '3.59',
      status: 'One co-op term remaining — Fall 2026',
      notes: [
        'Security specialization: penetration testing, rootkits, network security, privacy in computing, and software safety/reliability.',
        'Six collaborative software projects spanning the full SDLC — from requirements and design through testing, deployment, and performance optimization.',
        'Low-level systems work: parallel computing (C/C++), memory management, OS security models, and computer networks.',
      ],
    },
    {
      school: 'University of Toronto',
      degree: 'Computer Science',
      period: 'Sep 2021 — Apr 2022',
      location: 'Toronto, ON',
      notes: [
        'Completed first-year Computer Science (CSC111) and philosophy before transferring to Conestoga.',
      ],
    },
  ],

  projects: [
    {
      id: 'eyolf',
      name: 'EYOLF',
      tagline: 'Custom e-commerce & connected business tools',
      client: 'Climbing Gear Manufacturer',
      role: 'Lead Developer & Designer',
      year: '2024',
      url: 'eyolf.ca',
      stack: ['WordPress', 'WooCommerce', 'InvoiceNinja', 'Laravel', 'Cloudflare'],
      size: 'featured',
      accent: 'primary',
      summary: "EYOLF makes climbing gear for professionals. I designed and built their web presence around vertical, dynamic brand elements that highlight the company's achievements — and connected it to custom business tools behind the scenes.",
      highlights: [
        { label: 'Public e-commerce site', body: 'Brand-focused design emphasizing verticality and achievement.' },
        { label: 'Inventory portal', body: 'Custom Laravel tool to streamline internal business processes.' },
        { label: 'Invoicing platform', body: 'Customized InvoiceNinja deployment integrated into existing workflow.' },
        { label: 'Systems integration', body: 'All tools connected to improve operational efficiency across the business.' },
      ],
      why: 'A great example of approaching client work holistically — not just building a website, but understanding the business and building connected systems that make the whole operation run better.',
    },
    {
      id: 'jarvis-ryan',
      name: 'Jarvis Ryan Associates',
      tagline: 'Secure client portal & redesign',
      client: 'Accounting Firm, Mississauga',
      role: 'Lead Developer & Designer',
      year: '2023',
      url: 'jarvisryan.com',
      stack: ['Laravel', 'PHP', 'Microsoft Server', 'IIS'],
      size: 'wide',
      accent: 'tertiary',
      summary: "I redesigned Jarvis Ryan's public-facing website and built \"Client Cloud\" — a secure custom portal where clients access tax documents, upload large files, and communicate with the firm.",
      highlights: [
        { label: 'Website redesign', body: 'Essential info front and centre; integrated brand typography and styling.' },
        { label: 'Client Cloud portal', body: 'Laravel app for tax docs, large file upload, client–firm communication.' },
        { label: 'Enterprise integration', body: 'Direct integration with existing Microsoft Server / IIS infrastructure.' },
        { label: 'Privacy-grade security', body: 'Authentication and file handling designed for financial document exchange.' },
      ],
      why: 'Showcases working within existing enterprise infrastructure while building modern, secure Laravel applications. A real-world example of software that solves a specific business problem.',
    },
    {
      id: 'blsc',
      name: 'Belwood Lake Sailing Club',
      tagline: 'Brand refresh + member portal',
      client: 'Member-run Sailing Club',
      role: 'Lead Developer & Designer',
      year: '2023',
      url: 'newblsc.ca',
      stack: ['WordPress', 'Laravel', 'Cloudflare'],
      size: 'tall',
      accent: 'secondary',
      summary: 'BLSC is a member-run sailing organization based in Belwood, Ontario. I delivered a full brand overhaul and a new online presence with an integrated member portal.',
      highlights: [
        { label: 'Brand overhaul', body: 'Refreshed visual identity and new website design.' },
        { label: 'Member portal', body: 'Membership renewal, event viewing and registration, and club news.' },
        { label: 'Laravel backend', body: 'Secure, scalable foundation for member features.' },
        { label: 'Admin tools', body: 'Club controls for member experience and communications.' },
      ],
      why: 'A community-driven organization where the software has to be trustworthy, approachable, and operable by volunteers.',
    },
    {
      id: 'brightspace-mcp',
      name: 'Brightspace MCP Server',
      tagline: 'AI integration for Brightspace / D2L',
      client: 'Open Source',
      role: 'Developer',
      year: '2025',
      url: 'github.com/lunaparker/brightspace-mcp-server',
      stack: ['TypeScript', 'Node.js', 'MCP'],
      size: 'square',
      accent: 'tertiary',
      summary: 'An MCP server that integrates Brightspace/D2L (a learning management system used by universities) with AI tools including Claude, ChatGPT, Cursor, and Windsurf. Published on npm as npx brightspace-mcp-server@latest.',
      highlights: [
        { label: 'Protocol-native', body: 'Full MCP implementation compatible with every major MCP client.' },
        { label: 'Published to npm', body: 'One-line install: npx brightspace-mcp-server@latest.' },
        { label: 'Built for my workflow', body: 'I built it for myself as a student, then published for others.' },
      ],
      why: 'Demonstrates engagement with cutting-edge AI tooling and the Model Context Protocol. A practical utility I built, dogfooded, and shipped.',
    },
    {
      id: 'swift-weather',
      name: 'Swift Weather',
      tagline: 'SwiftUI proof of concept',
      client: 'Personal Project',
      role: 'Developer',
      year: '2024',
      url: 'github.com/lunaparker/swift-weather',
      stack: ['Swift', 'SwiftUI'],
      size: 'square',
      accent: 'primary',
      summary: 'A SwiftUI weather app displaying Canadian weather data, built as a proof of concept for native iOS development.',
      highlights: [
        { label: 'Native iOS', body: 'Built end-to-end in Swift with SwiftUI.' },
        { label: 'Canadian weather data', body: 'Real API integration for forecast data.' },
      ],
      why: 'Shows breadth beyond web — comfort with native mobile development, SwiftUI, and API integration.',
    },
  ],

  blog: [
    {
      id: 'laravel-vs-nextjs-2026',
      title: 'Why I still reach for Laravel in the age of everything-Next',
      date: '2026-03-18',
      readingTime: '7 min',
      tag: 'Opinion',
      excerpt: 'The JavaScript-everywhere framework monoculture is real. Here\'s why a "boring" PHP framework keeps winning me client projects.',
      body: [
        "Every month there's a new JavaScript meta-framework promising to replace everything. Every month I ship production Laravel code for clients who need their site to be online in 10 years, not migrated in 18 months.",
        "This isn't a tirade against modern JS — I love Vue and Nuxt, which power this very portfolio. But boring, stable tools have real value. Laravel gives me conventions, a mature ecosystem, and a community of developers who can still read the code after I hand it off.",
        "When I consult with a small business about their website, I'm not choosing a framework for me. I'm choosing a framework for the developer who might inherit it in three years when I'm no longer around. Laravel wins that argument more often than not.",
      ],
    },
    {
      id: 'mcp-servers-for-students',
      title: 'Building an MCP server as a student — a one-weekend project',
      date: '2026-02-02',
      readingTime: '5 min',
      tag: 'Tutorial',
      excerpt: 'I needed Claude to talk to my learning management system. So I built a tool that lets it. Here\'s how the Model Context Protocol made it stupid-simple.',
      body: [
        "I'm a student. I live inside Brightspace. My assignments, my rubrics, my grades — all of it.",
        "I also live inside Claude. So the obvious question: why is my AI assistant blind to the thing I spend most of my academic life in?",
        'The answer, as of last year, is "it doesn\'t have to be." MCP — the Model Context Protocol — gave me a way to bridge the two in a weekend. Here\'s the architecture, the gotchas, and what I\'d do differently.',
      ],
    },
    {
      id: 'accessibility-as-security',
      title: 'Accessibility is a security practice in disguise',
      date: '2025-11-14',
      readingTime: '6 min',
      tag: 'Essay',
      excerpt: 'Thinking about AODA compliance changed how I think about threat modelling. A brief note from my security specialization.',
      body: [
        'The best security engineers I know design for hostile environments — users in bad network conditions, attackers looking for edge cases, systems under load. The best accessibility engineers do exactly the same thing.',
        "A screen reader user and an adversary have something surprising in common: both are exploring your app's full behavioural surface in ways you didn't plan for. Designing for one quietly hardens you against the other.",
      ],
    },
    {
      id: 'on-leaving-uoft',
      title: 'On leaving U of T and going back to school',
      date: '2025-08-03',
      readingTime: '4 min',
      tag: 'Personal',
      excerpt: "I spent a year studying CS and philosophy at U of T. Then I transferred to Conestoga. Here's why.",
      body: [
        "The short version: I wanted to build things. I wanted to be in a room with instructors who'd spent time in industry, not just in academia.",
        "The long version involves a lot of late nights, a supportive partner, and realizing that the 'prestige' path wasn't the same as the 'right' path. I don't regret my year at U of T — philosophy still shapes how I debug — but Conestoga is where I'm actually learning to engineer.",
      ],
    },
  ],

  skills: {
    Languages: ['PHP', 'JavaScript', 'TypeScript', 'Python', 'C++', 'C', 'C#', 'Java', 'Swift', 'SQL', 'HTML', 'CSS/SCSS'],
    Frameworks: ['Laravel', 'Vue.js', 'Nuxt', 'ASP.NET Core', 'SwiftUI', 'WordPress', 'WooCommerce', 'Node.js'],
    Tools: ['Git', 'Docker', 'Figma', 'Cloudflare', 'Microsoft Server / IIS', 'InvoiceNinja', 'CI/CD'],
    Practices: ['Full-stack Development', 'UX/UI Design', 'Project Management', 'TDD', 'Agile/Scrum', 'API Integration', 'Database Design', 'Information Security', 'Client Relations', 'Technical Writing'],
  },

  services: [
    { title: 'Web Design', body: 'User-centred design that aligns with your brand and business goals.', icon: 'webDesign' },
    { title: 'Web Development', body: 'Full-stack using Laravel, WordPress, Vue.js, and more.', icon: 'webDev' },
    { title: 'Custom Software', body: "Bespoke applications tailored to your organization's workflows.", icon: 'custom' },
    { title: 'IT Consulting', body: 'Technology recommendations, project planning, stack guidance.', icon: 'consult' },
    { title: 'WordPress Solutions', body: 'Custom themes, plugins, WooCommerce stores, ongoing maintenance.', icon: 'wordpress' },
    { title: 'Database Development', body: 'Schema design, optimization, and secure data handling.', icon: 'database' },
  ],
}

const _data = ref(DATA)

export function useData(): DeepReadonly<Ref<PortfolioData>> {
  return readonly(_data)
}
