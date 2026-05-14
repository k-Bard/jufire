<template>
  <div class="app-shell">
    <div class="parallax-bg" aria-hidden="true">
      <div class="parallax-layer parallax-layer--1" :style="layer1Style"></div>
      <div class="parallax-layer parallax-layer--2" :style="layer2Style"></div>
      <div class="parallax-layer parallax-layer--3" :style="layer3Style"></div>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGlobalParallax } from '@/composables/useParallax'

const { offset: globalOffset } = useGlobalParallax(0.02)

const layer1Style = computed(() => ({
  transform: `translateY(${globalOffset.value * 1.5}px)`,
}))

const layer2Style = computed(() => ({
  transform: `translateY(${-globalOffset.value * 0.8}px)`,
}))

const layer3Style = computed(() => ({
  transform: `translateY(${globalOffset.value * 2.2}px) rotate(${globalOffset.value * 0.01}deg)`,
}))
</script>

<style>
.app-shell {
  position: relative;
}

.parallax-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.parallax-layer {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.45;
}

.parallax-layer--1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(232, 129, 92, 0.25), transparent 70%);
  top: -10%;
  left: -10%;
}

.parallax-layer--2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(91, 158, 140, 0.2), transparent 70%);
  top: 50%;
  right: -15%;
}

.parallax-layer--3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(232, 129, 92, 0.15), transparent 70%);
  top: 80%;
  left: 30%;
}

.page-enter-active {
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.page-leave-active {
  transition: opacity 0.25s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.page-leave-to {
  opacity: 0;
}
</style>
