import { afterEach, describe, expect, it, vi } from 'vitest'
import worker from '../src/files'

const env = { BUCKET: 'staging.lunaparker.dev' }
const ORIGIN = 'https://storage.googleapis.com/staging.lunaparker.dev'

type OriginHandler = (url: string, init: RequestInit) => Response | Promise<Response>

/** Replace the global fetch the Worker uses for its origin subrequests. */
function stubOrigin(handler: OriginHandler) {
  const spy = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const url = input instanceof Request ? input.url : String(input)
    return handler(url, init ?? {})
  })
  vi.stubGlobal('fetch', spy)
  return spy
}

function originCalls(spy: ReturnType<typeof stubOrigin>): Array<{ url: string; init: RequestInit }> {
  return spy.mock.calls.map(([input, init]) => ({
    url: input instanceof Request ? input.url : String(input),
    init: init ?? {},
  }))
}

afterEach(() => vi.unstubAllGlobals())

describe('files worker', () => {
  it('serves an object from the bucket by path and passes the origin response through', async () => {
    const spy = stubOrigin(
      () => new Response('png-bytes', { status: 200, headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=3600' } }),
    )

    const res = await worker.fetch(new Request('https://files.lunaparker.dev/uploads/photo.png'), env)

    expect(originCalls(spy)).toHaveLength(1)
    expect(originCalls(spy)[0].url).toBe(`${ORIGIN}/uploads/photo.png`)
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('image/png')
    expect(res.headers.get('cache-control')).toBe('public, max-age=3600')
    expect(await res.text()).toBe('png-bytes')
  })

  it('maps a trailing-slash path to its index.html, like the bucket website config', async () => {
    const spy = stubOrigin(() => new Response('<h1>mockup</h1>', { status: 200 }))

    await worker.fetch(new Request('https://files.lunaparker.dev/pmha-homepage-redesign/1/'), env)

    expect(originCalls(spy)[0].url).toBe(`${ORIGIN}/pmha-homepage-redesign/1/index.html`)
  })

  it('maps the site root to /index.html', async () => {
    const spy = stubOrigin(() => new Response('root', { status: 200 }))

    await worker.fetch(new Request('https://files.lunaparker.dev/'), env)

    expect(originCalls(spy)[0].url).toBe(`${ORIGIN}/index.html`)
  })

  it('rejects methods other than GET and HEAD without contacting the bucket', async () => {
    const spy = stubOrigin(() => new Response('should not be called'))

    const res = await worker.fetch(new Request('https://files.lunaparker.dev/uploads/', { method: 'POST', body: 'x' }), env)

    expect(res.status).toBe(405)
    expect(res.headers.get('allow')).toBe('GET, HEAD')
    expect(spy).not.toHaveBeenCalled()
  })

  it('redirects a slash-less directory path to its trailing-slash form when it has an index.html', async () => {
    stubOrigin((url, init) => {
      if (url === `${ORIGIN}/pmha-homepage-redesign/1`) return new Response('NoSuchKey', { status: 404 })
      if (url === `${ORIGIN}/pmha-homepage-redesign/1/index.html` && init.method === 'HEAD') return new Response(null, { status: 200 })
      return new Response(`unexpected origin request: ${init.method ?? 'GET'} ${url}`, { status: 500 })
    })

    const res = await worker.fetch(new Request('https://files.lunaparker.dev/pmha-homepage-redesign/1'), env)

    expect(res.status).toBe(301)
    expect(res.headers.get('location')).toBe('https://files.lunaparker.dev/pmha-homepage-redesign/1/')
  })

  it('passes the bucket 404 through when a missing path has no index.html behind it either', async () => {
    stubOrigin(() => new Response('NoSuchKey', { status: 404, headers: { 'content-type': 'application/xml' } }))

    const res = await worker.fetch(new Request('https://files.lunaparker.dev/nope'), env)

    expect(res.status).toBe(404)
    expect(await res.text()).toBe('NoSuchKey')
  })

  it('preserves the query string on the origin request', async () => {
    const spy = stubOrigin(() => new Response('ok'))

    await worker.fetch(new Request('https://files.lunaparker.dev/uploads/photo.jpg?cb=2'), env)

    expect(originCalls(spy)[0].url).toBe(`${ORIGIN}/uploads/photo.jpg?cb=2`)
  })

  it('forwards range and conditional request headers to the bucket', async () => {
    const spy = stubOrigin(() => new Response(null, { status: 206 }))

    await worker.fetch(
      new Request('https://files.lunaparker.dev/uploads/clip.mp4', { headers: { Range: 'bytes=0-99', 'If-None-Match': '"abc"' } }),
      env,
    )

    const sent = new Headers(originCalls(spy)[0].init.headers)
    expect(sent.get('range')).toBe('bytes=0-99')
    expect(sent.get('if-none-match')).toBe('"abc"')
  })

  it('does not forward cookies or other client headers to the bucket', async () => {
    const spy = stubOrigin(() => new Response('ok'))

    await worker.fetch(
      new Request('https://files.lunaparker.dev/file.txt', { headers: { Cookie: 'session=1', 'X-Forwarded-For': '1.2.3.4' } }),
      env,
    )

    const sent = new Headers(originCalls(spy)[0].init.headers)
    expect(sent.get('cookie')).toBeNull()
    expect(sent.get('x-forwarded-for')).toBeNull()
  })

  it('uses HEAD against the bucket for HEAD requests', async () => {
    const spy = stubOrigin(() => new Response(null, { status: 200 }))

    await worker.fetch(new Request('https://files.lunaparker.dev/uploads/photo.jpg', { method: 'HEAD' }), env)

    expect(originCalls(spy)[0].init.method).toBe('HEAD')
  })
})
