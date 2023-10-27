// NOTE: This mixin has been replaced with 'windowMixin.ts'.
// Please use the 'useWindow' mixin from 'windowMixin.ts' for window-related functionality.
// This file is no longer in use and can be safely removed from your project.

export default {
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
    }
  },
  methods: {
    handleResize() {
      try {
        this.window.width = window.innerWidth
      }
      catch (error) {
        console.error(error)
      }
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
}
