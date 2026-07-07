<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const scrolled = ref(false)

const links = [
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
]

const onScroll = () => { scrolled.value = window.scrollY > 12 }

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

function jump(e: MouseEvent, id: string) {
  e.preventDefault()
  if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
  else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <header class="studio-nav" :class="{ 'studio-nav--scrolled': scrolled }">
    <div class="container studio-nav__container">
      <a
        href="#top"
        class="studio-nav__brand"
        aria-label="Shy Owl Studios — top"
        @click="jump($event, 'top')"
      >Shy Owl Studios</a>

      <nav class="studio-nav__links" aria-label="Page sections">
        <a
          v-for="l in links"
          :key="l.id"
          :href="`#${l.id}`"
          class="studio-nav__link"
          @click="jump($event, l.id)"
        >{{ l.label }}</a>
        <a
          href="#contact"
          class="btn btn-gradient studio-nav__cta"
          @click="jump($event, 'contact')"
        >Start a project</a>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="stylus">
.studio-nav
  position: sticky
  top: 0
  z-index: 50
  background: transparent
  backdrop-filter: none
  -webkit-backdrop-filter: none
  border-bottom: 1px solid transparent
  transition: background-color var(--dur-short) var(--spring-gentle), border-color var(--dur-short) var(--spring-gentle), backdrop-filter var(--dur-short)

.studio-nav--scrolled
  background: unquote("color-mix(in oklch, var(--surface) 86%, transparent)")
  backdrop-filter: saturate(1.1) blur(14px)
  -webkit-backdrop-filter: saturate(1.1) blur(14px)
  border-bottom: 1px solid var(--outline-variant)

.studio-nav__container
  display: flex
  align-items: center
  justify-content: space-between
  padding-top: 1.1rem
  padding-bottom: 1.1rem

.studio-nav__brand
  font-family: var(--font-display)
  font-weight: 700
  letter-spacing: -0.01em
  font-size: 1.05rem
  color: var(--on-surface)
  text-decoration: none

.studio-nav__links
  display: flex
  align-items: center
  gap: 4px

.studio-nav__link
  color: var(--on-surface-variant)
  padding: 8px 14px
  font-size: 0.93rem
  font-weight: 500
  border-radius: var(--shape-full)
  text-decoration: none
  transition: color var(--dur-short), background-color var(--dur-short)

.studio-nav__link:hover
  color: var(--on-surface)
  background: var(--surface-container)

.studio-nav__cta
  margin-left: 8px
  padding: 0.55rem 1.05rem
  font-size: 0.9rem

@media (max-width: 720px)
  .studio-nav__link
    display: none
</style>
