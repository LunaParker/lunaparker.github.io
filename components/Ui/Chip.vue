<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'default' | 'primary' | 'tonal'
  as?: string
}>(), {
  variant: 'default',
  as: 'span',
})

const cls = computed(() =>
  `chip${props.variant === 'primary' ? ' chip-primary' : props.variant === 'tonal' ? ' chip-tonal' : ''}`,
)
</script>

<template>
  <component :is="as" :class="cls">
    <slot />
  </component>
</template>
