import { computed, onMounted } from 'vue'

export type ThemePreference = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme-preference'

function applyDataTheme(pref: ThemePreference) {
  if (!import.meta.client) return
  const html = document.documentElement
  if (pref === 'system') {
    html.removeAttribute('data-theme')
  }
  else {
    html.setAttribute('data-theme', pref)
  }
}

export function useTheme() {
  const preference = useState<ThemePreference>('theme-preference', () => 'system')
  const systemTheme = useState<ResolvedTheme>('theme-system', () => 'light')
  const initialized = useState<boolean>('theme-initialized', () => false)

  const resolved = computed<ResolvedTheme>(() =>
    preference.value === 'system' ? systemTheme.value : preference.value,
  )

  function setPreference(value: ThemePreference) {
    preference.value = value
    if (!import.meta.client) return
    try {
      if (value === 'system') {
        localStorage.removeItem(THEME_STORAGE_KEY)
      }
      else {
        localStorage.setItem(THEME_STORAGE_KEY, value)
      }
    }
    catch {
      // localStorage may be unavailable (private mode, quota, etc.) — silently skip persistence.
    }
    applyDataTheme(value)
  }

  // Defer hydration of localStorage + system theme until onMounted, so SSR
  // renders with default 'system' state and the client's first paint matches.
  // The inline head script in nuxt.config.ts already applied data-theme
  // synchronously before paint, so users never see a flash of the wrong
  // colors — this just syncs Vue's reactive state afterwards.
  onMounted(() => {
    if (initialized.value) return
    initialized.value = true

    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY)
      if (stored === 'light' || stored === 'dark') {
        preference.value = stored
        document.documentElement.setAttribute('data-theme', stored)
      }
    }
    catch {
      // localStorage may be unavailable (private mode, quota, etc.) — fall back to system theme.
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    systemTheme.value = mql.matches ? 'dark' : 'light'
    const onChange = (e: MediaQueryListEvent) => {
      systemTheme.value = e.matches ? 'dark' : 'light'
    }
    if (mql.addEventListener) mql.addEventListener('change', onChange)
    else mql.addListener(onChange)
  })

  return {
    preference,
    resolved,
    systemTheme,
    setPreference,
  }
}
