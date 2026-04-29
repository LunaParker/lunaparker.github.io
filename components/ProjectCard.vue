<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '~/composables/useData'

const props = defineProps<{ project: Project }>()

const isGithub = computed(() => /github\.com/i.test(props.project.url))
const displayUrl = computed(() => props.project.url.replace(/^https?:\/\//, ''))
const iconName = computed<'github' | 'arrowUpRight'>(() => (isGithub.value ? 'github' : 'arrowUpRight'))
const posterSize = computed<'big' | 'default'>(() => (props.project.size === 'featured' ? 'big' : 'default'))
const sizeClass = computed(() => `project-card--${props.project.size ?? 'square'}`)
</script>

<template>
  <a
    :href="`https://${project.url}`"
    target="_blank"
    rel="noreferrer"
    :aria-label="`Open ${project.name} — ${displayUrl} (opens in new tab)`"
    :class="['project-card', sizeClass]"
  >
    <UiTypographicPoster :project="project" :size="posterSize" />

    <div class="project-card__overlay">
      <div class="project-card__overlay-row">
        <div class="project-card__overlay-text">
          <div class="project-card__overlay-tagline">
            {{ project.tagline }}
          </div>
          <div class="mono project-card__overlay-meta">
            <span class="project-card__overlay-meta-label">{{ isGithub ? 'View on GitHub' : 'Visit site' }}</span>
            <span class="project-card__overlay-meta-divider">·</span>
            <span class="project-card__overlay-meta-url">{{ displayUrl }}</span>
          </div>
        </div>
        <div class="project-card__overlay-cta">
          <UiIcon :name="iconName" :size="16" :stroke="2" />
        </div>
      </div>
    </div>

    <div class="project-card__icon-bubble">
      <UiIcon :name="iconName" :size="16" :stroke="2" />
    </div>
  </a>
</template>

<style scoped lang="stylus">
.project-card
  position: relative
  border-radius: 28px
  overflow: hidden
  display: block
  background: var(--surface-container)
  border: 1px solid var(--outline-variant)
  transition: transform var(--dur-med) var(--spring-fast), border-color var(--dur-short) var(--spring-gentle)

.project-card:hover
  transform: translateY(-6px)
  border-color: var(--primary)

.project-card--featured
  grid-column: span 6
  grid-row: span 2

.project-card--wide
  grid-column: span 4
  grid-row: span 1

.project-card--tall
  grid-column: span 2
  grid-row: span 2

.project-card--square
  grid-column: span 2
  grid-row: span 1

.project-card__overlay
  position: absolute
  left: 12px
  right: 12px
  bottom: 12px
  z-index: 3
  padding: 16px
  border-radius: 20px
  background: unquote("color-mix(in oklch, #000 72%, transparent)")
  color: white
  backdrop-filter: blur(12px)
  -webkit-backdrop-filter: blur(12px)
  opacity: 0
  transform: translateY(8px)
  transition: opacity var(--dur-short) var(--spring-gentle), transform var(--dur-short) var(--spring-gentle)
  pointer-events: none

.project-card:hover .project-card__overlay
  opacity: 1
  transform: translateY(0)

.project-card__overlay-row
  display: flex
  justify-content: space-between
  align-items: flex-end
  gap: 14px

.project-card__overlay-text
  min-width: 0
  flex: 1

.project-card__overlay-tagline
  font-family: var(--font-display)
  font-size: 15px
  font-weight: 700
  letter-spacing: -0.01em
  margin-bottom: 6px

.project-card__overlay-meta
  font-size: 11px
  color: rgba(255, 255, 255, 0.75)
  letter-spacing: 0.04em
  display: flex
  align-items: center
  gap: 6px

.project-card__overlay-meta-label
  opacity: 0.7

.project-card__overlay-meta-divider
  opacity: 0.4

.project-card__overlay-meta-url
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.project-card__overlay-cta
  width: 40px
  height: 40px
  border-radius: 50%
  background: white
  color: #000
  display: grid
  place-items: center
  flex-shrink: 0

.project-card__icon-bubble
  position: absolute
  bottom: 16px
  right: 16px
  z-index: 2
  width: 40px
  height: 40px
  border-radius: 50%
  background: unquote("color-mix(in oklch, #000 55%, transparent)")
  color: white
  backdrop-filter: blur(10px)
  -webkit-backdrop-filter: blur(10px)
  display: grid
  place-items: center
  opacity: 1
  transition: opacity var(--dur-short) var(--spring-gentle)

.project-card:hover .project-card__icon-bubble
  opacity: 0
</style>
