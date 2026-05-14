import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export function useScrollReveal(options = {}) {
  const { direction = 'up', delay = 0, threshold = 0.12, once = true } = options

  const target = ref(null)
  const isVisible = ref(false)

  const transformMap = {
    up: 'translateY(36px)',
    left: 'translateX(-36px)',
    right: 'translateX(36px)',
  }

  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isVisible.value = true
        if (once) stop()
      } else if (!once) {
        isVisible.value = false
      }
    },
    { threshold }
  )

  const revealStyle = {
    '--reveal-delay': `${delay}ms`,
    '--reveal-from': transformMap[direction] || transformMap.up,
  }

  return { target, isVisible, revealStyle }
}
