<template>
  <div :class="['decorative', `decorative--${type}`]" aria-hidden="true">
    <svg v-if="type === 'circle'" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" stroke-width="1" />
      <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" stroke-width="0.5" />
    </svg>
    <svg v-else-if="type === 'line'" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M 0,10 Q 25,2 50,10 T 100,10" fill="none" stroke="currentColor" stroke-width="1" />
    </svg>
    <svg v-else-if="type === 'dots'" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="2" fill="currentColor" />
      <circle cx="40" cy="10" r="2" fill="currentColor" />
      <circle cx="70" cy="10" r="2" fill="currentColor" />
      <circle cx="10" cy="40" r="2" fill="currentColor" />
      <circle cx="40" cy="40" r="2" fill="currentColor" />
      <circle cx="70" cy="40" r="2" fill="currentColor" />
      <circle cx="10" cy="70" r="2" fill="currentColor" />
      <circle cx="40" cy="70" r="2" fill="currentColor" />
      <circle cx="70" cy="70" r="2" fill="currentColor" />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'circle',
    validator: (v) => ['circle', 'line', 'dots'].includes(v),
  },
})
</script>

<style scoped>
.decorative {
  position: absolute;
  pointer-events: none;
}

.decorative--circle {
  width: clamp(300px, 35vw, 500px);
  height: clamp(300px, 35vw, 500px);
  color: var(--color-accent);
  opacity: 0.06;
  animation: slowSpin 80s linear infinite;
}

.decorative--line {
  width: 100%;
  max-width: 300px;
  height: 20px;
  color: var(--color-accent-secondary);
  opacity: 0.1;
}

.decorative--dots {
  width: 80px;
  height: 80px;
  color: var(--color-accent-secondary);
  opacity: 0.08;
}
</style>
