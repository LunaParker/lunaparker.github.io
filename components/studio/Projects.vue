<script setup lang="ts">
import { useData } from '~/composables/useData'

const PROJECT_IDS = ['eyolf', 'blsc', 'jarvis-ryan'] as const

const BLURBS: Record<string, string[]> = {
  'eyolf': [
    'EYOLF makes climbing gear that lets professionals work safely at great heights.',
    'We designed a website built around their brand\'s verticality and momentum, then connected the front-end to a custom Laravel inventory portal and a tailored InvoiceNinja deployment; together they quietly streamline the operations behind the storefront.',
  ],
  'blsc': [
    'Belwood Lake Sailing Club is a member-run sailing organization in Belwood, Ontario.',
    'We rebuilt their online presence end-to-end and shipped a member portal where sailors renew memberships, register for events, and stay current with the club. The Laravel backend gives administrators the controls they actually need.',
  ],
  'jarvis-ryan': [
    'Jarvis Ryan Associates is a Mississauga accounting firm serving individuals and organizations across the GTA.',
    'We redesigned their public-facing site around their existing typography, then built Client Cloud: a secure Laravel portal where clients access tax documents and exchange large files with the office. It plugs directly into their existing Microsoft Server / IIS infrastructure.',
  ],
}

const IMAGES: Record<string, string> = {
  'eyolf': '/images/shy-owl/projects/eyolf.jpg',
  'blsc': '/images/shy-owl/projects/blsc.jpg',
  'jarvis-ryan': '/images/shy-owl/projects/jarvisryan.jpg',
}

const data = useData()
const projects = PROJECT_IDS
  .map(id => data.projects.find(p => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p))
</script>

<template>
  <section id="projects" class="section studio-projects">
    <div class="container">
      <UiSectionHeader
        kicker="Selected work"
        sub="A small studio means we can be choosy. Here's a few of the organizations we've partnered with."
      >
        <template #title>
          Recent client projects.
        </template>
      </UiSectionHeader>

      <div class="studio-projects__rows">
        <UiReveal v-for="(p, i) in projects" :key="p.id" as="article">
          <div class="studio-projects__row" :class="{ 'studio-projects__row--flip': i % 2 === 1 }">
            <div class="studio-projects__image-cell">
              <a :href="p.url" target="_blank" rel="noreferrer" class="studio-projects__image-link">
                <img
                  :src="IMAGES[p.id]"
                  :alt="`Screenshot of ${p.name}`"
                  width="800"
                  height="533"
                  loading="lazy"
                >
              </a>
            </div>
            <div class="studio-projects__text-cell">
              <div class="mono studio-projects__meta">{{ p.client }} · {{ p.year }}</div>
              <h3 class="studio-projects__name">
                <a :href="p.url" target="_blank" rel="noreferrer">{{ p.name }}</a>
              </h3>
              <div class="studio-projects__tagline">{{ p.tagline }}</div>
              <ul class="studio-projects__stack">
                <li class="mono studio-projects__stack-label">Stack</li>
                <li v-for="tech in p.stack" :key="tech">
                  <UiChip variant="tonal">{{ tech }}</UiChip>
                </li>
              </ul>
              <div class="studio-projects__blurbs">
                <p v-for="(b, j) in BLURBS[p.id]" :key="j">{{ b }}</p>
              </div>
              <a :href="p.url" target="_blank" rel="noreferrer" class="btn btn-outlined">
                View site <UiIcon name="arrowUpRight" :size="14" />
              </a>
            </div>
          </div>
        </UiReveal>
      </div>
    </div>
  </section>
</template>

<style scoped lang="stylus">
.studio-projects__rows
  display: grid
  gap: unquote("clamp(3rem, 8vh, 6rem)")
  margin-top: 3.5rem

.studio-projects__row
  display: grid
  grid-template-columns: 1fr 1fr
  gap: unquote("clamp(2rem, 5vw, 4rem)")
  align-items: center

.studio-projects__row--flip .studio-projects__image-cell
  order: 2

.studio-projects__row--flip .studio-projects__text-cell
  order: 1

.studio-projects__image-link
  display: block
  border-radius: 20px
  overflow: hidden
  border: 1px solid var(--outline-variant)
  box-shadow: 0 18px 50px -20px unquote("color-mix(in oklch, #000 35%, transparent)")
  transition: transform var(--dur-med) var(--spring-emphasized), box-shadow var(--dur-med)

.studio-projects__image-link:hover
  transform: translateY(-4px)
  box-shadow: 0 28px 70px -22px unquote("color-mix(in oklch, var(--primary) 50%, #000 30%)")

.studio-projects__image-link img
  display: block
  width: 100%
  height: auto

.studio-projects__meta
  font-size: 11px
  color: var(--on-surface-variant)
  text-transform: uppercase
  letter-spacing: 0.1em
  margin-bottom: 0.75rem

.studio-projects__name
  font-family: var(--font-display)
  font-size: unquote("clamp(1.6rem, 3vw, 2.4rem)")
  font-weight: 700
  letter-spacing: -0.02em
  margin: 0 0 0.5rem

.studio-projects__name a
  color: inherit
  text-decoration: none

.studio-projects__tagline
  color: var(--on-surface-variant)
  margin-bottom: 1.25rem
  font-size: 1rem

.studio-projects__stack
  display: flex
  flex-wrap: wrap
  gap: 6px
  list-style: none
  padding: 0
  margin: 0 0 1.5rem

.studio-projects__stack-label
  font-size: 11px
  color: var(--on-surface-variant)
  text-transform: uppercase
  letter-spacing: 0.08em
  align-self: center
  margin-right: 6px

.studio-projects__blurbs
  display: grid
  gap: 0.85rem
  color: var(--on-surface-variant)
  line-height: 1.65
  margin-bottom: 1.5rem

.studio-projects__blurbs p
  margin: 0

@media (max-width: 900px)
  .studio-projects__row
    grid-template-columns: 1fr

  .studio-projects__row--flip .studio-projects__image-cell
    order: 1

  .studio-projects__row--flip .studio-projects__text-cell
    order: 2
</style>
