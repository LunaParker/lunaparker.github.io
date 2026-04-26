<script setup lang="ts">
import { computed } from 'vue'
import { useData } from '~/composables/useData'

const route = useRoute()
const config = useRuntimeConfig()
const data = useData()

const siteUrl = String(config.public.siteUrl ?? 'https://shyowlstudios.com')
const canonical = computed(() => `${siteUrl}${route.path === '/' ? '' : route.path.replace(/\/$/, '')}`)

const ogImage = `${siteUrl}/og-image.png`
const description = "Full-stack web developer and designer with 8+ years' experience. Honours BCS student at Conestoga — available for Fall 2026 co-op."

useSeoMeta({
  ogSiteName: 'Luna Parker',
  ogType: 'website',
  ogTitle: () => 'Luna Parker — Developer & Designer',
  ogDescription: description,
  ogUrl: () => canonical.value,
  ogImage,
  ogImageAlt: 'Luna Parker — Developer, Designer, and Problem Solver',
  twitterCard: 'summary_large_image',
  twitterTitle: () => 'Luna Parker — Developer & Designer',
  twitterDescription: description,
  twitterImage: ogImage,
})

const personLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  'name': data.value.luna.name,
  'jobTitle': 'Software Developer & Designer',
  'description': data.value.luna.bio,
  'url': siteUrl,
  'email': `mailto:${data.value.luna.email}`,
  'address': {
    '@type': 'PostalAddress',
    'addressRegion': 'Ontario',
    'addressCountry': 'CA',
  },
  'alumniOf': data.value.education.map(e => ({
    '@type': 'CollegeOrUniversity',
    'name': e.school,
  })),
  'sameAs': [
    `https://${data.value.luna.linkedin}`,
    `https://${data.value.luna.github}`,
  ],
  'worksFor': {
    '@type': 'Organization',
    'name': 'Shy Owl Studios',
    'url': 'https://shyowlstudios.com',
  },
  'knowsAbout': [
    ...data.value.skills.Languages,
    ...data.value.skills.Frameworks,
    ...data.value.skills.Practices,
  ],
}))

useHead({
  link: [{ rel: 'canonical', href: canonical }],
  script: [{
    type: 'application/ld+json',
    innerHTML: computed(() => JSON.stringify(personLd.value)),
  }],
})
</script>

<template>
  <div>
    <SiteNav />
    <main>
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
