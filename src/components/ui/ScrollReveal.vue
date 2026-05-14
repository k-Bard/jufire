<template>
  <div ref="target" :class="['scroll-reveal', { 'is-visible': isVisible }]" :style="revealStyle">
    <slot />
  </div>
</template>

<script setup>
import { useScrollReveal } from '@/composables/useScrollReveal'

const props = defineProps({
  direction: { type: String, default: 'up' },
  delay: { type: Number, default: 0 },
  threshold: { type: Number, default: 0.12 },
})

const { target, isVisible, revealStyle } = useScrollReveal({
  direction: props.direction,
  delay: props.delay,
  threshold: props.threshold,
})
</script>

<style scoped>
.scroll-reveal {
  opacity: 0;
  transform: var(--reveal-from);
  transition: opacity 0.7s cubic-bezier(0.22, 0.61, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1);
  transition-delay: var(--reveal-delay, 0ms);
}

.scroll-reveal.is-visible {
  opacity: 1;
  transform: translate(0, 0);
}
</style>
