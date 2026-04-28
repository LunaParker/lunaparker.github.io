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
    :class="['nav', { scrolled }]"
    :style="{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 40,
      padding: scrolled ? '10px 0' : '18px 0',
      transition: 'padding var(--dur-med) var(--spring-gentle), background-color var(--dur-med) var(--spring-gentle), backdrop-filter var(--dur-med)',
      background: scrolled ? 'color-mix(in oklch, var(--surface) 78%, transparent)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(1.3) blur(14px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'saturate(1.3) blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--outline-variant)' : '1px solid transparent',
    }"
  >
    <div class="container" :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }">
      <a
        href="#top"
        :style="{ display: 'inline-flex', alignItems: 'center', gap: '12px' }"
        @click="onNavClick($event, 'top')"
      >
        <span
:style="{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '17px',
          letterSpacing: '-0.02em',
          color: 'var(--on-surface)',
        }">Luna Parker</span>
      </a>

      <nav class="hide-on-mobile" aria-label="Primary">
        <ul :style="{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '4px' }">
          <li v-for="it in items" :key="it.id">
            <a
              :href="`#${it.id}`"
              class="nav-link"
              @click="onNavClick($event, it.id)"
            >
              {{ it.label }}
            </a>
          </li>
        </ul>
      </nav>

      <div :style="{ display: 'flex', alignItems: 'center', gap: '10px' }">
        <a
          href="/Luna_Parker.pdf"
          target="_blank"
          rel="noopener"
          class="btn btn-outlined hide-on-mobile"
          :style="{ padding: '8px 16px', fontSize: '14px', whiteSpace: 'nowrap', flexShrink: 0 }"
        >
          <UiIcon name="download" :size="16" /> Resume
        </a>
        <a
          href="#contact"
          class="btn btn-filled"
          :style="{ padding: '8px 16px', fontSize: '14px', whiteSpace: 'nowrap', flexShrink: 0 }"
          @click="onNavClick($event, 'contact')"
        >
          Get in touch <UiIcon name="arrow" :size="16" />
        </a>
        <button
          class="mobile-menu-toggle"
          aria-label="Menu"
          :style="{
            display: 'none',
            background: 'transparent',
            border: 0,
            padding: '8px',
            cursor: 'pointer',
            color: 'var(--on-surface)',
          }"
          @click="menuOpen = !menuOpen"
        >
          <UiIcon name="menu" :size="22" />
        </button>
      </div>
    </div>

    <div
      v-if="menuOpen"
      :style="{
        position: 'absolute',
        top: '100%',
        left: '16px',
        right: '16px',
        marginTop: '8px',
        background: 'var(--surface-container-high)',
        border: '1px solid var(--outline-variant)',
        borderRadius: '20px',
        padding: '12px',
      }"
    >
      <ul :style="{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '2px' }">
        <li v-for="it in items" :key="it.id">
          <a
            :href="`#${it.id}`"
            :style="{ display: 'block', padding: '12px 14px', borderRadius: '12px', color: 'var(--on-surface)' }"
            @click="onNavClick($event, it.id)"
          >
            {{ it.label }}
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped lang="scss">
.nav-link {
  display: inline-block;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  color: var(--on-surface-variant);
  transition:
    background-color var(--dur-short) var(--spring-gentle),
    color var(--dur-short) var(--spring-gentle);
}
.nav-link:hover {
  background: var(--surface-container-high);
  color: var(--on-surface);
}

@media (max-width: 860px) {
  .mobile-menu-toggle {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
  }
}
</style>
