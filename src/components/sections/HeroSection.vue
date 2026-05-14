<template>
  <section id="hero" class="hero">
    <div class="hero-float hero-float--1" ref="float1" :style="floatStyle(0.04)"></div>
    <div class="hero-float hero-float--2" ref="float2" :style="floatStyle(-0.03)"></div>
    <div class="hero-float hero-float--3" ref="float3" :style="floatStyle(0.06)"></div>
    <div class="hero-float hero-float--4" ref="float4" :style="floatStyle(-0.05)"></div>

    <div class="hero-content container">
      <div class="hero-label-row">
        <span class="hero-availability font-mono">
          <span class="hero-dot"></span>
          Available for commissions
        </span>
      </div>

      <h1 class="hero-title font-heading">
        <span
          v-for="(word, i) in splitWords(personalInfo.name)"
          :key="i"
          class="word-animate"
          :style="{ animationDelay: `${0.08 + i * 0.06}s` }"
        >{{ word.word }}&nbsp;</span>
      </h1>

      <div class="hero-role-row">
        <p class="hero-role font-mono word-animate" :style="{ animationDelay: '0.4s' }">
          <span>Visual Artist</span>
          <span class="hero-role-sep">/</span>
          <span class="hero-role-accent">Designer</span>
        </p>
      </div>

      <div class="hero-rule word-animate" :style="{ animationDelay: '0.55s' }"></div>

      <p class="hero-lead word-animate" :style="{ animationDelay: '0.7s' }">
        {{ personalInfo.bio }}
      </p>

      <div class="hero-scroll word-animate" :style="{ animationDelay: '0.9s' }">
        <button class="hero-scroll-link font-mono" @click="scrollToWork">
          <span>View Work</span>
          <svg class="hero-arrow" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12l7 7 7-7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { personalInfo } from '@/data/portfolio'
import { useGlobalParallax } from '@/composables/useParallax'

const { offset } = useGlobalParallax(0.02)

function splitWords(text) {
  return text.split(' ').map((word, i) => ({ word, i }))
}

function scrollToWork() {
  const el = document.getElementById('work')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function floatStyle(factor) {
  return computed(() => ({
    transform: `translateY(${offset.value * factor}px)`,
  }))
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: calc(var(--space-2xl) + 64px) 0 var(--space-xl);
}

.hero-float {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: floatVertical 7s ease-in-out infinite, morphBlob 12s ease-in-out infinite;
}

.hero-float--1 {
  width: 280px;
  height: 280px;
  background: rgba(232, 129, 92, 0.08);
  top: 10%;
  right: -5%;
  animation-delay: 0s, 0s;
}

.hero-float--2 {
  width: 160px;
  height: 160px;
  background: rgba(91, 158, 140, 0.1);
  top: 60%;
  right: 15%;
  animation-delay: 1s, 2s;
}

.hero-float--3 {
  width: 200px;
  height: 200px;
  background: rgba(232, 129, 92, 0.06);
  top: 55%;
  left: -5%;
  animation-delay: 2s, 1s;
}

.hero-float--4 {
  width: 120px;
  height: 120px;
  background: rgba(91, 158, 140, 0.08);
  top: 20%;
  left: 10%;
  animation-delay: 3s, 3s;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-label-row {
  margin-bottom: var(--space-md);
}

.hero-availability {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-xs);
  letter-spacing: 0.04em;
  color: var(--color-text-dim);
  padding: 6px 14px;
  border: 1px solid var(--color-border);
  border-radius: 100px;
  background: var(--color-surface);
}

.hero-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-accent-secondary);
  box-shadow: 0 0 6px rgba(91, 158, 140, 0.4);
}

.hero-title {
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-sm);
  max-width: 900px;
  color: var(--color-text);
}

.hero-role-row {
  margin-bottom: var(--space-md);
}

.hero-role {
  font-size: clamp(1rem, 2.5vw, 1.35rem);
  color: var(--color-text-muted);
  letter-spacing: 0.02em;
}

.hero-role-sep {
  margin: 0 0.4em;
  color: var(--color-accent);
  opacity: 0.5;
}

.hero-role-accent {
  color: var(--color-accent);
  font-style: italic;
}

.hero-rule {
  width: 64px;
  height: 2px;
  background: var(--color-accent);
  margin-bottom: var(--space-md);
  transform-origin: left;
  animation: underlineGrow 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) both;
  animation-delay: 0.55s;
}

.hero-lead {
  max-width: 500px;
  margin-bottom: var(--space-lg);
  font-size: 1.1rem;
}

.hero-scroll-link {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  color: var(--color-text-dim);
  transition: color 0.3s ease;
}

.hero-scroll-link:hover {
  color: var(--color-accent);
}

.hero-arrow {
  animation: bounceDown 2s ease-in-out infinite;
  opacity: 0.5;
}

@keyframes bounceDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}

@media (min-width: 640px) {
  .hero-lead {
    font-size: var(--text-lg);
  }
}
</style>
