<script setup lang="ts">
import HeroWordmark from '~/components/Hero/Wordmark.vue'
import AboutSection from '~/components/sections/About.vue'
import ExperienceSection from '~/components/sections/Experience.vue'
import ProjectsSection from '~/components/sections/Projects.vue'
import WritingSection from '~/components/sections/Writing.vue'
import SkillsSection from '~/components/sections/Skills.vue'
import ContactSection from '~/components/sections/Contact.vue'

const config = useRuntimeConfig()
const writingEnabled = Boolean(config.public.writingEnabled)

// Skills + Contact accept a kicker prop so their numbering can shift when the
// Writing section is hidden. Defaults inside the sections match the production
// (writing-off) numbering; here we override when writing is enabled.
const skillsKicker = writingEnabled ? '05 — Skills' : '04 — Skills'
const contactKicker = writingEnabled ? '06 — Contact' : '05 — Contact'
</script>

<template>
  <div>
    <HeroWordmark />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <WritingSection v-if="writingEnabled" />
    <SkillsSection :kicker="skillsKicker" />
    <ContactSection :kicker="contactKicker" />
  </div>
</template>
