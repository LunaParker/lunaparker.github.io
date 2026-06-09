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
</script>

<template>
  <label
    class="m3-field"
    :class="{ 'm3-field--focused': focused, 'm3-field--active': active }"
  >
    <span class="m3-field__label">{{ label }}</span>
    <textarea
      v-if="multiline"
      class="m3-field__input m3-field__input--multiline"
      :value="modelValue"
      :rows="5"
      @input="onInput"
      @focus="focused = true"
      @blur="focused = false"
    />
    <input
      v-else
      class="m3-field__input"
      :type="type"
      :value="modelValue"
      @input="onInput"
      @focus="focused = true"
      @blur="focused = false"
    >
  </label>
</template>

<style scoped lang="stylus">
.m3-field
  position: relative
  display: block
  background: var(--surface-container-high)
  border-radius: 16px
  border: 1px solid var(--outline-variant)
  padding-top: 24px
  transition: border-color var(--dur-short) var(--spring-gentle)

.m3-field--focused
  border-color: var(--primary)

.m3-field__label
  position: absolute
  left: 18px
  top: 22px
  pointer-events: none
  font-family: var(--font-body)
  font-size: 15px
  font-weight: 400
  letter-spacing: 0
  text-transform: none
  color: var(--on-surface-variant)
  transition: top var(--dur-short) var(--spring-gentle), font-size var(--dur-short) var(--spring-gentle), color var(--dur-short) var(--spring-gentle), letter-spacing var(--dur-short), font-family var(--dur-short)

.m3-field--active .m3-field__label
  top: 10px
  font-family: var(--font-mono)
  font-size: 11px
  font-weight: 600
  letter-spacing: 0.06em
  text-transform: uppercase

.m3-field--focused .m3-field__label
  color: var(--primary-text)

.m3-field__input
  width: 100%
  padding: 6px 18px 14px
  background: transparent
  border: 0
  outline: none
  font: inherit
  color: var(--on-surface)
  resize: none

.m3-field__input--multiline
  resize: vertical
</style>
