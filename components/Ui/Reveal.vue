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
let io: IntersectionObserver | null = null

onMounted(() => {
  if (!el.value) return
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
    :class="['reveal', { in: seen }]"
    :style="{ transitionDelay: `${props.delay}ms` }"
  >
    <slot />
  </component>
</template>
