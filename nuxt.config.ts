export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@nuxt/fonts', '@nuxt/eslint', '@nuxtjs/sitemap'],

  site: {
    url: 'https://shyowlstudios.com',
    name: 'Luna Parker',
  },

  sitemap: {
    exclude: ['/writing', '/writing/**'],
  },

  css: [
    '~/assets/css/tokens.scss',
    '~/assets/css/base.scss',
    '~/assets/css/app.scss',
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
      ],
    },
  },

  runtimeConfig: {
    public: {
      // Override at build time with NUXT_PUBLIC_TURNSTILE_SITE_KEY and NUXT_PUBLIC_CONTACT_ENDPOINT.
      // Default endpoint is absolute so the form works from any deployed origin
      // (shyowlstudios.com, lunaparker.dev, lunaparker.github.io).
      turnstileSiteKey: '0x4AAAAAADD0v3nrGL0gqLEF',
      contactEndpoint: 'https://shyowlstudios.com/api/contact',
      // Gate the Writing/blog section and /writing routes. Off until real
      // posts exist; flip via NUXT_PUBLIC_WRITING_ENABLED=true.
      writingEnabled: false,
      // Canonical site URL — drives canonical <link>, OG tags, and sitemap.
      // Override per-build with NUXT_PUBLIC_SITE_URL.
      siteUrl: 'https://shyowlstudios.com',
    },
  },

  nitro: {
    preset: 'github-pages',
    prerender: {
      // Skip /writing routes unless the flag is explicitly enabled at build time.
      // Keeps the deployed bundle clean of placeholder blog content.
      ignore: process.env.NUXT_PUBLIC_WRITING_ENABLED === 'true' ? [] : ['/writing'],
    },
  },
})
