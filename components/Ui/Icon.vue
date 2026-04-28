<script setup lang="ts">
import { computed, type StyleValue } from 'vue'

type IconName =
  | 'arrow' | 'arrowUpRight' | 'download' | 'mail' | 'phone' | 'pin'
  | 'github' | 'linkedin' | 'sun' | 'moon' | 'close' | 'sparkles'
  | 'chev' | 'chevDown' | 'heart' | 'maple' | 'dot' | 'menu' | 'tweaks'
  | 'webDesign' | 'webDev' | 'custom' | 'consult' | 'wordpress' | 'database'

const props = withDefaults(defineProps<{
  name: IconName
  size?: number
  stroke?: number
  style?: StyleValue
}>(), {
  size: 20,
  stroke: 1.75,
  style: undefined,
})

const common = computed(() => ({
  width: props.size,
  height: props.size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': props.stroke,
  'stroke-linecap': 'round' as const,
  'stroke-linejoin': 'round' as const,
}))
</script>

<template>
  <svg v-if="name === 'arrow'" v-bind="common" :style="style" aria-hidden>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
  <svg v-else-if="name === 'arrowUpRight'" v-bind="common" :style="style" aria-hidden>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
  <svg v-else-if="name === 'download'" v-bind="common" :style="style" aria-hidden>
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </svg>
  <svg v-else-if="name === 'mail'" v-bind="common" :style="style" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
  <svg v-else-if="name === 'phone'" v-bind="common" :style="style" aria-hidden>
    <path d="M4 4h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 0-2Z" />
  </svg>
  <svg v-else-if="name === 'pin'" v-bind="common" :style="style" aria-hidden>
    <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
  <svg v-else-if="name === 'github'" v-bind="common" :style="style" aria-hidden>
    <path d="M9 19c-4 1.5-4-2-5-2.5M15 22v-3.5a3 3 0 0 0-.88-2.38C17 15.8 20 14.5 20 9.8a4.8 4.8 0 0 0-1.38-3.3 4.48 4.48 0 0 0-.07-3.33s-1.13-.33-3.7 1.4a12.36 12.36 0 0 0-6.7 0C5.57 2.84 4.44 3.17 4.44 3.17a4.48 4.48 0 0 0-.07 3.33A4.8 4.8 0 0 0 3 9.84c0 4.68 3 5.98 5.88 6.32A3 3 0 0 0 8 18.5V22" />
  </svg>
  <svg v-else-if="name === 'linkedin'" v-bind="common" :style="style" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M7 10v7M7 7v.01M11 17v-4a3 3 0 0 1 6 0v4M11 10v7" />
  </svg>
  <svg v-else-if="name === 'sun'" v-bind="common" :style="style" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5 3.5 3.5M20.5 20.5 19 19M5 19l-1.5 1.5M20.5 3.5 19 5" />
  </svg>
  <svg v-else-if="name === 'moon'" v-bind="common" :style="style" aria-hidden>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
  <svg v-else-if="name === 'close'" v-bind="common" :style="style" aria-hidden>
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </svg>
  <svg v-else-if="name === 'sparkles'" v-bind="common" :style="style" aria-hidden>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5l2.8 2.8M15.7 15.7l2.8 2.8M5.5 18.5l2.8-2.8M15.7 8.3l2.8-2.8" />
  </svg>
  <svg v-else-if="name === 'chev'" v-bind="common" :style="style" aria-hidden>
    <path d="m9 6 6 6-6 6" />
  </svg>
  <svg v-else-if="name === 'chevDown'" v-bind="common" :style="style" aria-hidden>
    <path d="m6 9 6 6 6-6" />
  </svg>
  <svg v-else-if="name === 'heart'" v-bind="common" :style="style" aria-hidden>
    <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z" fill="currentColor" />
  </svg>
  <svg v-else-if="name === 'maple'" v-bind="common" :style="style" aria-hidden>
    <path d="M12 2 13.3 5.5 17 5l-1.2 3.3 3.5 1.7L16.5 12 20 14l-3.5 1L18 19l-4.2-.7L12 22l-1.8-3.7L6 19l1.5-4L4 14l3-2-2.8-2 3.5-1.7L6.5 5l3.7.5Z" fill="currentColor" stroke="none" />
  </svg>
  <svg v-else-if="name === 'dot'" v-bind="common" :style="style" aria-hidden>
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
  <svg v-else-if="name === 'menu'" v-bind="common" :style="style" aria-hidden>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </svg>
  <svg v-else-if="name === 'tweaks'" v-bind="common" :style="style" aria-hidden>
    <circle cx="6" cy="6" r="2" />
    <circle cx="18" cy="12" r="2" />
    <circle cx="6" cy="18" r="2" />
    <path d="M8 6h12M4 12h12M8 18h12" />
  </svg>
  <svg v-else-if="name === 'webDesign'" v-bind="common" :style="style" aria-hidden>
    <path d="M12 3a9 9 0 1 0 0 18c1.3 0 2-.9 2-1.8 0-.6-.3-1-.6-1.4-.3-.4-.6-.8-.6-1.4 0-.9.7-1.6 1.6-1.6H16a5 5 0 0 0 5-5c0-3.9-4-6.8-9-6.8Z" />
    <circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none" />
    <circle cx="9.5" cy="7" r="1" fill="currentColor" stroke="none" />
    <circle cx="14" cy="6.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="17" cy="9.5" r="1" fill="currentColor" stroke="none" />
  </svg>
  <svg v-else-if="name === 'webDev'" v-bind="common" :style="style" aria-hidden>
    <path d="m8 8-4 4 4 4" />
    <path d="m16 8 4 4-4 4" />
    <path d="m14 6-4 12" />
  </svg>
  <svg v-else-if="name === 'custom'" v-bind="common" :style="style" aria-hidden>
    <path d="M12 3 3 8l9 5 9-5-9-5Z" />
    <path d="m3 16 9 5 9-5" />
    <path d="m3 12 9 5 9-5" />
  </svg>
  <svg v-else-if="name === 'consult'" v-bind="common" :style="style" aria-hidden>
    <rect x="3" y="3" width="13" height="9" rx="1.2" />
    <rect x="8" y="8" width="13" height="9" rx="1.2" fill="var(--surface-container)" />
    <path d="M14.5 17v2M12 19h5" />
  </svg>
  <svg v-else-if="name === 'wordpress'" v-bind="common" :style="style" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M6.5 9.2 10 17l2.1-5.6" />
    <path d="M12.1 11.4 14.2 17l3.3-7.8" />
    <path d="M5 9.2h5" />
    <path d="M14 9.2h5" />
  </svg>
  <svg v-else-if="name === 'database'" v-bind="common" :style="style" aria-hidden>
    <ellipse cx="12" cy="5.5" rx="8" ry="2.5" />
    <path d="M4 5.5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" />
    <path d="M4 11.5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" />
  </svg>
</template>
