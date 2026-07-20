<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  delay?: number
  as?: string
}>(), {
  delay: 0,
  as: 'div',
})

const el = ref<HTMLElement | null>(null)
const seen = ref(false)
const mounted = ref(false)
let io: IntersectionObserver | null = null

onMounted(() => {
  // .js cancels the CSS rescue fallback (base.styl) now that we're in charge.
  mounted.value = true
  if (!el.value) return
  // Already in the viewport (e.g. above the fold, or the rescue fallback beat
  // us to it): reveal synchronously — same render flush as the .js class, so
  // rescued content hands off without a blink and doesn't wait a frame for IO.
  const rect = el.value.getBoundingClientRect()
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    seen.value = true
    return
  }
  io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      seen.value = true
      io?.disconnect()
    }
  }, { threshold: 0.12 })
  io.observe(el.value)
})

onBeforeUnmount(() => {
  io?.disconnect()
})
</script>

<template>
  <component
    :is="as"
    ref="el"
    :class="['reveal', { in: seen, js: mounted }]"
    :style="{ transitionDelay: `${props.delay}ms` }"
  >
    <slot />
  </component>
</template>
