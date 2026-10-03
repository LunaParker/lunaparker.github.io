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

// Visual treatment for the typographic poster on each card.
// - vertical-split: full-bleed brand gradient with rotated wordmark (signature treatment)
// - stacked: tonal container with a soft brand-gradient blur in one corner
// - angle: tonal container with a conic accent sweep, italic title
// - mono-code: neutral grey surface with a hatch pattern and a "// <client>" comment header
export type ProjectTreatment = 'vertical-split' | 'stacked' | 'angle' | 'mono-code'

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
  treatment: ProjectTreatment
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
      id: 'sandbox',
      role: 'Junior Web Developer (Co-op)',
      org: 'Sandbox Software Solutions',
      period: 'Sep 2026 — Present',
      type: 'Co-op',
      location: 'Guelph, ON (Hybrid)',
      blurb: 'Final four-month co-op term of my Honours BCS, on the projects team of a web agency building and maintaining sites for non-profit, healthcare, and public-sector clients. Reporting to the lead developer.',
      bullets: [
        'Own client WordPress builds end to end: the agency\'s shared parent theme, custom ACF/Gutenberg blocks, custom post types and taxonomies, and front-end work in JavaScript and SCSS.',
        'Scope and estimate work before it starts, and run developer first-pass QA on medium and large sites before code reaches peer review and formal QA gates.',
        'Flag gaps and risks in proposed solutions before they reach production, applying the security-minded habit from my Information Security specialization to client web work.',
        'Resolve client support tickets end to end: reproduce on the live site, trace to root cause in theme code, ship and verify the fix, and write the client-facing reply.',
        'Apply WCAG accessibility requirements to every solution, in a shop with a dedicated accessibility coordinator and formal accessibility QA gates.',
        'Build in the agency\'s proprietary in-house CMS as well as WordPress, including a containerized local dev environment (Docker, PHP, MariaDB) for a large intranet project.',
      ],
      stack: ['WordPress', 'PHP', 'ACF', 'JavaScript', 'SCSS', 'MySQL', 'Docker', 'Git'],
    },
    {
      id: 'shy-owl',
      role: 'Founder & Lead Developer',
      org: 'Shy Owl Studios',
      period: 'Apr 2018 — Present',
      type: 'Freelance',
      location: 'Ontario (Remote)',
      blurb: 'My own security-minded web consultancy: 40+ production sites and web apps delivered end to end over eight years, for clients from local practices to national brands, both directly and as a white-label subcontractor for other agencies.',
      bullets: [
        'Built bespoke Laravel applications (invoicing platforms, inventory systems, client portals) and integrations such as a QuickBooks Online connector reconciling WooCommerce orders over OAuth 2.0.',
        'Author and maintain first-party WordPress plugins for client sites (partner directories, course catalogues, banner systems), versioned and self-contained rather than theme edits.',
        'Run the production infrastructure behind client properties: a Linux VPS serving WordPress plus three containerized Laravel apps, fronted by Cloudflare with origin-CA TLS and cache rules.',
        'Review third-party plugin code before it reaches a client site and trace security defects to root cause in vendor source, including a broken nonce check in a file-upload plugin.',
        'Plan major-version upgrades on live commerce sites: version pinning where plugins lag core, scripted end-to-end verification of the checkout flow, and a tested rollback path.',
        'Created and open-sourced waveapps-mcp (28 tools, MIT), brightspace-mcp-server (Entra SSO fork), and macos-permission-report, a macOS TCC auditor.',
      ],
      stack: ['Laravel', 'WordPress', 'WooCommerce', 'Vue.js', 'PHP', 'Node.js', 'Python', 'Docker', 'Cloudflare', 'MCP'],
    },
    {
      id: 'digital-chaos',
      role: 'Senior Web Developer',
      org: 'Digital Chaos Inc.',
      period: 'Jun 2020 — Aug 2022',
      type: 'Full-time',
      location: 'Elora, ON (Remote)',
      blurb: 'Promoted from Web Developer to Senior; owned delivery on several of the agency\'s key accounts, including major redesigns for non-profits and Canadian universities.',
      bullets: [
        'Led development of the DigitalChaos.ca rebuild and major client builds for large Canadian organizations.',
        'Led the company-wide adoption of Vue.js as the primary front-end framework, and wrote the team\'s documentation for Git, Docker, and Vue.js.',
        'Delivered full-site redesigns for non-profit clients and built bespoke Laravel web applications for both internal staff and external customers.',
        'Acted as the technical point of contact across customers, project managers, and external design firms, advising on estimates and stack choices to ship projects to spec.',
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
      blurb: 'Four-month co-op at OCAS, the public-sector platform every applicant to Ontario\'s 24 public colleges depends on.',
      bullets: [
        'Shipped features, bug fixes, and UX refactors in C# / .NET and ASP.NET Core within an established Scrum/Agile team, on a system entrusted with sensitive applicant data at provincial scale.',
        'Worked in CI/CD pipelines to catch regressions before they could reach a production service the public relies on.',
        'Prioritized across competing deadlines and documented work for handoff in a large, established codebase.',
      ],
      stack: ['C#', '.NET', 'ASP.NET Core', 'CI/CD', 'Agile/Scrum', 'Git'],
    },
    {
      id: 'ics',
      role: 'Web Designer & Developer',
      org: 'Intelligent Computer Systems',
      period: 'Apr 2018 — Aug 2024',
      type: 'Part-time contract',
      location: 'Ontario (Hybrid)',
      blurb: 'Part-time contract web developer for a local IT firm over six years, building and maintaining websites and web applications for its clients.',
      bullets: [
        'Delivered WordPress and Laravel sites for the firm\'s clients, handling design, build, security updates, and ongoing maintenance.',
      ],
      stack: ['WordPress', 'Laravel', 'PHP', 'MySQL', 'JavaScript', 'SCSS'],
    },
  ],

  education: [
    {
      school: 'Conestoga College',
      degree: 'Honours Bachelor of Computer Science',
      period: 'Sep 2022 — Expected 2027',
      specialization: 'Security',
      gpa: '3.59',
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
      url: 'https://eyolf.ca',
      stack: ['WordPress', 'WooCommerce', 'InvoiceNinja', 'Laravel', 'Cloudflare'],
      size: 'featured',
      accent: 'primary',
      treatment: 'vertical-split',
    },
    {
      id: 'jarvis-ryan',
      name: 'Jarvis Ryan Associates',
      tagline: 'Secure client portal & redesign',
      client: 'Accounting Firm, Mississauga',
      role: 'Lead Developer & Designer',
      year: '2023',
      url: 'https://jarvisryan.com',
      stack: ['Laravel', 'PHP', 'Microsoft Server', 'IIS'],
      size: 'wide',
      accent: 'tertiary',
      treatment: 'stacked',
    },
    {
      id: 'blsc',
      name: 'Belwood Lake Sailing Club',
      tagline: 'Brand refresh + member portal',
      client: 'Member-run Sailing Club',
      role: 'Lead Developer & Designer',
      year: '2023',
      url: 'https://newblsc.ca',
      stack: ['WordPress', 'Laravel', 'Cloudflare'],
      size: 'tall',
      accent: 'secondary',
      treatment: 'angle',
    },
    {
      id: 'brightspace-mcp',
      name: 'Brightspace MCP Server',
      tagline: 'AI integration for Brightspace / D2L',
      client: 'Open Source',
      role: 'Developer',
      year: '2025',
      url: 'https://github.com/lunaparker/brightspace-mcp-server',
      stack: ['TypeScript', 'Node.js', 'MCP'],
      size: 'square',
      accent: 'tertiary',
      treatment: 'mono-code',
    },
    {
      id: 'claude-menu-bar',
      name: 'Menu Bar Usage for Claude',
      tagline: 'Native macOS quota monitor for Claude Code',
      client: 'Open Source',
      role: 'Developer',
      year: '2026',
      url: 'https://github.com/lunaparker/claude-macos-menu-usage',
      stack: ['Swift', 'SwiftUI', 'macOS'],
      size: 'tall',
      accent: 'secondary',
      treatment: 'stacked',
    },
    {
      id: 'macos-permission-report',
      name: 'macOS Privacy Permission Audit',
      tagline: 'Audits TCC grants, flags ghost entries',
      client: 'Open Source',
      role: 'Developer',
      year: '2026',
      url: 'https://github.com/lunaparker/macos-permission-report',
      stack: ['Python', 'Jinja2', 'macOS'],
      size: 'tall',
      accent: 'primary',
      treatment: 'stacked',
    },
    {
      id: 'portfolio',
      name: 'lunaparker.dev',
      tagline: 'This site — powered by Vue/Nuxt, designed as my portfolio',
      client: 'Personal Project',
      role: 'Designer & Developer',
      year: '2026',
      url: 'https://github.com/lunaparker/lunaparker.github.io',
      stack: ['Vue.js', 'Nuxt', 'Stylus', 'Cloudflare'],
      size: 'square',
      accent: 'secondary',
      treatment: 'stacked',
    },
    {
      id: 'swift-weather',
      name: 'Swift Weather',
      tagline: 'SwiftUI proof of concept',
      client: 'Personal Project',
      role: 'Developer',
      year: '2024',
      url: 'https://github.com/lunaparker/swift-weather',
      stack: ['Swift', 'SwiftUI'],
      size: 'square',
      accent: 'primary',
      treatment: 'mono-code',
    },
    {
      id: 'obsidian-default-handler',
      name: 'macOS Obsidian Default Handler',
      tagline: 'Open any .md file in Obsidian, vault or not',
      client: 'Open Source',
      role: 'Developer',
      year: '2026',
      url: 'https://github.com/lunaparker/macos-obsidian-default-handler',
      stack: ['AppleScript', 'Python', 'macOS'],
      size: 'square',
      accent: 'primary',
      treatment: 'mono-code',
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

export function useData(): PortfolioData {
  return DATA
}
