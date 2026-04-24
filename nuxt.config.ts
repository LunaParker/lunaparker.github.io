export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@nuxt/fonts', '@nuxt/eslint'],

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

  nitro: {
    preset: 'github-pages',
  },
})
