import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement | string, opts: Record<string, unknown>) => string
      reset: (id?: string) => void
      remove: (id: string) => void
    }
  }
}

// Module-level: Turnstile's api.js is loaded once per document, no matter
// how many forms mount a widget.
let turnstileLoadPromise: Promise<void> | null = null

// Defer Turnstile's api.js (and the bot-detection / iframe work it kicks off)
// until a consuming widget is near the viewport. Loading site-wide via useHead
// made every visit pay the cost even when the visitor never scrolled to the
// form; Safari's main thread was particularly sensitive to it.
function loadTurnstileScript(): Promise<void> {
  if (turnstileLoadPromise) return turnstileLoadPromise
  turnstileLoadPromise = new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve()
      return
    }
    const waitForGlobal = () => {
      const start = Date.now()
      const tick = () => {
        if (window.turnstile) resolve()
        else if (Date.now() - start > 8000) reject(new Error('Turnstile failed to load'))
        else setTimeout(tick, 50)
      }
      tick()
    }
    const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile]')
    if (existing) {
      waitForGlobal()
      return
    }
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    s.async = true
    s.defer = true
    s.dataset.turnstile = ''
    s.onerror = () => reject(new Error('Turnstile script failed to load'))
    s.onload = waitForGlobal
    document.head.appendChild(s)
  })
  return turnstileLoadPromise
}

/**
 * Lazily renders a Turnstile widget into `widgetEl` once it approaches the
 * viewport. Returns the reactive token and a reset function; widget cleanup
 * happens on unmount.
 */
export function useTurnstile(widgetEl: Ref<HTMLElement | null>, siteKey: string) {
  const token = ref('')
  let widgetId: string | null = null
  let observer: IntersectionObserver | null = null

  async function init() {
    if (!siteKey || !widgetEl.value || widgetId) return
    try {
      await loadTurnstileScript()
      if (!widgetEl.value || widgetId) return
      widgetId = window.turnstile!.render(widgetEl.value, {
        'sitekey': siteKey,
        'theme': 'auto',
        'callback': (t: string) => {
          token.value = t
        },
        'expired-callback': () => {
          token.value = ''
        },
        'error-callback': () => {
          token.value = ''
        },
      })
    }
    catch (e) {
      console.error('[turnstile] failed to initialise', e)
    }
  }

  function reset() {
    token.value = ''
    if (widgetId && window.turnstile) window.turnstile.reset(widgetId)
  }

  onMounted(() => {
    if (!siteKey || !widgetEl.value) return
    observer = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) {
        observer?.disconnect()
        observer = null
        init()
      }
    }, { rootMargin: '600px 0px' })
    observer.observe(widgetEl.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
    if (widgetId && window.turnstile) window.turnstile.remove(widgetId)
  })

  return { token, reset }
}
