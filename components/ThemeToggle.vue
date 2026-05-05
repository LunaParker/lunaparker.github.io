<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { type ThemePreference, useTheme } from '~/composables/useTheme'

const { preference, resolved, setPreference } = useTheme()

const open = ref(false)
const buttonEl = ref<HTMLElement | null>(null)
const menuEl = ref<HTMLElement | null>(null)
const itemRefs = ref<HTMLElement[]>([])

type Option = {
  value: ThemePreference
  label: string
  description: string
  icon: 'monitor' | 'sun' | 'moon'
}

const options: Option[] = [
  { value: 'system', label: 'Device default', description: 'Match your system', icon: 'monitor' },
  { value: 'light', label: 'Light', description: 'Bright surfaces', icon: 'sun' },
  { value: 'dark', label: 'Dark', description: 'Dim surfaces', icon: 'moon' },
]

const currentLabel = computed(() => options.find(o => o.value === preference.value)?.label ?? 'Theme')

function setItemRef(el: Element | null, index: number) {
  if (el instanceof HTMLElement) itemRefs.value[index] = el
}

async function toggle() {
  open.value = !open.value
  if (open.value) {
    await nextTick()
    const idx = options.findIndex(o => o.value === preference.value)
    itemRefs.value[idx >= 0 ? idx : 0]?.focus()
  }
}

function close(returnFocus = true) {
  if (!open.value) return
  open.value = false
  if (returnFocus) buttonEl.value?.focus()
}

function choose(value: ThemePreference) {
  setPreference(value)
  close()
}

function onKeydown(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }
  if (e.key === 'Tab') {
    close(false)
    return
  }
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    const items = itemRefs.value
    const active = document.activeElement as HTMLElement | null
    const currentIdx = items.indexOf(active as HTMLElement)
    const dir = e.key === 'ArrowDown' ? 1 : -1
    const next = (currentIdx + dir + items.length) % items.length
    items[next]?.focus()
  }
  if (e.key === 'Home') {
    e.preventDefault()
    itemRefs.value[0]?.focus()
  }
  if (e.key === 'End') {
    e.preventDefault()
    itemRefs.value[itemRefs.value.length - 1]?.focus()
  }
}

function onDocumentClick(e: MouseEvent) {
  if (!open.value) return
  const target = e.target as Node
  if (menuEl.value?.contains(target) || buttonEl.value?.contains(target)) return
  close(false)
}

watch(open, (v) => {
  if (v) {
    document.addEventListener('mousedown', onDocumentClick, true)
    document.addEventListener('keydown', onKeydown, true)
  }
  else {
    document.removeEventListener('mousedown', onDocumentClick, true)
    document.removeEventListener('keydown', onKeydown, true)
    itemRefs.value = []
  }
})

onMounted(() => {
  // Sync data-theme on mount in case preference came from useState (SPA nav, etc).
  // The plugin already handles initial localStorage read; this guards against drift.
  if (preference.value === 'light' || preference.value === 'dark') {
    document.documentElement.setAttribute('data-theme', preference.value)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocumentClick, true)
  document.removeEventListener('keydown', onKeydown, true)
})
</script>

<template>
  <div class="theme-toggle">
    <button
      ref="buttonEl"
      type="button"
      class="theme-toggle__btn"
      :class="{ 'theme-toggle__btn--open': open }"
      :aria-label="`Theme: ${currentLabel}. Click to change.`"
      :aria-expanded="open"
      aria-haspopup="menu"
      @click="toggle"
    >
      <Transition name="theme-icon" mode="out-in">
        <UiIcon
          v-if="resolved === 'dark'"
          key="moon"
          name="moon"
          :size="18"
        />
        <UiIcon
          v-else
          key="sun"
          name="sun"
          :size="18"
        />
      </Transition>
    </button>

    <Transition name="theme-menu">
      <div
        v-if="open"
        ref="menuEl"
        class="theme-menu"
        role="menu"
        aria-label="Theme"
      >
        <div class="theme-menu__label">
          Appearance
        </div>
        <button
          v-for="(opt, i) in options"
          :key="opt.value"
          :ref="el => setItemRef(el as Element | null, i)"
          type="button"
          role="menuitemradio"
          :aria-checked="preference === opt.value"
          class="theme-menu__item"
          :class="{ 'theme-menu__item--selected': preference === opt.value }"
          @click="choose(opt.value)"
        >
          <span class="theme-menu__leading">
            <UiIcon :name="opt.icon" :size="18" />
          </span>
          <span class="theme-menu__text">
            <span class="theme-menu__title">{{ opt.label }}</span>
            <span class="theme-menu__desc">{{ opt.description }}</span>
          </span>
          <span class="theme-menu__trailing" aria-hidden="true">
            <UiIcon
              v-if="preference === opt.value"
              name="check"
              :size="18"
            />
          </span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="stylus">
.theme-toggle
  position: relative
  display: inline-flex
  align-items: center

.theme-toggle__btn
  display: inline-flex
  align-items: center
  justify-content: center
  width: 40px
  height: 40px
  padding: 0
  border: 0
  background: transparent
  border-radius: var(--shape-full)
  color: var(--on-surface)
  cursor: pointer
  position: relative
  transition: background-color var(--dur-short) var(--spring-gentle), color var(--dur-short) var(--spring-gentle), transform var(--dur-short) var(--spring-fast)

.theme-toggle__btn::before
  content: ''
  position: absolute
  inset: 0
  border-radius: inherit
  background: var(--surface-container-high)
  opacity: 0
  transition: opacity var(--dur-short) var(--spring-gentle)
  pointer-events: none

.theme-toggle__btn:hover::before
  opacity: 1

.theme-toggle__btn:active
  transform: scale(0.94)

.theme-toggle__btn--open::before
  opacity: 1
  background: var(--secondary-container)

.theme-toggle__btn--open
  color: var(--on-secondary-container)

.theme-toggle__btn :deep(svg)
  position: relative
  z-index: 1

.theme-menu
  position: absolute
  top: calc(100% + 10px)
  right: 0
  z-index: 50
  min-width: 240px
  padding: 8px
  background: var(--surface-container-high)
  border: 1px solid var(--outline-variant)
  border-radius: 24px
  box-shadow: 0 1px 2px unquote("color-mix(in oklch, var(--on-surface) 8%, transparent)"), 0 12px 32px -10px unquote("color-mix(in oklch, var(--on-surface) 22%, transparent)")
  transform-origin: top right
  display: flex
  flex-direction: column
  gap: 2px

.theme-menu__label
  padding: 8px 14px 4px
  font-family: var(--font-mono)
  font-size: 11px
  font-weight: 500
  letter-spacing: 0.1em
  text-transform: uppercase
  color: var(--on-surface-variant)

.theme-menu__item
  display: grid
  grid-template-columns: auto 1fr auto
  align-items: center
  gap: 14px
  width: 100%
  padding: 10px 14px
  border: 0
  background: transparent
  color: var(--on-surface)
  border-radius: 16px
  text-align: left
  cursor: pointer
  font-family: inherit
  position: relative
  isolation: isolate
  transition: background-color var(--dur-short) var(--spring-gentle), color var(--dur-short) var(--spring-gentle), transform var(--dur-short) var(--spring-fast)

.theme-menu__item::before
  content: ''
  position: absolute
  inset: 0
  border-radius: inherit
  background: var(--on-surface)
  opacity: 0
  z-index: -1
  transition: opacity var(--dur-short) var(--spring-gentle)

.theme-menu__item:hover::before
  opacity: 0.06

.theme-menu__item:focus-visible
  outline: none

.theme-menu__item:focus-visible::before
  opacity: 0.10

.theme-menu__item:active
  transform: scale(0.985)

.theme-menu__item--selected
  background: var(--secondary-container)
  color: var(--on-secondary-container)

.theme-menu__item--selected::before
  display: none

.theme-menu__item--selected:hover
  background: unquote("color-mix(in oklch, var(--secondary-container) 88%, var(--on-secondary-container))")

.theme-menu__leading
  display: inline-flex
  align-items: center
  justify-content: center
  width: 28px
  height: 28px
  border-radius: var(--shape-full)
  background: unquote("color-mix(in oklch, var(--on-surface) 6%, transparent)")
  color: inherit
  flex-shrink: 0

.theme-menu__item--selected .theme-menu__leading
  background: unquote("color-mix(in oklch, var(--on-secondary-container) 16%, transparent)")

.theme-menu__text
  display: flex
  flex-direction: column
  min-width: 0
  line-height: 1.25

.theme-menu__title
  font-size: 14px
  font-weight: 600
  letter-spacing: -0.005em

.theme-menu__desc
  font-size: 11.5px
  color: var(--on-surface-variant)
  margin-top: 2px

.theme-menu__item--selected .theme-menu__desc
  color: unquote("color-mix(in oklch, var(--on-secondary-container) 78%, transparent)")

.theme-menu__trailing
  display: inline-flex
  align-items: center
  justify-content: center
  width: 18px
  height: 18px
  flex-shrink: 0
  color: inherit

// Menu open/close — M3 Expressive scale + fade
.theme-menu-enter-active
  transition: opacity var(--dur-short) var(--spring-gentle), transform var(--dur-med) var(--spring-fast)

.theme-menu-leave-active
  transition: opacity calc(var(--dur-short) * 0.7) var(--spring-gentle), transform calc(var(--dur-short) * 0.7) var(--spring-gentle)

.theme-menu-enter-from
  opacity: 0
  transform: scale(0.92) translateY(-6px)

.theme-menu-leave-to
  opacity: 0
  transform: scale(0.97) translateY(-2px)

// Sun/moon icon swap
.theme-icon-enter-active
  transition: opacity var(--dur-short) var(--spring-gentle), transform var(--dur-med) var(--spring-fast)

.theme-icon-leave-active
  transition: opacity calc(var(--dur-short) * 0.6) var(--spring-gentle), transform calc(var(--dur-short) * 0.6) var(--spring-gentle)

.theme-icon-enter-from
  opacity: 0
  transform: rotate(-40deg) scale(0.6)

.theme-icon-leave-to
  opacity: 0
  transform: rotate(40deg) scale(0.6)

@media (max-width: 480px)
  .theme-menu
    right: -8px
    min-width: 220px
</style>
