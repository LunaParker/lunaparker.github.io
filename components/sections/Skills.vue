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

const services = [
  { title: 'Web Design', body: 'User-centred design that aligns with your brand and business goals.', icon: 'webDesign' },
  { title: 'Web Development', body: 'Full-stack using Laravel, WordPress, Vue.js, and more.', icon: 'webDev' },
  { title: 'Custom Software', body: "Bespoke applications tailored to your organization's workflows.", icon: 'custom' },
  { title: 'IT Consulting', body: 'Technology recommendations, project planning, stack guidance.', icon: 'consult' },
  { title: 'WordPress Solutions', body: 'Custom themes, plugins, WooCommerce stores, ongoing maintenance.', icon: 'wordpress' },
  { title: 'Database Development', body: 'Schema design, optimization, and secure data handling.', icon: 'database' },
]
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
          <UiReveal
            v-for="(svc, i) in services"
            :key="svc.title"
            :delay="i * 50"
          >
            <div
:style="{
              padding: '26px 28px',
              borderRadius: '24px',
              background: 'var(--surface-container-low)',
              border: '1px solid var(--outline-variant)',
              height: '100%',
            }">
              <div :style="{ color: 'var(--on-surface)', marginBottom: '18px' }">
                <UiIcon :name="(svc.icon as any)" :size="28" :stroke="1.6" />
              </div>
              <div :style="{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.015em', marginBottom: '10px' }">
                {{ svc.title }}
              </div>
              <p :style="{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', margin: 0 }">{{ svc.body }}</p>
            </div>
          </UiReveal>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@media (max-width: 860px) {
  .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
}
@media (max-width: 560px) {
  .services-grid { grid-template-columns: 1fr !important; }
}
</style>
