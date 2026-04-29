<script setup lang="ts">
import { computed } from 'vue'
import { useData } from '~/composables/useData'

const data = useData()

const featured = computed(() => data.value.blog[0])
const rest = computed(() => data.value.blog.slice(1))
</script>

<template>
  <section id="writing" class="section writing">
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

      <div class="writing__grid">
        <BlogCard v-if="featured" :post="featured" variant="featured" />
        <div class="writing__list">
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

<style scoped lang="stylus">
.writing
  position: relative

.writing__grid
  display: grid
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr)
  gap: 18px

.writing__list
  display: grid
  grid-template-rows: 1fr 1fr
  gap: 18px

@media (max-width: 860px)
  .writing__grid
    grid-template-columns: 1fr
</style>
