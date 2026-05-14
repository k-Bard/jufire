<template>
  <Teleport to="body">
    <transition name="overlay">
      <div v-if="isOpen" class="mobile-nav-overlay" @click.self="$emit('close')">
        <nav id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation">
          <a
            v-for="(link, i) in links"
            :key="link.target"
            href="#"
            :class="['mobile-nav-link font-heading', { 'is-visible': isOpen }]"
            :style="{ transitionDelay: `${0.1 + i * 0.08}s` }"
            @click.prevent="$emit('navigate', link.target)"
          >
            <span class="mobile-nav-num font-mono">{{ padNum(i + 1) }}</span>
            {{ link.label }}
          </a>
        </nav>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: { type: Boolean, required: true },
  links: { type: Array, required: true },
})

defineEmits(['close'])

function padNum(n) {
  return String(n).padStart(2, '0')
}
</script>

<style scoped>
.mobile-nav-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 105;
}

.overlay-enter-active {
  transition: opacity 0.4s ease;
}

.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.mobile-nav-link {
  font-size: var(--text-2xl);
  color: #F0EDE8;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.mobile-nav-num {
  font-size: var(--text-xs);
  letter-spacing: 0.06em;
  color: var(--color-accent);
  opacity: 0.6;
}

.mobile-nav-link.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
