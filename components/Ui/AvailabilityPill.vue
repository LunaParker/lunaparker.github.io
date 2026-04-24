<script setup lang="ts">
const props = withDefaults(defineProps<{ compact?: boolean }>(), {
  compact: false,
})
</script>

<template>
  <span
    class="avail-pill"
    :style="{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: props.compact ? '6px 12px' : '8px 16px',
      borderRadius: '999px',
      background: 'var(--surface-container-high)',
      border: '1px solid var(--outline-variant)',
      fontSize: props.compact ? '12px' : '13px',
      fontWeight: 500,
      color: 'var(--on-surface-variant)',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }"
  >
    <span :style="{ position: 'relative', width: '8px', height: '8px' }">
      <span :style="{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#22c55e' }" />
      <span
:style="{
        position: 'absolute',
        inset: '-3px',
        borderRadius: '50%',
        background: '#22c55e',
        opacity: 0.4,
        animation: 'pulse 2s ease-out infinite',
      }" />
    </span>
    <span>{{ props.compact ? 'Fall 2026 co-op' : 'Open to Fall 2026 co-op' }}</span>
  </span>
</template>
