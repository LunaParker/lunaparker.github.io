<script setup lang="ts">
import { onMounted } from 'vue'
import { useData } from '~/composables/useData'

const data = useData()
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl ?? 'https://shyowlstudios.com')

definePageMeta({ viewTransition: true })

useHead({
  title: 'Writing — Luna Parker',
})
useSeoMeta({
  description: 'Essays, tutorials, and opinionated takes on Laravel, security, AI tooling, and being a senior dev and undergrad at the same time.',
  ogTitle: 'Writing — Luna Parker',
  ogDescription: 'Essays, tutorials, and opinionated takes on Laravel, security, AI tooling, and being a senior dev and undergrad at the same time.',
  ogUrl: `${siteUrl}/writing`,
})

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
})
</script>

<template>
  <div :style="{ minHeight: '100vh', padding: '120px 0 80px' }">
    <div class="container">
      <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap', marginBottom: '48px' }">
        <div :style="{ maxWidth: '62ch' }">
          <div class="label section-kicker" :style="{ color: 'var(--on-surface-variant)', marginBottom: '20px' }">
            <span>Writing · {{ data.blog.length }} posts</span>
          </div>
          <h1
:style="{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            fontWeight: 800,
            letterSpacing: '-0.045em',
            lineHeight: 0.92,
            marginBottom: '20px',
          }">
            <span
:style="{
              background: 'var(--brand-gradient)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }">Notes</span>
            <span :style="{ fontStyle: 'italic', fontWeight: 300 }"> from the workshop.</span>
          </h1>
          <p class="body-lg" :style="{ color: 'var(--on-surface-variant)' }">
            Essays, tutorials, and opinionated takes — on Laravel, security, AI tooling, and what it's like being a senior dev & an undergrad at the same time.
          </p>
        </div>
        <NuxtLink to="/" class="btn btn-outlined">
          <UiIcon name="chev" :size="16" :style="{ transform: 'rotate(180deg)' }" /> Back to portfolio
        </NuxtLink>
      </div>

      <div :style="{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }">
        <BlogCard
          v-for="(p, i) in data.blog"
          :key="p.id"
          :post="p"
          :variant="i === 0 ? 'featured' : 'default'"
        />
      </div>
    </div>
  </div>
</template>
