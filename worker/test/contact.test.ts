import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import worker, { type Env } from '../src/index'

const ORIGIN = 'https://lunaparker.dev'

/** The structured message the Worker hands to the send_email binding. */
interface Mail {
  from: EmailAddress
  to: string
  replyTo: EmailAddress
  subject: string
  text: string
}

function makeEnv(send = vi.fn(async (_mail: Mail) => ({ messageId: 'msg-1' }))) {
  const env: Env = {
    TURNSTILE_SECRET: 'turnstile-secret',
    CONTACT_TO: 'inbox@example.com',
    CONTACT_FROM: 'contact@forms.lunaparker.dev',
    ALLOWED_ORIGINS: ORIGIN,
    EMAIL: { send } as unknown as SendEmail,
  }
  return { env, send }
}

/** Stub the Turnstile siteverify call, the Worker's only outbound fetch. */
function stubTurnstile(success: boolean) {
  const spy = vi.fn(async () => Response.json({ success }))
  vi.stubGlobal('fetch', spy)
  return spy
}

function submit(body: Record<string, unknown>) {
  return new Request('https://lunaparker.dev/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Origin': ORIGIN, 'CF-Connecting-IP': '203.0.113.7' },
    body: JSON.stringify(body),
  })
}

const valid = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  message: 'Hello there,\nI have a project.',
  organization: 'Acme',
  projectType: 'Website',
  turnstileToken: 'token',
}

beforeEach(() => vi.spyOn(console, 'error').mockImplementation(() => {}))
afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('contact worker', () => {
  it('emails the submission to the inbox, with Reply-To set to the sender', async () => {
    stubTurnstile(true)
    const { env, send } = makeEnv()

    const res = await worker.fetch(submit(valid), env)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(send).toHaveBeenCalledTimes(1)
    const mail = send.mock.calls[0][0]
    expect(mail.to).toBe('inbox@example.com')
    expect(mail.from).toEqual({ name: 'Portfolio Contact Form', email: 'contact@forms.lunaparker.dev' })
    expect(mail.replyTo).toEqual({ name: 'Jane Doe', email: 'jane@example.com' })
    expect(mail.subject).toBe('Contact form: Jane Doe')
    expect(mail.text).toContain('Organization: Acme')
    expect(mail.text).toContain('Project type: Website')
    expect(mail.text).toContain('IP: 203.0.113.7')
    expect(mail.text).toContain('Hello there,\nI have a project.')
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(ORIGIN)
  })

  it('names the Shy Owl form as the sender for shy-owl submissions', async () => {
    stubTurnstile(true)
    const { env, send } = makeEnv()

    await worker.fetch(submit({ ...valid, source: 'shy-owl' }), env)

    expect(send.mock.calls[0][0].from.name).toBe('Shy Owl Contact Form')
    expect(send.mock.calls[0][0].text).toContain('Source: shy-owl')
  })

  it('omits optional fields that were left blank', async () => {
    stubTurnstile(true)
    const { env, send } = makeEnv()

    await worker.fetch(submit({ ...valid, organization: '', projectType: undefined }), env)

    const { text } = send.mock.calls[0][0]
    expect(text).not.toContain('Organization:')
    expect(text).not.toContain('Project type:')
  })

  it('keeps line breaks in the name out of the subject and Reply-To', async () => {
    stubTurnstile(true)
    const { env, send } = makeEnv()

    await worker.fetch(submit({ ...valid, name: 'Jane\r\nBcc: victim@example.com' }), env)

    const mail = send.mock.calls[0][0]
    expect(mail.subject).toBe('Contact form: Jane Bcc: victim@example.com')
    expect(mail.replyTo.name).toBe('Jane Bcc: victim@example.com')
  })

  it('returns 502 when the email cannot be sent', async () => {
    stubTurnstile(true)
    const { env } = makeEnv(vi.fn(async (_mail: Mail): Promise<{ messageId: string }> => {
      throw new Error('E_SENDER_NOT_VERIFIED')
    }))

    const res = await worker.fetch(submit(valid), env)

    expect(res.status).toBe(502)
    expect(await res.json()).toEqual({ error: 'Could not deliver the message. Please try again later.' })
  })

  it('sends nothing when Turnstile verification fails', async () => {
    stubTurnstile(false)
    const { env, send } = makeEnv()

    const res = await worker.fetch(submit(valid), env)

    expect(res.status).toBe(403)
    expect(send).not.toHaveBeenCalled()
  })

  it('rejects a submission with missing fields before calling Turnstile', async () => {
    const spy = stubTurnstile(true)
    const { env, send } = makeEnv()

    const res = await worker.fetch(submit({ ...valid, message: '  ' }), env)

    expect(res.status).toBe(400)
    expect(spy).not.toHaveBeenCalled()
    expect(send).not.toHaveBeenCalled()
  })
})
