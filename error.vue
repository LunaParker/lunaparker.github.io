<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  }
}>()

const isNotFound = computed(() => props.error?.statusCode === 404)
const code = computed(() => String(props.error?.statusCode ?? 'Error'))

const wordmark = computed(() => isNotFound.value
  ? 'Four oh four!'
  : code.value)

const headline = computed(() => isNotFound.value
  ? 'This page wandered off.'
  : 'Something broke on our end.')

const sub = computed(() => isNotFound.value
  ? 'The link you followed might be old, or the page may have moved. Pick a destination below — or head back to the home page.'
  : "An unexpected error occurred. Try refreshing, or head back home and try again.")

useHead({
  title: isNotFound.value
    ? '404 — Page not found · Luna Parker'
    : `${code.value} — Luna Parker`,
  meta: [{ name: 'robots', content: 'noindex' }],
})

async function goHome() {
  await clearError({ redirect: '/' })
}
</script>

<template>
  <NuxtLayout name="default">
    <section
      :style="{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 0 80px',
      }"
    >
      <div class="container" :style="{ width: '100%' }">
        <div class="label" :style="{ color: 'var(--on-surface-variant)', marginBottom: '24px' }">
          <span>— {{ isNotFound ? 'Lost in the woods' : 'Unexpected error' }}</span>
        </div>

        <h1
          :aria-label="isNotFound ? '404 — Four oh four' : `Error ${code}`"
          class="error-wordmark"
          :style="{
            fontFamily: 'var(--font-display)',
            fontSize: isNotFound ? 'clamp(3rem, 11vw, 11rem)' : 'clamp(5rem, 22vw, 22rem)',
            fontWeight: 800,
            letterSpacing: '-0.045em',
            lineHeight: 0.92,
            margin: 0,
            background: 'var(--brand-gradient)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }"
        >
          {{ wordmark }}
        </h1>

        <h2
          :style="{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            marginTop: '24px',
            marginBottom: '20px',
            color: 'var(--on-surface)',
          }"
        >
          {{ headline }}
        </h2>

        <p
          class="body-lg"
          :style="{
            maxWidth: '52ch',
            color: 'var(--on-surface-variant)',
            fontSize: '1.15rem',
            lineHeight: 1.55,
            marginBottom: '36px',
          }"
        >
          {{ sub }}
        </p>

        <div :style="{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '60px' }">
          <button type="button" class="btn btn-brand" @click="goHome">
            Back home <UiIcon name="arrow" :size="18" />
          </button>
          <NuxtLink to="/#contact" class="btn btn-outlined">
            Get in touch
          </NuxtLink>
        </div>

        <div
          :style="{
            paddingTop: '24px',
            borderTop: '1px solid var(--outline-variant)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '16px',
          }"
        >
          <div class="label" :style="{ color: 'var(--on-surface-variant)' }">
            Or jump to a section
          </div>
          <nav :style="{ display: 'flex', gap: '20px', flexWrap: 'wrap' }">
            <NuxtLink to="/#about" class="error-jumplink">About</NuxtLink>
            <NuxtLink to="/#experience" class="error-jumplink">Experience</NuxtLink>
            <NuxtLink to="/#projects" class="error-jumplink">Projects</NuxtLink>
            <NuxtLink to="/#skills" class="error-jumplink">Skills</NuxtLink>
            <NuxtLink to="/#contact" class="error-jumplink">Contact</NuxtLink>
          </nav>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped lang="stylus">
.error-jumplink
  font-size: 14px
  font-weight: 500
  color: var(--on-surface-variant)
  text-decoration: none
  transition: color var(--dur-short) var(--spring-gentle)

.error-jumplink:hover
  color: var(--primary-text)
</style>
