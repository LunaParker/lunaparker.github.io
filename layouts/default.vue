<script setup lang="ts">
import { computed } from 'vue'
import { useData } from '~/composables/useData'

const route = useRoute()
const config = useRuntimeConfig()
const data = useData()
const error = useError()

const siteUrl = String(config.public.siteUrl ?? 'https://lunaparker.dev')
// Pages serves every route as /x/ (and 308s /x there), so canonicals match that
const canonical = computed(() => `${siteUrl}${route.path.endsWith('/') ? route.path : `${route.path}/`}`)

const title = 'Luna Parker | Full-Stack Web Developer & Designer, Ontario'
const ogImage = `${siteUrl}/og-image.png`
const description = 'Full-stack web developer and designer in Ontario with 8+ years building WordPress, Laravel and Vue sites. Honours BCS (Security) student at Conestoga.'

useSeoMeta({
  ogSiteName: 'Luna Parker',
  ogType: 'website',
  ogTitle: () => title,
  ogDescription: description,
  ogUrl: () => error.value ? undefined : canonical.value,
  ogImage,
  ogImageAlt: 'Luna Parker: Development, design, and security',
  twitterCard: 'summary_large_image',
  twitterTitle: () => title,
  twitterDescription: description,
  twitterImage: ogImage,
})

const personId = `${siteUrl}/#person`
const websiteId = `${siteUrl}/#website`
const studioUrl = `${siteUrl}/shy-owl/`
const monogram = {
  '@type': 'ImageObject',
  'url': `${siteUrl}/icon-512.png`,
  'width': 512,
  'height': 512,
}

const person = {
  '@type': 'Person',
  '@id': personId,
  'name': 'Luna Parker',
  'jobTitle': 'Full-Stack Web Developer & Designer',
  'description': 'Full-stack web developer with 8+ years of experience (mostly through my own consultancy, Shy Owl Studios). Currently finishing an Honours Bachelor of Computer Science with a Security Specialisation at Conestoga College.',
  'url': `${siteUrl}/`,
  'image': monogram,
  'email': 'mailto:luna@lunaparker.dev',
  'address': {
    '@type': 'PostalAddress',
    'addressRegion': 'Ontario',
    'addressCountry': 'CA',
  },
  'alumniOf': data.education.map(e => ({
    '@type': 'CollegeOrUniversity',
    'name': e.school,
  })),
  'sameAs': [
    'https://www.linkedin.com/in/luna-parker/',
    'https://github.com/LunaParker',
  ],
  'worksFor': {
    '@type': 'Organization',
    '@id': `${studioUrl}#organization`,
    'name': 'Shy Owl Studios',
    'url': studioUrl,
  },
  'knowsAbout': [
    ...data.skills.Languages,
    ...data.skills.Frameworks,
    ...data.skills.Practices,
  ],
}

const website = {
  '@type': 'WebSite',
  '@id': websiteId,
  'name': 'Luna Parker',
  'url': `${siteUrl}/`,
  'inLanguage': 'en',
  'publisher': { '@id': personId },
}

const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@graph': [
    website,
    person,
    // The home page is Luna's profile; other pages only describe the site
    ...(route.path === '/'
      ? [{
          '@type': 'ProfilePage',
          '@id': `${siteUrl}/#profilepage`,
          'url': `${siteUrl}/`,
          'name': title,
          'description': description,
          'isPartOf': { '@id': websiteId },
          'mainEntity': { '@id': personId },
        }]
      : []),
  ],
}))

useHead({
  // Error pages are served at whatever URL missed, so they get no canonical
  link: computed(() => error.value ? [] : [{ rel: 'canonical', href: canonical.value }]),
  script: [{
    type: 'application/ld+json',
    innerHTML: computed(() => JSON.stringify(jsonLd.value)),
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
