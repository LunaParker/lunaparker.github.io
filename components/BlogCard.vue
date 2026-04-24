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
    v-if="variant === 'featured'"
    :to="`/writing/${post.id}`"
    class="blog-card-featured"
    :style="{
      position: 'relative',
      display: 'grid',
      gridTemplateRows: '1fr auto',
      padding: '32px',
      borderRadius: '28px',
      background: 'var(--surface-container-high)',
      border: '1px solid var(--outline-variant)',
      minHeight: '320px',
      overflow: 'hidden',
      transition: 'transform var(--dur-med) var(--spring-fast), border-color var(--dur-short)',
      viewTransitionName: `post-${post.id}`,
      color: 'inherit',
      textDecoration: 'none',
    }"
  >
    <div
:style="{
      position: 'absolute',
      top: '-40px',
      right: '-40px',
      width: '280px',
      height: '280px',
      borderRadius: '50%',
      background: 'var(--brand-gradient-135)',
      filter: 'blur(60px)',
      opacity: 0.25,
    }" />
    <div :style="{ position: 'relative', display: 'flex', gap: '8px', marginBottom: '24px', alignItems: 'flex-start', alignSelf: 'flex-start' }">
      <UiChip variant="primary">{{ post.tag }}</UiChip>
      <UiChip>{{ post.readingTime }}</UiChip>
    </div>
    <div :style="{ position: 'relative' }">
      <h3
:style="{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
        fontWeight: 700,
        letterSpacing: '-0.025em',
        lineHeight: 1.05,
        marginBottom: '16px',
      }">{{ post.title }}</h3>
      <p :style="{ color: 'var(--on-surface-variant)', maxWidth: '52ch', marginBottom: '20px' }">{{ post.excerpt }}</p>
      <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }">
        <div class="mono" :style="{ fontSize: '12px', color: 'var(--on-surface-variant)' }">
          {{ formatDate(post.date) }}
        </div>
        <div :style="{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-text)', fontWeight: 600 }">
          Read post <UiIcon name="arrow" :size="16" />
        </div>
      </div>
    </div>
  </NuxtLink>

  <NuxtLink
    v-else
    :to="`/writing/${post.id}`"
    class="blog-card"
    :style="{
      padding: '26px',
      borderRadius: '24px',
      background: 'var(--surface-container)',
      border: '1px solid var(--outline-variant)',
      display: 'block',
      transition: 'transform var(--dur-med) var(--spring-fast), border-color var(--dur-short)',
      viewTransitionName: `post-${post.id}`,
      color: 'inherit',
      textDecoration: 'none',
    }"
  >
    <div :style="{ display: 'flex', gap: '8px', marginBottom: '16px' }">
      <UiChip variant="tonal">{{ post.tag }}</UiChip>
      <UiChip>{{ post.readingTime }}</UiChip>
    </div>
    <h3
:style="{
      fontFamily: 'var(--font-display)',
      fontSize: '1.25rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.15,
      marginBottom: '10px',
    }">{{ post.title }}</h3>
    <p :style="{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', marginBottom: '16px' }">{{ post.excerpt }}</p>
    <div class="mono" :style="{ fontSize: '11px', color: 'var(--on-surface-variant)' }">{{ formatDate(post.date) }}</div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.blog-card-featured:hover,
.blog-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
}
</style>
