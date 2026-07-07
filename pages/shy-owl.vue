<script setup lang="ts">
import StudioHero from '~/components/studio/Hero.vue'
import StudioServices from '~/components/studio/Services.vue'
import StudioAbout from '~/components/studio/About.vue'
import StudioProjects from '~/components/studio/Projects.vue'
import StudioContact from '~/components/studio/Contact.vue'

definePageMeta({ layout: 'studio' })

const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl ?? 'https://lunaparker.dev')
const pageUrl = `${siteUrl}/shy-owl`
const description = 'Shy Owl Studios builds tailored, accessible, high-performance websites and web applications. Based in Ontario; partnering with organizations worldwide.'

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Shy Owl Studios',
  'url': pageUrl,
  'email': 'mailto:hello@shyowlstudios.com',
  'description': description,
  'address': {
    '@type': 'PostalAddress',
    'addressLocality': 'Greater Toronto Area',
    'addressRegion': 'Ontario',
    'addressCountry': 'CA',
  },
  'founder': {
    '@type': 'Person',
    'name': 'Luna Parker',
    'url': siteUrl,
  },
  'knowsAbout': ['Web Design', 'Web Development', 'Custom Software', 'WordPress', 'Accessibility (AODA/WCAG)', 'Web Security', 'Database Development'],
}

useHead({
  htmlAttrs: { 'data-accent': 'shy-owl' },
  title: 'Shy Owl Studios — Web design & development from Ontario, Canada',
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify(orgLd),
  }],
})

useSeoMeta({
  description,
  ogTitle: 'Shy Owl Studios — Web design & development from Ontario, Canada',
  ogDescription: description,
  ogUrl: pageUrl,
  ogSiteName: 'Shy Owl Studios',
  twitterTitle: 'Shy Owl Studios — Web design & development from Ontario, Canada',
  twitterDescription: description,
})
</script>

<template>
  <div>
    <StudioHero />
    <StudioServices />
    <StudioAbout />
    <StudioProjects />
    <StudioContact />
  </div>
</template>

<style lang="stylus">
// Anchored sections shouldn't hide under the sticky nav (unscoped on purpose:
// targets section ids rendered by child components).
#services, #about, #projects, #contact
  scroll-margin-top: 84px
</style>
