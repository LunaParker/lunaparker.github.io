<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '~/composables/useData'

const props = withDefaults(defineProps<{
  project: Project
  size?: 'default' | 'big'
}>(), {
  size: 'default',
})

const big = computed(() => props.size === 'big')
</script>

<template>
  <!-- vertical-split — full-bleed brand gradient, rotated wordmark, signature treatment -->
  <div
    v-if="project.treatment === 'vertical-split'"
    class="poster poster--vertical-split"
    :class="{ 'poster--big': big }"
  >
    <div class="poster__vs-fill" />
    <div class="poster__vs-grid" />
    <div class="poster__vs-content">
      <div class="label poster__vs-meta">
        {{ project.year }} · {{ project.client }}
      </div>
      <div class="poster__vs-side-word">ASCEND</div>
      <div>
        <div class="poster__vs-name">{{ project.name }}</div>
        <div class="poster__vs-tagline">{{ project.tagline }}</div>
      </div>
    </div>
  </div>

  <!-- stacked — tonal container with a soft brand-gradient blur in one corner -->
  <div
    v-else-if="project.treatment === 'stacked'"
    class="poster poster--stacked"
    :class="{ 'poster--big': big }"
  >
    <div class="poster__stacked-halo" />
    <div class="poster__stacked-content">
      <div class="label poster__stacked-client">{{ project.client }}</div>
      <div class="poster__stacked-name">
        <div
          v-for="(word, i) in project.name.split(' ')"
          :key="i"
          class="poster__stacked-word"
        >
          {{ word }}
        </div>
      </div>
    </div>
  </div>

  <!-- angle — tonal container with a conic accent sweep, italic title -->
  <div
    v-else-if="project.treatment === 'angle'"
    class="poster poster--angle"
    :class="{ 'poster--big': big }"
  >
    <div class="poster__angle-sweep" />
    <div class="poster__angle-content">
      <div class="label poster__angle-meta">
        {{ project.year }} · {{ project.tagline }}
      </div>
      <div class="poster__angle-name">{{ project.name }}</div>
    </div>
  </div>

  <!-- mono-code — neutral grey surface, hatch pattern, "// <client>" comment header -->
  <div
    v-else-if="project.treatment === 'mono-code'"
    class="poster poster--mono-code"
    :class="{ 'poster--big': big }"
  >
    <div class="poster__mc-grid" />
    <div class="poster__mc-content">
      <div class="mono poster__mc-comment">// {{ project.client }}</div>
      <div class="poster__mc-name">{{ project.name }}</div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
// Shared base — every treatment fills the parent project card.
.poster
  position: absolute
  inset: 0
  overflow: hidden
  border-radius: inherit
  display: flex
  align-items: flex-end

// ── vertical-split ──────────────────────────────────────────
.poster--vertical-split
  background: var(--surface-container-high)

.poster__vs-fill
  position: absolute
  inset: 0
  background: var(--brand-gradient-v)
  opacity: 0.92

.poster__vs-grid
  position: absolute
  inset: 0
  background: repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(255, 255, 255, 0.08) 48px, rgba(255, 255, 255, 0.08) 49px)

.poster__vs-content
  position: relative
  width: 100%
  height: 100%
  padding: 20px
  color: white
  display: flex
  flex-direction: column
  justify-content: space-between

.poster--vertical-split.poster--big .poster__vs-content
  padding: 32px

.poster__vs-meta
  opacity: 0.85
  letter-spacing: 0.1em

.poster__vs-side-word
  position: absolute
  right: 20px
  top: 44px
  bottom: 96px
  font-family: var(--font-display)
  font-weight: 800
  letter-spacing: -0.05em
  line-height: 0.82
  font-size: clamp(1.8rem, 4.5vw, 3.2rem)
  writing-mode: vertical-rl
  text-orientation: mixed
  transform: rotate(180deg)
  opacity: 0.55
  pointer-events: none

.poster--vertical-split.poster--big .poster__vs-side-word
  right: 32px
  top: 64px
  bottom: 140px
  font-size: clamp(3rem, 8vw, 6.5rem)

.poster__vs-name
  font-family: var(--font-display)
  font-weight: 900
  letter-spacing: -0.06em
  line-height: 0.88
  font-size: clamp(3rem, 8vw, 5.6rem)

.poster--vertical-split.poster--big .poster__vs-name
  font-size: clamp(5rem, 13vw, 11rem)

.poster__vs-tagline
  margin-top: 6px
  font-size: 12px
  opacity: 0.9
  max-width: 28ch

.poster--vertical-split.poster--big .poster__vs-tagline
  margin-top: 10px
  font-size: 15px

// ── stacked ────────────────────────────────────────────────
.poster--stacked
  background: var(--tertiary-container)
  color: var(--on-tertiary-container)

.poster__stacked-halo
  position: absolute
  top: -20px
  right: -20px
  width: 60%
  aspect-ratio: 1
  background: var(--brand-gradient-135)
  filter: blur(40px)
  opacity: 0.35

.poster__stacked-content
  position: relative
  width: 100%
  padding: 24px

.poster--stacked.poster--big .poster__stacked-content
  padding: 36px

.poster__stacked-client
  margin-bottom: 18px
  opacity: 0.8

.poster--stacked.poster--big .poster__stacked-client
  margin-bottom: 40px

.poster__stacked-name
  font-family: var(--font-display)
  font-weight: 800
  font-size: clamp(1.8rem, 4vw, 2.8rem)
  letter-spacing: -0.04em
  line-height: 0.9

.poster--stacked.poster--big .poster__stacked-name
  font-size: clamp(2.8rem, 6.5vw, 5.5rem)

.poster__stacked-word
  display: block

// ── angle ──────────────────────────────────────────────────
.poster--angle
  background: var(--secondary-container)
  color: var(--on-secondary-container)

.poster__angle-sweep
  position: absolute
  inset: 0
  background: unquote("conic-gradient(from 220deg at 30% 70%, transparent 0deg, color-mix(in oklch, var(--secondary) 25%, transparent) 90deg, transparent 180deg)")

.poster__angle-content
  position: relative
  width: 100%
  padding: 22px

.poster--angle.poster--big .poster__angle-content
  padding: 36px

.poster__angle-meta
  margin-bottom: 14px
  opacity: 0.75

.poster--angle.poster--big .poster__angle-meta
  margin-bottom: 28px

.poster__angle-name
  font-family: var(--font-display)
  font-weight: 800
  font-size: clamp(1.6rem, 3.5vw, 2.4rem)
  letter-spacing: -0.04em
  line-height: 0.9
  font-style: italic

.poster--angle.poster--big .poster__angle-name
  font-size: clamp(2.6rem, 6vw, 5rem)

// ── mono-code ──────────────────────────────────────────────
.poster--mono-code
  background: var(--surface-container-highest)
  color: var(--on-surface)

.poster__mc-grid
  position: absolute
  inset: 0
  background: repeating-linear-gradient(0deg, transparent, transparent 24px, var(--outline-variant) 24px, var(--outline-variant) 25px)
  opacity: 0.4

.poster__mc-content
  position: relative
  width: 100%
  height: 100%
  padding: 20px
  display: flex
  flex-direction: column
  justify-content: space-between

.poster--mono-code.poster--big .poster__mc-content
  padding: 32px

.poster__mc-comment
  font-size: 11px
  color: var(--on-surface-variant)

.poster--mono-code.poster--big .poster__mc-comment
  font-size: 14px

.poster__mc-name
  font-family: var(--font-display)
  font-weight: 700
  font-size: clamp(1.3rem, 3vw, 2rem)
  letter-spacing: -0.03em
  line-height: 0.95

.poster--mono-code.poster--big .poster__mc-name
  font-size: clamp(2.4rem, 5.5vw, 4.2rem)
</style>
