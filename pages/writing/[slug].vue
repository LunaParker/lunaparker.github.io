<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useData } from '~/composables/useData'

const route = useRoute()
const router = useRouter()
const data = useData()
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl ?? 'https://lunaparker.dev')

definePageMeta({ viewTransition: true })

const post = computed(() => data.value.blog.find(p => p.id === route.params.slug))

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const more = computed(() => data.value.blog.filter(p => p.id !== post.value!.id).slice(0, 2))

const postUrl = computed(() => `${siteUrl}/writing/${post.value!.id}`)

useHead({
  title: () => `${post.value!.title} — Luna Parker`,
})
useSeoMeta({
  description: () => post.value!.excerpt,
  ogType: 'article',
  ogTitle: () => post.value!.title,
  ogDescription: () => post.value!.excerpt,
  ogUrl: () => postUrl.value,
  articlePublishedTime: () => post.value!.date,
  articleAuthor: ['Luna Parker'],
  articleTag: () => [post.value!.tag],
  twitterTitle: () => post.value!.title,
  twitterDescription: () => post.value!.excerpt,
})

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

async function goBack() {
  await router.push('/')
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') goBack()
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
})

async function jumpContact(e: MouseEvent) {
  e.preventDefault()
  await router.push('/')
  setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50)
}
</script>

<template>
  <article
    v-if="post"
    :style="{ minHeight: '100vh', padding: '100px 0 80px', viewTransitionName: `post-${post.id}` }"
  >
    <div
:style="{
      position: 'sticky',
      top: 0,
      zIndex: 10,
      padding: '16px 0',
      background: 'color-mix(in oklch, var(--surface) 85%, transparent)',
      backdropFilter: 'saturate(1.2) blur(14px)',
      WebkitBackdropFilter: 'saturate(1.2) blur(14px)',
      borderBottom: '1px solid var(--outline-variant)',
      marginTop: '-100px',
      marginBottom: '60px',
    }">
      <div class="container" :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
        <button
          class="btn btn-text"
          :style="{ color: 'var(--on-surface)' }"
          @click="goBack"
        >
          <UiIcon name="chev" :size="18" :style="{ transform: 'rotate(180deg)' }" /> Back
        </button>
        <div class="mono" :style="{ fontSize: '12px', color: 'var(--on-surface-variant)' }">
          {{ post.readingTime }} · {{ post.tag }}
        </div>
      </div>
    </div>

    <div class="container" :style="{ maxWidth: '760px' }">
      <div class="label section-kicker" :style="{ color: 'var(--on-surface-variant)', marginBottom: '24px' }">
        <span>{{ formatDate(post.date) }} · {{ post.readingTime }} read</span>
      </div>

      <h1
:style="{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 5.5vw, 4.5rem)',
        fontWeight: 800,
        letterSpacing: '-0.035em',
        lineHeight: 1,
        marginBottom: '32px',
      }">
        {{ post.title }}
      </h1>

      <div :style="{ display: 'flex', gap: '12px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--outline-variant)' }">
        <div
:style="{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'var(--brand-gradient-135)',
          color: 'white',
          display: 'grid',
          placeItems: 'center',
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
        }">LP</div>
        <div>
          <div :style="{ fontWeight: 600 }">Luna Parker</div>
          <div :style="{ fontSize: '13px', color: 'var(--on-surface-variant)' }">Developer & Designer</div>
        </div>
      </div>

      <div :style="{ fontSize: '1.15rem', lineHeight: 1.72, color: 'var(--on-surface)' }">
        <p
          v-for="(para, i) in post.body"
          :key="i"
          :style="{ marginBottom: '24px' }"
        >{{ para }}</p>
      </div>

      <div
:style="{
        margin: '48px 0',
        padding: '32px',
        borderRadius: '24px',
        background: 'var(--primary-container)',
        color: 'var(--on-primary-container)',
        position: 'relative',
        overflow: 'hidden',
      }">
        <div
:style="{
          fontFamily: 'var(--font-display)',
          fontSize: '5rem',
          position: 'absolute',
          top: '-10px',
          left: '20px',
          opacity: 0.2,
        }">"</div>
        <p
:style="{
          fontFamily: 'var(--font-display)',
          fontSize: '1.35rem',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          lineHeight: 1.35,
          margin: 0,
        }">
          {{ post.excerpt }}
        </p>
      </div>

      <div :style="{ padding: '40px 0', textAlign: 'center', color: 'var(--on-surface-variant)' }">
        <div class="label">· · ·</div>
        <p :style="{ marginTop: '14px' }">
          Thanks for reading. Found a typo or want to talk?
          <a
            href="#contact"
            :style="{ color: 'var(--primary)', fontWeight: 600 }"
            @click="jumpContact"
          >get in touch.</a>
        </p>
      </div>
    </div>

    <div class="container" :style="{ marginTop: '60px' }">
      <div class="label section-kicker" :style="{ color: 'var(--on-surface-variant)', marginBottom: '20px' }">
        <span>Keep reading</span>
      </div>
      <div :style="{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }">
        <BlogCard v-for="p in more" :key="p.id" :post="p" />
      </div>
    </div>
  </article>
</template>
