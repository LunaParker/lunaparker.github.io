<script setup lang="ts">
import { computed } from 'vue'
import { useData } from '~/composables/useData'

const data = useData()

const cats = computed(() => Object.entries(data.value.skills))

function chipVariant(i: number): 'primary' | 'tonal' | 'default' {
  if (i === 0) return 'primary'
  if (i === 1) return 'tonal'
  return 'default'
}
</script>

<template>
  <section id="skills" class="section skills">
    <div class="container">
      <UiSectionHeader
        kicker="05 — Skills"
        sub="Languages, frameworks, tools, and practices I use in production. Hover any tech to see where I've used it."
      >
        <template #title>
          The <span class="skills__title-emphasis">toolkit.</span>
        </template>
      </UiSectionHeader>

      <div class="skills__categories">
        <UiReveal
          v-for="([cat, items], i) in cats"
          :key="cat"
          :delay="i * 60"
        >
          <div class="skills__category">
            <div class="label skills__category-label">{{ cat }}</div>
            <div class="skills__chips">
              <UiSkillChip
                v-for="s in items"
                :key="s"
                :tech="s"
                :variant="chipVariant(i)"
              />
            </div>
          </div>
        </UiReveal>
      </div>

      <div class="skills__services">
        <div class="label section-kicker skills__services-kicker">
          <span>Services · through Shy Owl Studios</span>
        </div>
        <div class="skills__services-grid">
          <UiReveal :delay="0">
            <div class="skills__service-card">
              <div class="skills__service-card-icon"><UiIcon name="webDesign" :size="28" :stroke="1.6" /></div>
              <div class="skills__service-card-title">Web Design</div>
              <p class="skills__service-card-body">User-centred design that aligns with your brand and business goals.</p>
            </div>
          </UiReveal>
          <UiReveal :delay="50">
            <div class="skills__service-card">
              <div class="skills__service-card-icon"><UiIcon name="webDev" :size="28" :stroke="1.6" /></div>
              <div class="skills__service-card-title">Web Development</div>
              <p class="skills__service-card-body">Full-stack using Laravel, WordPress, Vue.js, and more.</p>
            </div>
          </UiReveal>
          <UiReveal :delay="100">
            <div class="skills__service-card">
              <div class="skills__service-card-icon"><UiIcon name="custom" :size="28" :stroke="1.6" /></div>
              <div class="skills__service-card-title">Custom Software</div>
              <p class="skills__service-card-body">Bespoke applications tailored to your organization's workflows.</p>
            </div>
          </UiReveal>
          <UiReveal :delay="150">
            <div class="skills__service-card">
              <div class="skills__service-card-icon"><UiIcon name="consult" :size="28" :stroke="1.6" /></div>
              <div class="skills__service-card-title">IT Consulting</div>
              <p class="skills__service-card-body">Technology recommendations, project planning, stack guidance.</p>
            </div>
          </UiReveal>
          <UiReveal :delay="200">
            <div class="skills__service-card">
              <div class="skills__service-card-icon"><UiIcon name="wordpress" :size="28" :stroke="1.6" /></div>
              <div class="skills__service-card-title">WordPress Solutions</div>
              <p class="skills__service-card-body">Custom themes, plugins, WooCommerce stores, ongoing maintenance.</p>
            </div>
          </UiReveal>
          <UiReveal :delay="250">
            <div class="skills__service-card">
              <div class="skills__service-card-icon"><UiIcon name="database" :size="28" :stroke="1.6" /></div>
              <div class="skills__service-card-title">Database Development</div>
              <p class="skills__service-card-body">Schema design, optimization, and secure data handling.</p>
            </div>
          </UiReveal>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="stylus">
.skills__title-emphasis
  font-style: italic
  font-weight: 300

.skills__categories
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))
  gap: 16px

.skills__category
  padding: 26px
  border-radius: 24px
  background: var(--surface-container)
  height: 100%

.skills__category-label
  color: var(--on-surface-variant)
  margin-bottom: 20px

.skills__chips
  display: flex
  flex-wrap: wrap
  gap: 6px

.skills__services
  margin-top: 72px

.skills__services-kicker
  color: var(--on-surface-variant)
  margin-bottom: 24px

.skills__services-grid
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 16px

.skills__service-card
  padding: 26px 28px
  border-radius: 24px
  background: var(--surface-container-low)
  border: 1px solid var(--outline-variant)
  height: 100%

.skills__service-card-icon
  color: var(--on-surface)
  margin-bottom: 18px

.skills__service-card-title
  font-family: var(--font-display)
  font-size: 1.15rem
  font-weight: 700
  letter-spacing: -0.015em
  margin-bottom: 10px

.skills__service-card-body
  color: var(--on-surface-variant)
  font-size: 0.95rem
  margin: 0

@media (max-width: 860px)
  .skills__services-grid
    grid-template-columns: repeat(2, 1fr)

@media (max-width: 560px)
  .skills__services-grid
    grid-template-columns: 1fr
</style>
