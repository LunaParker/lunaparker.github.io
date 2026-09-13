/**
 * files.lunaparker.dev — read-only alias for a public Google Cloud Storage bucket.
 *
 * GCS picks the bucket from the Host header, so a second hostname cannot point at the
 * bucket directly. This Worker fetches the same object path from the bucket's
 * path-style public endpoint and streams the response back unchanged.
 */
export interface Env {
  /** Name of the public GCS bucket to serve (set in wrangler.files.toml). */
  BUCKET: string
}

const INDEX_SUFFIX = 'index.html'

/** Client request headers worth passing to GCS: range and conditional requests. Everything else stays private. */
const FORWARDED_HEADERS = ['range', 'if-range', 'if-none-match', 'if-modified-since'] as const

/** Object key for a request path: directory URLs resolve to their index.html, as GCS website hosting does. */
export function objectPathFor(pathname: string): string {
  return pathname.endsWith('/') ? `${pathname}${INDEX_SUFFIX}` : pathname
}

function originRequestInit(request: Request, method: string): RequestInit {
  const headers = new Headers()
  for (const name of FORWARDED_HEADERS) {
    const value = request.headers.get(name)
    if (value !== null) headers.set(name, value)
  }
  return { method, headers, redirect: 'manual' }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD' } })
    }

    const url = new URL(request.url)
    const origin = `https://storage.googleapis.com/${env.BUCKET}`

    const res = await fetch(`${origin}${objectPathFor(url.pathname)}${url.search}`, originRequestInit(request, request.method))
    if (res.status === 404 && !url.pathname.endsWith('/')) {
      // GCS website hosting sends /dir to its index when /dir/index.html exists; mirror that.
      const probe = await fetch(`${origin}${url.pathname}/${INDEX_SUFFIX}`, { method: 'HEAD' })
      if (probe.ok) return Response.redirect(`${url.origin}${url.pathname}/${url.search}`, 301)
    }
    return res
  },
}
