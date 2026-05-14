<template>
  <header :class="['app-header', { 'app-header--scrolled': isScrolled }]">
    <div class="app-header-inner container">
      <a href="#" class="app-logo font-heading" aria-label="Home">AC</a>

      <nav class="app-nav" aria-label="Main navigation">
        <a
          v-for="link in navLinks"
          :key="link.href"
          href="#"
          :class="['nav-link font-mono', { 'nav-link--active': activeSection === link.target }]"
          @click.prevent="scrollTo(link.target)"
        >
          <span class="nav-link-num">{{ padNum(navLinks.indexOf(link) + 1) }}</span>
          {{ link.label }}
        </a>
      </nav>

      <button
        :class="['hamburger', { 'is-open': mobileOpen }]"
        @click="mobileOpen = !mobileOpen"
        :aria-expanded="mobileOpen"
        aria-label="Toggle navigation menu"
        aria-controls="mobile-nav"
      >
        <span></span>
        <span></span>
      </button>
    </div>

    <MobileNav
      :is-open="mobileOpen"
      :links="navLinks"
      @close="mobileOpen = false"
      @navigate="(id) => { mobileOpen = false; scrollTo(id) }"
    />
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import { useActiveSection } from '@/composables/useActiveSection'
import MobileNav from './MobileNav.vue'

const router = useRouter()
const route = useRoute()
const { y: scrollY } = useWindowScroll()
const isScrolled = computed(() => scrollY.value > 40)
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Work', href: '#', target: 'work' },
  { label: 'About', href: '#', target: 'about' },
  { label: 'Contact', href: '#', target: 'contact' },
]

const { activeSection } = useActiveSection(['hero', 'work', 'about', 'contact'])

function scrollTo(id) {
  if (route.name !== 'home') {
    router.push({ name: 'home' }).then(() => {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
    })
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function padNum(n) {
  return String(n).padStart(2, '0')
}
</script>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
}

.app-header--scrolled {
  background: rgba(15, 15, 15, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
}

.app-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.app-logo {
  font-size: var(--text-xl);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-accent);
  transition: color 0.3s ease;
}

.app-logo:hover {
  color: var(--color-text);
}

.app-nav {
  display: none;
}

@media (min-width: 1024px) {
  .app-nav {
    display: flex;
    gap: var(--space-md);
  }
}

.nav-link {
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  color: var(--color-text-dim);
  padding: var(--space-xs) 0;
  position: relative;
  transition: color 0.3s ease;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.nav-link-num {
  font-size: 0.6rem;
  color: var(--color-accent);
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1.5px;
  background: var(--color-accent);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: left;
}

.nav-link:hover,
.nav-link--active {
  color: var(--color-text);
}

.nav-link:hover .nav-link-num,
.nav-link--active .nav-link-num {
  opacity: 1;
}

.nav-link--active::after {
  transform: scaleX(1);
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px;
  z-index: 110;
}

@media (min-width: 1024px) {
  .hamburger {
    display: none;
  }
}

.hamburger span {
  display: block;
  width: 24px;
  height: 1.5px;
  background: var(--color-text);
  border-radius: 1px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.hamburger.is-open span:nth-child(1) {
  transform: translateY(7.5px) rotate(45deg);
}

.hamburger.is-open span:nth-child(2) {
  transform: translateY(-7.5px) rotate(-45deg);
}
</style>
