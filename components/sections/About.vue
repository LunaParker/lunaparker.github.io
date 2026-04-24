<script setup lang="ts">
import { useData } from '~/composables/useData'

const data = useData()
</script>

<template>
  <section id="about" class="section" :style="{ position: 'relative' }">
    <div class="container">
      <UiSectionHeader kicker="01 — About">
        <template #title>
          I build the whole thing <span :style="{ fontStyle: 'italic', fontWeight: 300 }">end-to-end</span> — from client kickoff to deployed code.
        </template>
      </UiSectionHeader>

      <div
        class="about-grid"
        :style="{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: 'clamp(24px, 4vw, 72px)', alignItems: 'start' }"
      >
        <UiReveal>
          <p class="body-lg" :style="{ fontSize: '1.25rem', lineHeight: 1.55, color: 'var(--on-surface)', marginBottom: '20px' }">
            I'm a full-stack developer who's been building for the web since high school. Through my own consultancy, <b>Shy Owl Studios</b>, I've delivered dozens of websites and web applications for clients ranging from local businesses to nation-wide brands.
          </p>
          <p class="body-lg" :style="{ color: 'var(--on-surface-variant)', marginBottom: '20px' }">
            I specialize in Laravel, WordPress, and whatever else the problem calls for. I combine technical skill with strong client relations, project management, and a genuine commitment to helping organizations thrive.
          </p>
          <p class="body-lg" :style="{ color: 'var(--on-surface-variant)' }">
            Currently pursuing an Honours Bachelor of Computer Science with a Security Specialization at Conestoga — where I've deepened my understanding of low-level programming, secure systems design, and collaborative software development. I originally began my postsecondary studies at the University of Toronto, studying CS and philosophy — an experience that still shapes how I reason about complex problems. <UiAvailabilityPill compact />
          </p>
        </UiReveal>

        <UiReveal :delay="120">
          <div :style="{ display: 'grid', gap: '12px' }">
            <div
              v-for="item in data.whatIDo"
              :key="item.verb"
              class="what-i-do-card"
            >
              <div class="what-i-do-verb">{{ item.verb }}.</div>
              <p :style="{ color: 'var(--on-surface-variant)' }">{{ item.body }}</p>
            </div>
          </div>
        </UiReveal>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.what-i-do-card {
  padding: 22px 24px;
  background: var(--surface-container);
  border-radius: 20px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: baseline;
  transition:
    background-color var(--dur-short) var(--spring-gentle),
    transform var(--dur-short) var(--spring-fast);
}
.what-i-do-card:hover {
  background: var(--surface-container-high);
  transform: translateX(4px);
}
.what-i-do-verb {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--primary-text);
  min-width: 100px;
}

@media (max-width: 860px) {
  .about-grid { grid-template-columns: 1fr !important; }
}
</style>
