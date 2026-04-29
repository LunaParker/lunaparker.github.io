<script setup lang="ts">
import type { BlogPost } from '~/composables/useData'

withDefaults(defineProps<{
  post: BlogPost
  variant?: 'default' | 'featured'
}>(), {
  variant: 'default',
})

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <NuxtLink
    :to="`/writing/${post.id}`"
    :class="['blog-card', { 'blog-card--featured': variant === 'featured' }]"
    :style="{ viewTransitionName: `post-${post.id}` }"
  >
    <div v-if="variant === 'featured'" class="blog-card__halo" />
    <div class="blog-card__chips">
      <UiChip :variant="variant === 'featured' ? 'primary' : 'tonal'">{{ post.tag }}</UiChip>
      <UiChip>{{ post.readingTime }}</UiChip>
    </div>
    <div class="blog-card__body">
      <h3 class="blog-card__title">{{ post.title }}</h3>
      <p class="blog-card__excerpt">{{ post.excerpt }}</p>
      <div class="blog-card__footer">
        <div class="mono blog-card__date">{{ formatDate(post.date) }}</div>
        <div v-if="variant === 'featured'" class="blog-card__cta">
          Read post <UiIcon name="arrow" :size="16" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="stylus">
.blog-card
  padding: 26px
  border-radius: 24px
  background: var(--surface-container)
  border: 1px solid var(--outline-variant)
  display: block
  transition: transform var(--dur-med) var(--spring-fast), border-color var(--dur-short)
  color: inherit
  text-decoration: none

.blog-card:hover
  transform: translateY(-4px)
  border-color: var(--primary)

.blog-card__chips
  display: flex
  gap: 8px
  margin-bottom: 16px

.blog-card__title
  font-family: var(--font-display)
  font-size: 1.25rem
  font-weight: 700
  letter-spacing: -0.02em
  line-height: 1.15
  margin-bottom: 10px

.blog-card__excerpt
  color: var(--on-surface-variant)
  font-size: 0.95rem
  margin-bottom: 16px

.blog-card__date
  font-size: 11px
  color: var(--on-surface-variant)

.blog-card--featured
  position: relative
  display: grid
  grid-template-rows: 1fr auto
  padding: 32px
  border-radius: 28px
  background: var(--surface-container-high)
  min-height: 320px
  overflow: hidden

.blog-card--featured .blog-card__halo
  position: absolute
  top: -40px
  right: -40px
  width: 280px
  height: 280px
  border-radius: 50%
  background: var(--brand-gradient-135)
  filter: blur(60px)
  opacity: 0.25

.blog-card--featured .blog-card__chips
  position: relative
  margin-bottom: 24px
  align-items: flex-start
  align-self: flex-start

.blog-card--featured .blog-card__body
  position: relative

.blog-card--featured .blog-card__title
  font-size: clamp(1.6rem, 3vw, 2.4rem)
  letter-spacing: -0.025em
  line-height: 1.05
  margin-bottom: 16px

.blog-card--featured .blog-card__excerpt
  font-size: 1rem
  max-width: 52ch
  margin-bottom: 20px

.blog-card--featured .blog-card__footer
  display: flex
  justify-content: space-between
  align-items: center
  gap: 16px

.blog-card--featured .blog-card__date
  font-size: 12px

.blog-card--featured .blog-card__cta
  display: inline-flex
  align-items: center
  gap: 8px
  color: var(--primary-text)
  font-weight: 600
</style>
