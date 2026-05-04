export interface Env {
  TURNSTILE_SECRET: string
  DISCORD_WEBHOOK_URL: string
  ALLOWED_ORIGINS: string
}

interface ContactPayload {
  name?: unknown
  email?: unknown
  message?: unknown
  turnstileToken?: unknown
}

interface TurnstileVerifyResponse {
  success: boolean
  'error-codes'?: string[]
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const DISCORD_EMBED_COLOR = 0x7C3AED

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const origin = req.headers.get('Origin') ?? ''
    const allowed = (env.ALLOWED_ORIGINS ?? '').split(',').map(s => s.trim()).filter(Boolean)
    const corsHeaders: Record<string, string> = { Vary: 'Origin' }
    if (allowed.includes(origin)) {
      corsHeaders['Access-Control-Allow-Origin'] = origin
    }

    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          ...corsHeaders,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      })
    }

    if (req.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, corsHeaders)
    }

    let payload: ContactPayload
    try {
      payload = await req.json() as ContactPayload
    }
    catch {
      return json({ error: 'Invalid JSON' }, 400, corsHeaders)
    }

    const name = clean(payload.name, 200)
    const email = clean(payload.email, 200)
    const message = clean(payload.message, 4000)
    const token = typeof payload.turnstileToken === 'string' ? payload.turnstileToken : ''

    if (!name || !email || !message) {
      return json({ error: 'Please fill in name, email, and message.' }, 400, corsHeaders)
    }
    if (!EMAIL_RE.test(email)) {
      return json({ error: 'That email address looks invalid.' }, 400, corsHeaders)
    }
    if (!token) {
      return json({ error: 'CAPTCHA was not completed.' }, 400, corsHeaders)
    }

    const ip = req.headers.get('CF-Connecting-IP') ?? ''
    const verifyForm = new FormData()
    verifyForm.append('secret', env.TURNSTILE_SECRET)
    verifyForm.append('response', token)
    if (ip) verifyForm.append('remoteip', ip)

    const verifyRes = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body: verifyForm })
    const verify = await verifyRes.json() as TurnstileVerifyResponse
    if (!verify.success) {
      return json({ error: 'CAPTCHA verification failed. Please try again.' }, 403, corsHeaders)
    }

    const discordRes = await fetch(env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Portfolio Contact Form',
        embeds: [{
          title: 'New contact form submission',
          color: DISCORD_EMBED_COLOR,
          fields: [
            { name: 'Name', value: name, inline: true },
            { name: 'Email', value: email, inline: true },
            { name: 'Message', value: message },
          ],
          footer: { text: ip ? `From ${ip}` : 'lunaparker.dev' },
          timestamp: new Date().toISOString(),
        }],
      }),
    })

    if (!discordRes.ok) {
      return json({ error: 'Could not deliver the message. Please try again later.' }, 502, corsHeaders)
    }

    return json({ ok: true }, 200, corsHeaders)
  },
}

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function json(data: unknown, status: number, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' },
  })
}
