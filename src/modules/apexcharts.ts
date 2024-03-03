import type { UserModule } from '~/types'

const DynamicChart = defineAsyncComponent(() => import('vue3-apexcharts'))

export const install: UserModule = ({ app }) => {
  if (typeof window !== 'undefined') {
    app.use(DynamicChart)
    app.component('Apexchart', DynamicChart)
  }
}
