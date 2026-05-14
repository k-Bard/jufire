<template>
  <div>
    <AppHeader />
    <main>
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import WorkSection from '@/components/sections/WorkSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
</script>
