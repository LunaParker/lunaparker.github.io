<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string
  label: string
  type?: string
  multiline?: boolean
  options?: string[]
  placeholderOption?: string
}>(), {
  type: 'text',
  multiline: false,
  options: undefined,
  placeholderOption: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const focused = ref(false)
// Selects keep the label permanently floated: the closed control shows the
// placeholder option's text, which would collide with a resting label.
const active = computed(() => Boolean(props.options) || focused.value || props.modelValue.length > 0)

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value)
}
</script>

<template>
  <label
    class="m3-field"
    :class="{ 'm3-field--focused': focused, 'm3-field--active': active }"
  >
    <span class="m3-field__label">{{ label }}</span>
    <select
      v-if="options"
      class="m3-field__input m3-field__input--select"
      :value="modelValue"
      @change="onInput"
      @focus="focused = true"
      @blur="focused = false"
    >
      <option v-if="placeholderOption !== undefined" value="">{{ placeholderOption }}</option>
      <option v-for="opt in options" :key="opt" :value="opt">{{ opt }}</option>
    </select>
    <textarea
      v-else-if="multiline"
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

.m3-field__input--select
  appearance: none
  -webkit-appearance: none
  padding-right: 44px
  cursor: pointer
  background-image: linear-gradient(45deg, transparent 50%, var(--on-surface-variant) 50%), linear-gradient(135deg, var(--on-surface-variant) 50%, transparent 50%)
  background-position: right 22px center, right 17px center
  background-size: 5px 5px
  background-repeat: no-repeat
</style>
