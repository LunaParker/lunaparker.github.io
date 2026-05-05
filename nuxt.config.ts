export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@nuxt/fonts', '@nuxt/eslint', '@nuxtjs/sitemap'],

  site: {
    url: 'https://lunaparker.dev',
    name: 'Luna Parker',
  },

  sitemap: {
    exclude: ['/writing', '/writing/**'],
  },

  css: [
    '~/assets/css/tokens.styl',
    '~/assets/css/base.styl',
    '~/assets/css/app.styl',
  ],

  fonts: {
    families: [
      {
        name: 'Plus Jakarta Sans',
        provider: 'google',
        weights: [300, 400, 500, 600, 700, 800],
        styles: ['normal', 'italic'],
      },
      {
        name: 'Roboto Flex',
        provider: 'google',
        weights: [300, 400, 500, 600, 700],
      },
      {
        name: 'JetBrains Mono',
        provider: 'google',
        weights: [400, 500, 600],
      },
    ],
  },

  experimental: {
    viewTransition: true,
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Luna Parker — Developer & Designer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: "Full-stack web developer and designer with 8+ years' experience. Honours BCS student at Conestoga — available for Fall 2026 co-op.",
        },
        { name: 'theme-color', content: '#8A2387' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Luna Parker' },
        { property: 'og:title', content: 'Luna Parker — Developer & Designer' },
        {
          property: 'og:description',
          content: "Full-stack web developer and designer with 8+ years' experience. Honours BCS student at Conestoga — available for Fall 2026 co-op.",
        },
        { property: 'og:image', content: 'https://lunaparker.dev/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:url', content: 'https://lunaparker.dev/' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Luna Parker — Developer & Designer' },
        {
          name: 'twitter:description',
          content: "Full-stack web developer and designer with 8+ years' experience.",
        },
        { name: 'twitter:image', content: 'https://lunaparker.dev/og-image.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      script: [
        {
          // Apply persisted theme override before first paint to avoid a flash.
          // Mirrors useTheme composable's storage key + values.
          innerHTML: '(function(){try{var t=localStorage.getItem("theme-preference");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();',
          tagPriority: 'critical',
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      // Override at build time with NUXT_PUBLIC_TURNSTILE_SITE_KEY and NUXT_PUBLIC_CONTACT_ENDPOINT.
      // Default endpoint is absolute so the form works from any deployed origin
      // (lunaparker.dev, lunaparker.github.io).
      turnstileSiteKey: '0x4AAAAAADD0v3nrGLOgqLEF',
      contactEndpoint: 'https://lunaparker.dev/api/contact',
      // Gate the Writing/blog section and /writing routes. Off until real
      // posts exist; flip via NUXT_PUBLIC_WRITING_ENABLED=true.
      writingEnabled: false,
      // Canonical site URL — drives canonical <link>, OG tags, and sitemap.
      // Override per-build with NUXT_PUBLIC_SITE_URL.
      siteUrl: 'https://lunaparker.dev',
    },
  },

  nitro: {
    prerender: {
      // Skip /writing routes unless the flag is explicitly enabled at build time.
      // Keeps the deployed bundle clean of placeholder blog content.
      ignore: process.env.NUXT_PUBLIC_WRITING_ENABLED === 'true' ? [] : ['/writing'],
    },
  },
})
