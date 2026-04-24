<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Project } from '~/composables/useData'

const props = defineProps<{ project: Project }>()

const sizes: Record<string, { gridColumn: string, gridRow: string }> = {
  featured: { gridColumn: 'span 6', gridRow: 'span 2' },
  wide: { gridColumn: 'span 4', gridRow: 'span 1' },
  tall: { gridColumn: 'span 2', gridRow: 'span 2' },
  square: { gridColumn: 'span 2', gridRow: 'span 1' },
}
const s = computed(() => sizes[props.project.size] ?? sizes.square)

const hovered = ref(false)

const isGithub = computed(() => /github\.com/i.test(props.project.url))
const displayUrl = computed(() => props.project.url.replace(/^https?:\/\//, ''))
const iconName = computed<'github' | 'arrowUpRight'>(() => (isGithub.value ? 'github' : 'arrowUpRight'))
const posterSize = computed<'big' | 'default'>(() => (props.project.size === 'featured' ? 'big' : 'default'))
</script>

<template>
  <a
    :href="`https://${project.url}`"
    target="_blank"
    rel="noreferrer"
    :aria-label="`Open ${project.name} — ${displayUrl} (opens in new tab)`"
    class="project-card"
    :style="{
      ...s,
      position: 'relative',
      borderRadius: '28px',
      overflow: 'hidden',
      display: 'block',
      background: 'var(--surface-container)',
      border: '1px solid var(--outline-variant)',
      transition: 'transform var(--dur-med) var(--spring-fast), border-color var(--dur-short) var(--spring-gentle)',
    }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <UiTypographicPoster :project="project" :size="posterSize" />

    <div
      :style="{
        position: 'absolute',
        left: '12px',
        right: '12px',
        bottom: '12px',
        zIndex: 3,
        padding: '16px',
        borderRadius: '20px',
        background: 'color-mix(in oklch, #000 72%, transparent)',
        color: 'white',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity var(--dur-short) var(--spring-gentle), transform var(--dur-short) var(--spring-gentle)',
        pointerEvents: 'none',
      }"
    >
      <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '14px' }">
        <div :style="{ minWidth: 0, flex: 1 }">
          <div :style="{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '6px' }">
            {{ project.tagline }}
          </div>
          <div class="mono" :style="{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px' }">
            <span :style="{ opacity: 0.7 }">{{ isGithub ? 'View on GitHub' : 'Visit site' }}</span>
            <span :style="{ opacity: 0.4 }">·</span>
            <span :style="{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }">{{ displayUrl }}</span>
          </div>
        </div>
        <div
:style="{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'white',
          color: '#000',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
        }">
          <UiIcon :name="iconName" :size="16" :stroke="2" />
        </div>
      </div>
    </div>

    <div
:style="{
      position: 'absolute',
      bottom: '16px',
      right: '16px',
      zIndex: 2,
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'color-mix(in oklch, #000 55%, transparent)',
      color: 'white',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      display: 'grid',
      placeItems: 'center',
      opacity: hovered ? 0 : 1,
      transition: 'opacity var(--dur-short) var(--spring-gentle)',
    }">
      <UiIcon :name="iconName" :size="16" :stroke="2" />
    </div>
  </a>
</template>

<style scoped lang="scss">
.project-card:hover {
  transform: translateY(-6px);
  border-color: var(--primary) !important;
}
</style>
