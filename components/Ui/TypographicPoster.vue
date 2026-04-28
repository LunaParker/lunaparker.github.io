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

type Treatment = { kind: 'vertical-split' | 'stacked' | 'angle' | 'mono-code', fg: string }

const treatments: Record<string, Treatment> = {
  'eyolf': { kind: 'vertical-split', fg: 'primary' },
  'jarvis-ryan': { kind: 'stacked', fg: 'tertiary' },
  'blsc': { kind: 'angle', fg: 'secondary' },
  'brightspace-mcp': { kind: 'mono-code', fg: 'tertiary' },
  'swift-weather': { kind: 'mono-code', fg: 'primary' },
}

const tx = computed<Treatment>(() => treatments[props.project.id] ?? { kind: 'stacked', fg: props.project.accent })

const wrapStyle = computed(() => ({
  position: 'absolute' as const,
  inset: 0,
  overflow: 'hidden' as const,
  borderRadius: 'inherit',
  display: 'flex',
  alignItems: 'flex-end',
  padding: big.value ? '32px' : '20px',
}))
</script>

<template>
  <!-- vertical-split -->
  <div v-if="tx.kind === 'vertical-split'" :style="{ ...wrapStyle, padding: '0', background: 'var(--surface-container-high)' }">
    <div :style="{ position: 'absolute', inset: 0, background: 'var(--brand-gradient-v)', opacity: 0.92 }" />
    <div
:style="{
      position: 'absolute',
      inset: 0,
      background: 'repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(255,255,255,0.08) 48px, rgba(255,255,255,0.08) 49px)',
    }" />
    <div :style="{ position: 'relative', color: 'white', padding: big ? '32px' : '20px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }">
      <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }">
        <div class="label" :style="{ opacity: 0.85, letterSpacing: '0.1em' }">{{ project.year }} · {{ project.client }}</div>
      </div>
      <div
:style="{
        position: 'absolute',
        right: big ? '32px' : '20px',
        top: big ? '64px' : '44px',
        bottom: big ? '140px' : '96px',
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        letterSpacing: '-0.05em',
        lineHeight: 0.82,
        fontSize: big ? 'clamp(3rem, 8vw, 6.5rem)' : 'clamp(1.8rem, 4.5vw, 3.2rem)',
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        transform: 'rotate(180deg)',
        opacity: 0.55,
        pointerEvents: 'none',
      }">ASCEND</div>
      <div>
        <div
:style="{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          letterSpacing: '-0.06em',
          lineHeight: 0.88,
          fontSize: big ? 'clamp(5rem, 13vw, 11rem)' : 'clamp(3rem, 8vw, 5.6rem)',
        }">{{ project.name }}</div>
        <div
:style="{
          marginTop: big ? '10px' : '6px',
          fontSize: big ? '15px' : '12px',
          opacity: 0.9,
          maxWidth: '28ch',
        }">{{ project.tagline }}</div>
      </div>
    </div>
  </div>

  <!-- stacked -->
  <div v-else-if="tx.kind === 'stacked'" :style="{ ...wrapStyle, background: 'var(--tertiary-container)', color: 'var(--on-tertiary-container)', padding: '0' }">
    <div
:style="{
      position: 'absolute',
      top: '-20px',
      right: '-20px',
      width: '60%',
      aspectRatio: '1',
      background: 'var(--brand-gradient-135)',
      filter: 'blur(40px)',
      opacity: 0.35,
    }" />
    <div :style="{ position: 'relative', padding: big ? '36px' : '24px', width: '100%' }">
      <div class="label" :style="{ marginBottom: big ? '40px' : '18px', opacity: 0.8 }">{{ project.client }}</div>
      <div
:style="{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: big ? 'clamp(2.8rem, 6.5vw, 5.5rem)' : 'clamp(1.8rem, 4vw, 2.8rem)',
        letterSpacing: '-0.04em',
        lineHeight: 0.9,
      }">
        <div v-for="(word, i) in project.name.split(' ')" :key="i" :style="{ display: 'block' }">{{ word }}</div>
      </div>
    </div>
  </div>

  <!-- angle -->
  <div v-else-if="tx.kind === 'angle'" :style="{ ...wrapStyle, background: 'var(--secondary-container)', color: 'var(--on-secondary-container)', padding: '0' }">
    <div
:style="{
      position: 'absolute',
      inset: 0,
      background: 'conic-gradient(from 220deg at 30% 70%, transparent 0deg, color-mix(in oklch, var(--secondary) 25%, transparent) 90deg, transparent 180deg)',
    }" />
    <div :style="{ position: 'relative', padding: big ? '36px' : '22px', width: '100%' }">
      <div class="label" :style="{ marginBottom: big ? '28px' : '14px', opacity: 0.75 }">{{ project.year }} · {{ project.tagline }}</div>
      <div
:style="{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: big ? 'clamp(2.6rem, 6vw, 5rem)' : 'clamp(1.6rem, 3.5vw, 2.4rem)',
        letterSpacing: '-0.04em',
        lineHeight: 0.9,
        fontStyle: 'italic',
      }">{{ project.name }}</div>
    </div>
  </div>

  <!-- mono-code -->
  <div v-else-if="tx.kind === 'mono-code'" :style="{ ...wrapStyle, background: 'var(--surface-container-highest)', color: 'var(--on-surface)', padding: '0' }">
    <div
:style="{
      position: 'absolute',
      inset: 0,
      background: 'repeating-linear-gradient(0deg, transparent, transparent 24px, var(--outline-variant) 24px, var(--outline-variant) 25px)',
      opacity: 0.4,
    }" />
    <div :style="{ position: 'relative', padding: big ? '32px' : '20px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }">
      <div :style="{ fontFamily: 'var(--font-mono)', fontSize: big ? '14px' : '11px', color: 'var(--on-surface-variant)' }">
        <div>$ npx {{ project.id }}@latest</div>
        <div :style="{ marginTop: '6px', opacity: 0.6 }">// {{ project.client }}</div>
      </div>
      <div
:style="{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: big ? 'clamp(2.4rem, 5.5vw, 4.2rem)' : 'clamp(1.3rem, 3vw, 2rem)',
        letterSpacing: '-0.03em',
        lineHeight: 0.95,
      }">
        <span>{{ project.name }}</span>
      </div>
    </div>
  </div>
</template>
