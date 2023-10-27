import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useWindow() {
  const windowData = {
    width: ref<number>(window.innerWidth),
    height: ref<number>(0),
  }

  function handleResize() {
    try {
      windowData.width.value = window.innerWidth
    }
    catch (error) {
      console.error(error)
    }
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  return { windowData }
}
