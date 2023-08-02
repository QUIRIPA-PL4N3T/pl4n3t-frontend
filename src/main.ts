import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { plugin as VueTippy } from 'vue-tippy'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { createPinia } from 'pinia'
import { defaultConfig, plugin } from '@formkit/vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import './styles/tailwind.css'
import './assets/scss/auth.scss'
import './assets/scss/tailwind.scss'
import 'vue-good-table-next/dist/vue-good-table-next.css'
import 'element-plus/dist/index.css'
import { i18n } from './modules/index'
import isAuthGuard from './guard/authGuard'
import { setup } from '~/core'
import config from '~/formkit.config.js'

// import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)
const pinia = createPinia()

const routes = setupLayouts(generatedRoutes)

routes.forEach((route) => {
  if (route.path.includes('/dashboard'))
    route.beforeEnter = [isAuthGuard]
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(plugin, defaultConfig(config))
app.use(ElementPlus)
app.use(
  VueTippy,
  // optional
  {
    directive: 'tippy', // => v-tippy
    component: 'tippy', // => <tippy/>
    componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
    defaultProps: {
      placement: 'auto-end',
      allowHTML: true,
    }, // => Global default options * see all props
  },
)

app.config.globalProperties.$store = {}
app.mount('#app')
setup()
