<script setup lang="ts">
import { useData } from '~/composables/useData'

const data = useData()
</script>

<template>
  <section id="projects" class="section projects">
    <div class="container">
      <UiSectionHeader
        kicker="03 — Projects"
        sub="Five featured. Click any card to visit the live site or open the repo."
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

<style scoped lang="scss">
.projects {
  position: relative;
}

.projects__title-emphasis {
  font-style: italic;
  font-weight: 300;
}

.projects__action {
  font-size: 12px;
  color: var(--on-surface-variant);
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 240px;
  grid-auto-flow: dense;
  gap: 18px;
}

@media (min-width: 601px) and (max-width: 960px) {
  .projects__grid {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 220px;
  }
  .projects__grid > .project-card:nth-child(1) { grid-column: span 4; grid-row: span 2; }
  .projects__grid > .project-card:nth-child(2) { grid-column: span 4; grid-row: span 1; }
  .projects__grid > .project-card:nth-child(3) { grid-column: span 2; grid-row: span 2; }
  .projects__grid > .project-card:nth-child(4) { grid-column: span 2; grid-row: span 1; }
  .projects__grid > .project-card:nth-child(5) { grid-column: span 2; grid-row: span 1; }
}

@media (max-width: 600px) {
  .projects__grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  .projects__grid > .project-card {
    grid-column: span 1;
    grid-row: auto;
    min-height: 280px;
    height: 280px;
  }
  .projects__grid > .project-card:nth-child(1) {
    height: 360px;
  }
}
</style>
