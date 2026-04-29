<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const scrolled = ref(false)
const menuOpen = ref(false)

const config = useRuntimeConfig()
const writingEnabled = Boolean(config.public.writingEnabled)

const items = computed(() => {
  const base = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'writing', label: 'Writing' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ]
  return writingEnabled ? base : base.filter(i => i.id !== 'writing')
})

const route = useRoute()

const onScroll = () => { scrolled.value = window.scrollY > 40 }

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

async function jump(id: string) {
  if (route.path !== '/') {
    await navigateTo('/')
    setTimeout(() => {
      if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }
  else {
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function onNavClick(e: MouseEvent, id: string) {
  e.preventDefault()
  menuOpen.value = false
  jump(id)
}
</script>

<template>
  <header
    class="nav"
    :class="{ 'nav--scrolled': scrolled }"
  >
    <div class="container nav__container">
      <a
        href="#top"
        class="nav__brand"
        @click="onNavClick($event, 'top')"
      >
        <span class="nav__brand-text">Luna Parker</span>
      </a>

      <nav class="nav__primary hide-on-mobile" aria-label="Primary">
        <ul class="nav__menu">
          <li v-for="it in items" :key="it.id">
            <a
              :href="`#${it.id}`"
              class="nav__link"
              @click="onNavClick($event, it.id)"
            >
              {{ it.label }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="nav__cta-row">
        <a
          href="/Luna_Parker.pdf"
          target="_blank"
          rel="noopener"
          class="btn btn-outlined nav__cta hide-on-mobile"
        >
          <UiIcon name="download" :size="16" /> Resume
        </a>
        <a
          href="#contact"
          class="btn btn-filled nav__cta"
          @click="onNavClick($event, 'contact')"
        >
          Get in touch <UiIcon name="arrow" :size="16" />
        </a>
        <button
          class="nav__mobile-toggle"
          aria-label="Menu"
          @click="menuOpen = !menuOpen"
        >
          <UiIcon name="menu" :size="22" />
        </button>
      </div>
    </div>

    <div v-if="menuOpen" class="nav__mobile-panel">
      <ul class="nav__mobile-menu">
        <li v-for="it in items" :key="it.id">
          <a
            :href="`#${it.id}`"
            class="nav__mobile-link"
            @click="onNavClick($event, it.id)"
          >
            {{ it.label }}
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped lang="stylus">
.nav
  position: fixed
  top: 0
  left: 0
  right: 0
  z-index: 40
  padding: 18px 0
  background: transparent
  backdrop-filter: none
  -webkit-backdrop-filter: none
  border-bottom: 1px solid transparent
  transition: padding var(--dur-med) var(--spring-gentle), background-color var(--dur-med) var(--spring-gentle), backdrop-filter var(--dur-med)

.nav--scrolled
  padding: 10px 0
  background: unquote("color-mix(in oklch, var(--surface) 78%, transparent)")
  backdrop-filter: saturate(1.3) blur(14px)
  -webkit-backdrop-filter: saturate(1.3) blur(14px)
  border-bottom: 1px solid var(--outline-variant)

.nav__container
  display: flex
  align-items: center
  justify-content: space-between
  gap: 24px

.nav__brand
  display: inline-flex
  align-items: center
  gap: 12px

.nav__brand-text
  font-family: var(--font-display)
  font-weight: 800
  font-size: 17px
  letter-spacing: -0.02em
  color: var(--on-surface)

.nav__menu
  list-style: none
  padding: 0
  margin: 0
  display: flex
  gap: 4px

.nav__link
  display: inline-block
  padding: 8px 14px
  border-radius: 999px
  font-size: 14px
  font-weight: 500
  color: var(--on-surface-variant)
  transition: background-color var(--dur-short) var(--spring-gentle), color var(--dur-short) var(--spring-gentle)

.nav__link:hover
  background: var(--surface-container-high)
  color: var(--on-surface)

.nav__cta-row
  display: flex
  align-items: center
  gap: 10px

.nav__cta
  padding: 8px 16px
  font-size: 14px
  white-space: nowrap
  flex-shrink: 0

.nav__mobile-toggle
  display: none
  background: transparent
  border: 0
  padding: 8px
  cursor: pointer
  color: var(--on-surface)

.nav__mobile-panel
  position: absolute
  top: 100%
  left: 16px
  right: 16px
  margin-top: 8px
  background: var(--surface-container-high)
  border: 1px solid var(--outline-variant)
  border-radius: 20px
  padding: 12px

.nav__mobile-menu
  list-style: none
  padding: 0
  margin: 0
  display: grid
  gap: 2px

.nav__mobile-link
  display: block
  padding: 12px 14px
  border-radius: 12px
  color: var(--on-surface)

@media (max-width: 860px)
  .nav__mobile-toggle
    display: inline-flex
    align-items: center
    justify-content: center
</style>
