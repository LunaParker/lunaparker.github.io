<script setup lang="ts">
const product = {
  name: 'Basic Auth Gateway',
  kind: 'Browser extension',
  icon: '/products/basic-auth-gateway.svg',
  accent: '#6b4fbb',
}

definePageMeta({ viewTransition: true })

// Parsed at generate time; visitors get the result from the payload, not the parser
const { data: policy } = await useAsyncData('policy:basic-auth-gateway', async () => {
  const [{ default: source }, { parsePolicy }] = await Promise.all([
    import('~/content/basic-auth-gateway/privacy.md?raw'),
    import('~/utils/policy'),
  ])
  return parsePolicy(source)
})

const title = `${product.name} privacy policy | Luna Parker`
const description = 'Privacy policy for the Basic Auth Gateway browser extension: what it stores, where it keeps it, and when anything leaves your computer.'

useHead({ title })
useSeoMeta({
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
})
</script>

<template>
  <ProductPolicy v-if="policy" :product="product" :policy="policy" />
</template>
