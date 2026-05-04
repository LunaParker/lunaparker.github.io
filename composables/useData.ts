import { ref, readonly } from 'vue'
import type { DeepReadonly, Ref } from 'vue'

export type AccentKey = 'primary' | 'secondary' | 'tertiary'

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
}

export interface Education {
  school: string
  degree: string
  period: string
  specialization?: string
  gpa?: string
  status?: string
  notes: string[]
}

export type ProjectSize = 'featured' | 'wide' | 'tall' | 'square'

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

export interface PortfolioData {
  experience: Experience[]
  education: Education[]
  projects: Project[]
  blog: BlogPost[]
  skills: Skills
}

const DATA: PortfolioData = {
  experience: [
    {
      id: 'shy-owl',
      role: 'Founder',
      org: 'Shy Owl Studios',
      period: 'Apr 2018 — Present',
      type: 'Freelance',
      location: 'Ontario (Remote)',
      blurb: 'My own consultancy and web solutions firm. Work on contract for agencies and directly with clients.',
      bullets: [
        'Deliver tailored digital solutions for businesses of all sizes — Laravel, WordPress, Shopify, Magento.',
        'Directly consult with clients on requirements, design, business goals, and user flows.',
        'Build AODA-accessible, secure, user-friendly web applications.',
        'Run CMS training sessions and fulfill agency contracts (e.g. Intelligent Computer Systems).',
      ],
      stack: ['Laravel', 'WordPress', 'WooCommerce', 'Vue.js', 'PHP', 'SCSS', 'MySQL', 'Cloudflare'],
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
    },
    {
      id: 'ics',
      role: 'Web Designer & Developer',
      org: 'Intelligent Computer Systems',
      period: 'Apr 2018 — 2024',
      type: 'Contract',
      location: 'Ontario (Hybrid)',
      blurb: 'Contract web designer and developer for a local IT firm, building sites and apps for their clients.',
      bullets: [],
      stack: ['WordPress', 'Laravel', 'PHP', 'SCSS'],
    },
  ],

  education: [
    {
      school: 'Conestoga College',
      degree: 'Honours Bachelor of Computer Science',
      period: 'Sep 2022 — Expected 2027',
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
    },
    {
      id: 'claude-menu-bar',
      name: 'Menu Bar Usage for Claude',
      tagline: 'Native macOS quota monitor for Claude Code',
      client: 'Open Source',
      role: 'Developer',
      year: '2026',
      url: 'github.com/lunaparker/claude-macos-menu-usage',
      stack: ['Swift', 'SwiftUI', 'macOS'],
      size: 'tall',
      accent: 'secondary',
    },
    {
      id: 'obsidian-default-handler',
      name: 'macOS Obsidian Default Handler',
      tagline: 'Open any .md file in Obsidian, vault or not',
      client: 'Open Source',
      role: 'Developer',
      year: '2026',
      url: 'github.com/lunaparker/macos-obsidian-default-handler',
      stack: ['AppleScript', 'Python', 'macOS'],
      size: 'square',
      accent: 'tertiary',
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
    },
  ],

  blog: [],

  skills: {
    Languages: ['PHP', 'JavaScript', 'TypeScript', 'Python', 'C++', 'C', 'C#', 'Java', 'Swift', 'SQL', 'HTML', 'CSS/SCSS'],
    Frameworks: ['Laravel', 'Vue.js', 'Nuxt', 'ASP.NET Core', 'SwiftUI', 'WordPress', 'WooCommerce', 'Node.js'],
    Tools: ['Git', 'Docker', 'Figma', 'Cloudflare', 'Microsoft Server / IIS', 'InvoiceNinja', 'CI/CD'],
    Practices: ['Full-stack Development', 'UX/UI Design', 'Project Management', 'TDD', 'Agile/Scrum', 'API Integration', 'Database Design', 'Information Security', 'Client Relations', 'Technical Writing'],
  },
}

const _data = ref(DATA)

export function useData(): DeepReadonly<Ref<PortfolioData>> {
  return readonly(_data)
}
