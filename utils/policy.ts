import { Lexer, Parser, Renderer, type Token, type Tokens } from 'marked'

export interface PolicySection {
  id: string
  heading: string
  html: string
}

export interface Policy {
  title: string
  updated: string | null
  updatedIso: string | null
  intro: string
  sections: PolicySection[]
}

const UPDATED = /^Last updated:\s*(.+)$/

function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// Each word of inline code is its own span, so a narrow screen can wrap a command
// at its spaces but never inside a word like basic-auth-gateway
const renderer = new Renderer()
const codespan = renderer.codespan.bind(renderer)
renderer.codespan = token => String(codespan(token)).replace(
  /^<code>(.*)<\/code>$/s,
  (_, inner: string) => `<code>${inner.split(' ').map(word => `<span>${word}</span>`).join(' ')}</code>`,
)

function isoDate(text: string | null) {
  const date = text ? new Date(text) : null
  if (!date || Number.isNaN(date.getTime())) return null
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

// Splits a product's PRIVACY.md into title, date, intro and one entry per `##` section
export function parsePolicy(source: string): Policy {
  const tokens = new Lexer({ gfm: true }).lex(source)
  let title = ''
  let updated: string | null = null
  const intro: Token[] = []
  const sections: { heading: Tokens.Heading, body: Token[] }[] = []

  for (const token of tokens) {
    if (token.type === 'heading') {
      const heading = token as Tokens.Heading
      if (heading.depth === 1 && !title) {
        title = heading.text
        continue
      }
      if (heading.depth === 2) {
        sections.push({ heading, body: [] })
        continue
      }
    }
    if (token.type === 'paragraph' && updated === null && !sections.length) {
      const match = UPDATED.exec((token as Tokens.Paragraph).text.trim())
      if (match) {
        updated = match[1]
        continue
      }
    }
    (sections.at(-1)?.body ?? intro).push(token)
  }

  return {
    title,
    updated,
    updatedIso: isoDate(updated),
    intro: Parser.parse(intro, { renderer }),
    sections: sections.map(({ heading, body }) => ({
      id: slug(heading.text),
      heading: Parser.parseInline(heading.tokens, { renderer }),
      html: Parser.parse(body, { renderer }),
    })),
  }
}
