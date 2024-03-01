import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'
import 'vue-good-table-next/dist/vue-good-table-next.css'
import '~/styles/css/tailwind.css'
import '~/styles/scss/tailwind.scss'
import '~/styles/scss/index.scss'
import '~/styles/css/main.css'
import { setup } from '~/core'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx: any) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    // Get initial data
    setup()
  },
)
