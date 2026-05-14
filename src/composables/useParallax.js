import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useParallax(options = {}) {
  const {
    factor = 0.1,
    direction = 'vertical',
    clamp = true,
  } = options

  const scrollY = ref(0)
  const elementY = ref(0)
  const elementRef = ref(null)

  let ticking = false

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        scrollY.value = window.scrollY
        if (elementRef.value) {
          const rect = elementRef.value.getBoundingClientRect()
          elementY.value = rect.top + window.scrollY
        }
        ticking = false
      })
      ticking = true
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    scrollY.value = window.scrollY
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  const offset = computed(() => {
    if (direction === 'vertical') {
      const raw = (scrollY.value - elementY.value) * factor
      return clamp ? Math.max(-60, Math.min(60, raw)) : raw
    }
    return scrollY.value * factor
  })

  const transformStyle = computed(() => ({
    transform: `translateY(${offset.value}px)`,
    transition: 'transform 0.1s linear',
  }))

  return {
    scrollY,
    elementRef,
    offset,
    transformStyle,
  }
}

let globalScrollY = null
let globalListenerCount = 0

function createGlobalListener() {
  const scrollY = ref(0)
  let ticking = false

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        scrollY.value = window.scrollY
        ticking = false
      })
      ticking = true
    }
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', onScroll, { passive: true })
    scrollY.value = window.scrollY
  }

  return { scrollY, cleanup: () => window.removeEventListener('scroll', onScroll) }
}

export function useGlobalParallax(factor = 0.05) {
  if (!globalScrollY) {
    const instance = createGlobalListener()
    globalScrollY = instance.scrollY
  }
  globalListenerCount++

  const offset = computed(() => globalScrollY.value * factor)

  onUnmounted(() => {
    globalListenerCount--
    if (globalListenerCount <= 0 && globalScrollY) {
      globalScrollY = null
      globalListenerCount = 0
    }
  })

  return { scrollY: globalScrollY, offset }
}
