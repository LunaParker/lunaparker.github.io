<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string
  label: string
  type?: string
  multiline?: boolean
}>(), {
  type: 'text',
  multiline: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const focused = ref(false)
const active = computed(() => focused.value || props.modelValue.length > 0)

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement | HTMLTextAreaElement).value)
}

const fieldStyle = computed(() => ({
  width: '100%',
  padding: '6px 18px 14px',
  background: 'transparent',
  border: 0,
  outline: 'none',
  font: 'inherit',
  color: 'var(--on-surface)',
  resize: (props.multiline ? 'vertical' : 'none') as 'vertical' | 'none',
}))
</script>

<template>
  <label
    :style="{
      position: 'relative',
      display: 'block',
      background: 'var(--surface-container-high)',
      borderRadius: '16px',
      border: `1px solid ${focused ? 'var(--primary)' : 'var(--outline-variant)'}`,
      transition: 'border-color var(--dur-short) var(--spring-gentle)',
      paddingTop: '24px',
    }"
  >
    <span
      :style="{
        position: 'absolute',
        left: '18px',
        pointerEvents: 'none',
        top: active ? '10px' : '22px',
        fontSize: active ? '11px' : '15px',
        color: focused ? 'var(--primary-text)' : 'var(--on-surface-variant)',
        fontWeight: active ? 600 : 400,
        letterSpacing: active ? '0.06em' : 0,
        textTransform: active ? 'uppercase' : 'none',
        fontFamily: active ? 'var(--font-mono)' : 'var(--font-body)',
        transition: 'top var(--dur-short) var(--spring-gentle), font-size var(--dur-short) var(--spring-gentle), color var(--dur-short) var(--spring-gentle), letter-spacing var(--dur-short), font-family var(--dur-short)',
      }"
    >{{ label }}</span>
    <textarea
      v-if="multiline"
      :value="modelValue"
      :rows="5"
      :style="fieldStyle"
      @input="onInput"
      @focus="focused = true"
      @blur="focused = false"
    />
    <input
      v-else
      :type="type"
      :value="modelValue"
      :style="fieldStyle"
      @input="onInput"
      @focus="focused = true"
      @blur="focused = false"
    >
  </label>
</template>
