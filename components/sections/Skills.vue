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
  <section id="skills" class="section">
    <div class="container">
      <UiSectionHeader
        kicker="05 — Skills"
        sub="Languages, frameworks, tools, and practices I use in production. Hover any tech to see where I've used it."
      >
        <template #title>
          The <span :style="{ fontStyle: 'italic', fontWeight: 300 }">toolkit.</span>
        </template>
      </UiSectionHeader>

      <div :style="{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }">
        <UiReveal
          v-for="([cat, items], i) in cats"
          :key="cat"
          :delay="i * 60"
        >
          <div :style="{ padding: '26px', borderRadius: '24px', background: 'var(--surface-container)', height: '100%' }">
            <div class="label" :style="{ color: 'var(--on-surface-variant)', marginBottom: '20px' }">{{ cat }}</div>
            <div :style="{ display: 'flex', flexWrap: 'wrap', gap: '6px' }">
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

      <div :style="{ marginTop: '72px' }">
        <div class="label section-kicker" :style="{ color: 'var(--on-surface-variant)', marginBottom: '24px' }">
          <span>Services · through Shy Owl Studios</span>
        </div>
        <div class="services-grid" :style="{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }">
          <UiReveal :delay="0">
            <div class="service-card">
              <div class="service-card__icon"><UiIcon name="webDesign" :size="28" :stroke="1.6" /></div>
              <div class="service-card__title">Web Design</div>
              <p class="service-card__body">User-centred design that aligns with your brand and business goals.</p>
            </div>
          </UiReveal>
          <UiReveal :delay="50">
            <div class="service-card">
              <div class="service-card__icon"><UiIcon name="webDev" :size="28" :stroke="1.6" /></div>
              <div class="service-card__title">Web Development</div>
              <p class="service-card__body">Full-stack using Laravel, WordPress, Vue.js, and more.</p>
            </div>
          </UiReveal>
          <UiReveal :delay="100">
            <div class="service-card">
              <div class="service-card__icon"><UiIcon name="custom" :size="28" :stroke="1.6" /></div>
              <div class="service-card__title">Custom Software</div>
              <p class="service-card__body">Bespoke applications tailored to your organization's workflows.</p>
            </div>
          </UiReveal>
          <UiReveal :delay="150">
            <div class="service-card">
              <div class="service-card__icon"><UiIcon name="consult" :size="28" :stroke="1.6" /></div>
              <div class="service-card__title">IT Consulting</div>
              <p class="service-card__body">Technology recommendations, project planning, stack guidance.</p>
            </div>
          </UiReveal>
          <UiReveal :delay="200">
            <div class="service-card">
              <div class="service-card__icon"><UiIcon name="wordpress" :size="28" :stroke="1.6" /></div>
              <div class="service-card__title">WordPress Solutions</div>
              <p class="service-card__body">Custom themes, plugins, WooCommerce stores, ongoing maintenance.</p>
            </div>
          </UiReveal>
          <UiReveal :delay="250">
            <div class="service-card">
              <div class="service-card__icon"><UiIcon name="database" :size="28" :stroke="1.6" /></div>
              <div class="service-card__title">Database Development</div>
              <p class="service-card__body">Schema design, optimization, and secure data handling.</p>
            </div>
          </UiReveal>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.service-card {
  padding: 26px 28px;
  border-radius: 24px;
  background: var(--surface-container-low);
  border: 1px solid var(--outline-variant);
  height: 100%;
}
.service-card__icon {
  color: var(--on-surface);
  margin-bottom: 18px;
}
.service-card__title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  margin-bottom: 10px;
}
.service-card__body {
  color: var(--on-surface-variant);
  font-size: 0.95rem;
  margin: 0;
}

@media (max-width: 860px) {
  .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
}
@media (max-width: 560px) {
  .services-grid { grid-template-columns: 1fr !important; }
}
</style>
