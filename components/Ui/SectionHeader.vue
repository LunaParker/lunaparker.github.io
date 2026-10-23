<script setup lang="ts">
defineProps<{
  sub?: string | null
}>()
</script>

<template>
  <div class="section-header">
    <div :style="{ maxWidth: '62ch' }">
      <h2 class="display-md scroll-scale" :style="{ marginBottom: sub ? '16px' : '0' }">
        <slot name="title" />
      </h2>
      <p v-if="sub" class="body-lg" :style="{ color: 'var(--on-surface-variant)', maxWidth: '58ch' }">
        {{ sub }}
      </p>
    </div>
    <div v-if="$slots.action">
      <slot name="action" />
    </div>
  </div>
</template>
