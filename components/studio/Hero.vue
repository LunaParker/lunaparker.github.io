<script setup lang="ts">
function jump(e: MouseEvent, id: string) {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section id="top" class="studio-hero">
    <!-- .stagger, not UiReveal: above-fold content must paint before hydration -->
    <div class="container studio-hero__content stagger">
      <div class="mono studio-hero__kicker">Shy Owl Studios · Ontario, Canada</div>
      <h1 class="studio-hero__title">We help organizations succeed on the web.</h1>
      <p class="studio-hero__sub">
        Tailored design and engineering for organizations that need their software to last. Patient, perceptive, occasionally a little wise.
      </p>
      <div class="studio-hero__cta-row">
        <a href="#contact" class="btn btn-gradient" @click="jump($event, 'contact')">Start a project <UiIcon name="arrow" :size="16" /></a>
        <a href="#projects" class="btn btn-outlined" @click="jump($event, 'projects')">See our work</a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="stylus">
.studio-hero
  position: relative
  min-height: unquote("min(720px, 92vh)")
  display: flex
  align-items: center
  overflow: hidden
  border-bottom: 1px solid var(--outline-variant)
  background-image: linear-gradient(95deg, var(--surface) 0%, unquote("color-mix(in oklch, var(--surface) 90%, transparent)") 42%, unquote("color-mix(in oklch, var(--surface) 62%, transparent)") 70%, unquote("color-mix(in oklch, var(--surface) 25%, transparent)") 100%), linear-gradient(180deg, unquote("color-mix(in oklch, var(--surface) 35%, transparent)") 0%, unquote("color-mix(in oklch, var(--surface) 72%, transparent)") 100%), url("/images/shy-owl/hero_owl.jpg")
  background-size: cover, cover, cover
  background-position: center, center, center 30%

@media (max-width: 1000px)
  .studio-hero
    background-image: linear-gradient(95deg, var(--surface) 0%, unquote("color-mix(in oklch, var(--surface) 94%, transparent)") 55%, unquote("color-mix(in oklch, var(--surface) 80%, transparent)") 80%, unquote("color-mix(in oklch, var(--surface) 55%, transparent)") 100%), linear-gradient(180deg, unquote("color-mix(in oklch, var(--surface) 45%, transparent)") 0%, unquote("color-mix(in oklch, var(--surface) 80%, transparent)") 100%), url("/images/shy-owl/hero_owl.jpg")

.studio-hero__content
  position: relative
  z-index: 2
  padding-top: 8rem
  padding-bottom: 6rem

.studio-hero__kicker
  color: var(--on-surface-variant)
  margin-bottom: 1.25rem
  font-size: 0.78rem
  letter-spacing: 0.12em
  text-transform: uppercase

.studio-hero__title
  font-family: var(--font-display)
  font-weight: 700
  font-size: unquote("clamp(2.4rem, 7vw, 5.2rem)")
  line-height: 1.02
  letter-spacing: -0.03em
  margin: 0
  max-width: 980px
  color: var(--on-surface)

.studio-hero__sub
  margin-top: 1.75rem
  max-width: 600px
  font-size: 1.15rem
  color: var(--on-surface-variant)
  line-height: 1.6

.studio-hero__cta-row
  display: flex
  gap: 12px
  margin-top: 2.25rem
  flex-wrap: wrap
</style>
