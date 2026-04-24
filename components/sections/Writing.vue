<script setup lang="ts">
import { computed } from 'vue'
import { useData } from '~/composables/useData'

const data = useData()

const featured = computed(() => data.value.blog[0])
const rest = computed(() => data.value.blog.slice(1))
</script>

<template>
  <section id="writing" class="section" :style="{ position: 'relative' }">
    <div class="container">
      <UiSectionHeader
        kicker="04 — Field notes"
        sub="Short essays on frameworks, security, and the weird parts of being both a senior developer and an undergrad."
      >
        <template #title>My thoughts.</template>
        <template #action>
          <NuxtLink to="/writing" class="btn btn-outlined">
            Read all posts <UiIcon name="arrow" :size="16" />
          </NuxtLink>
        </template>
      </UiSectionHeader>

      <div class="writing-grid" :style="{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: '18px' }">
        <BlogCard v-if="featured" :post="featured" variant="featured" />
        <div :style="{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '18px' }">
          <BlogCard
            v-for="p in rest.slice(0, 2)"
            :key="p.id"
            :post="p"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@media (max-width: 860px) {
  .writing-grid { grid-template-columns: 1fr !important; }
}
</style>
