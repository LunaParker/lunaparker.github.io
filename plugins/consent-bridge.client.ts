// Bridge between nuxt-cookie-control's consent state and nuxt-gtag.
// On grant of the "ga4" optional cookie: load gtag.js (it's manual-init) and
// flip Consent Mode v2's analytics_storage to granted. On revoke: re-deny and
// set ga-disable-G-* so any already-loaded script stops sending hits.
import { watch } from 'vue'

export default defineNuxtPlugin(() => {
  const { cookiesEnabledIds } = useCookieControl()
  const { gtag, initialize, disableAnalytics } = useGtag()

  let initialized = false

  watch(
    cookiesEnabledIds,
    (ids) => {
      if (!ids) return
      const granted = ids.includes('ga4')

      if (granted) {
        if (!initialized) {
          initialize()
          initialized = true
        }
        gtag('consent', 'update', { analytics_storage: 'granted' })
      } else {
        gtag('consent', 'update', { analytics_storage: 'denied' })
        if (initialized) disableAnalytics()
      }
    },
    { immediate: true },
  )
})
