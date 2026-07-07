<script setup lang="ts">
const SERVICES = [
  { title: 'Web Design', body: 'User-centred design that aligns with your brand and business goals.', icon: 'webDesign' },
  { title: 'Web Development', body: 'Full-stack using Laravel, WordPress, Vue.js, and more.', icon: 'webDev' },
  { title: 'Custom Software', body: 'Bespoke applications tailored to your organization\'s workflows.', icon: 'custom' },
  { title: 'WordPress Solutions', body: 'Custom themes, plugins, WooCommerce stores, ongoing maintenance.', icon: 'wordpress' },
  { title: 'Accessibility & AODA', body: 'Audits and builds that meet AODA/WCAG standards: usable by everyone, compliant with Ontario law.', icon: 'a11y' },
  { title: 'Security & Data Protection', body: 'Secure portals, authentication, and privacy-grade file handling for sensitive client data.', icon: 'shield' },
  { title: 'IT Consulting', body: 'Technology recommendations, project planning, stack guidance.', icon: 'consult' },
  { title: 'Database Development', body: 'Schema design, optimization, and secure data handling.', icon: 'database' },
] as const
</script>

<template>
  <section id="services" class="section studio-services">
    <div class="container">
      <UiSectionHeader
        kicker="What we do"
        sub="From a one-page site to a full custom application, we handle the design, the build, and the operational tools your team relies on."
      >
        <template #title>
          Eight ways we partner with you.
        </template>
      </UiSectionHeader>

      <div class="studio-services__grid">
        <UiReveal
          v-for="(s, i) in SERVICES"
          :key="s.title"
          :delay="i * 60"
          class="studio-services__cell"
        >
          <article class="studio-services__card">
            <div class="studio-services__card-icon">
              <UiIcon :name="s.icon" :size="22" />
            </div>
            <h3 class="studio-services__card-title">{{ s.title }}</h3>
            <p class="studio-services__card-body">{{ s.body }}</p>
          </article>
        </UiReveal>
      </div>
    </div>
  </section>
</template>

<style scoped lang="stylus">
.studio-services__grid
  display: grid
  grid-template-columns: repeat(4, 1fr)
  gap: 16px
  margin-top: 3rem

.studio-services__cell
  height: 100%

.studio-services__card
  padding: 1.75rem 1.6rem
  background: var(--surface-container)
  border: 1px solid var(--outline-variant)
  border-radius: 24px
  height: 100%
  display: flex
  flex-direction: column
  gap: 1rem
  transition: transform var(--dur-short) var(--spring-fast), border-color var(--dur-short)

.studio-services__card:hover
  transform: translateY(-3px)
  border-color: var(--primary)

.studio-services__card-icon
  width: 44px
  height: 44px
  border-radius: 14px
  background: var(--primary-container)
  color: var(--on-primary-container)
  display: grid
  place-items: center

.studio-services__card-title
  font-family: var(--font-display)
  font-size: 1.25rem
  font-weight: 600
  letter-spacing: -0.015em
  margin: 0

.studio-services__card-body
  color: var(--on-surface-variant)
  line-height: 1.55
  margin: 0

@media (max-width: 1100px)
  .studio-services__grid
    grid-template-columns: repeat(2, 1fr)

@media (max-width: 560px)
  .studio-services__grid
    grid-template-columns: 1fr
</style>
