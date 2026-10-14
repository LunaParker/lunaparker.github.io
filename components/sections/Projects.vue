<script setup lang="ts">
import { useData } from '~/composables/useData'

const data = useData()
</script>

<template>
  <section id="projects" class="section projects">
    <div class="container">
      <UiSectionHeader
        kicker="03 — Projects"
        sub="Nine featured. Click any card to visit the live site or open the repo."
      >
        <template #title>
          Selected client work &<br><span class="projects__title-emphasis">things I build for me.</span>
        </template>
        <template #action>
          <div class="mono projects__action">
            {{ data.projects.length }} projects · more on github
          </div>
        </template>
      </UiSectionHeader>

      <div class="projects__grid">
        <ProjectCard v-for="p in data.projects" :key="p.id" :project="p" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="stylus">
.projects
  position: relative

.projects__title-emphasis
  font-style: italic
  font-weight: 300

.projects__action
  font-size: 12px
  color: var(--on-surface-variant)

.projects__grid
  display: grid
  grid-template-columns: repeat(6, 1fr)
  grid-auto-rows: 240px
  grid-auto-flow: dense
  gap: 18px

@media (min-width: 601px) and (max-width: 960px)
  .projects__grid
    grid-template-columns: repeat(4, 1fr)
    grid-auto-rows: 220px

  // Four columns: featured goes full width; wide drops to two so the grid closes.
  .projects__grid > .project-card--featured
    grid-column: span 4

  .projects__grid > .project-card--wide
    grid-column: span 2

@media (max-width: 600px)
  .projects__grid
    grid-template-columns: 1fr
    grid-auto-rows: auto

  .projects__grid > .project-card
    grid-column: span 1
    grid-row: auto
    min-height: 280px
    height: 280px

  .projects__grid > .project-card--featured,
  .projects__grid > .project-card--large
    height: 360px
</style>
