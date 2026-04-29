<script setup lang="ts">
import { useData } from '~/composables/useData'

const data = useData()
</script>

<template>
  <section id="projects" class="section" :style="{ position: 'relative' }">
    <div class="container">
      <UiSectionHeader
        kicker="03 — Projects"
        sub="Five featured. Click any card to visit the live site or open the repo."
      >
        <template #title>
          Selected client work &<br><span :style="{ fontStyle: 'italic', fontWeight: 300 }">things I build for me.</span>
        </template>
        <template #action>
          <div class="mono" :style="{ fontSize: '12px', color: 'var(--on-surface-variant)' }">
            {{ data.projects.length }} projects · more on github
          </div>
        </template>
      </UiSectionHeader>

      <div
        class="bento-grid"
        :style="{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridAutoRows: '240px',
          gridAutoFlow: 'dense',
          gap: '18px',
        }"
      >
        <ProjectCard v-for="p in data.projects" :key="p.id" :project="p" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@media (min-width: 601px) and (max-width: 960px) {
  .bento-grid {
    grid-template-columns: repeat(4, 1fr) !important;
    grid-auto-rows: 220px !important;
  }
  .bento-grid > a:nth-child(1) { grid-column: span 4 !important; grid-row: span 2 !important; }
  .bento-grid > a:nth-child(2) { grid-column: span 4 !important; grid-row: span 1 !important; }
  .bento-grid > a:nth-child(3) { grid-column: span 2 !important; grid-row: span 2 !important; }
  .bento-grid > a:nth-child(4) { grid-column: span 2 !important; grid-row: span 1 !important; }
  .bento-grid > a:nth-child(5) { grid-column: span 2 !important; grid-row: span 1 !important; }
}
@media (max-width: 600px) {
  .bento-grid {
    grid-template-columns: 1fr !important;
    grid-auto-rows: auto !important;
  }
  .bento-grid > a {
    grid-column: span 1 !important;
    grid-row: auto !important;
    min-height: 280px !important;
    height: 280px;
  }
  .bento-grid > a:nth-child(1) { height: 360px; }
}
</style>
