import { defineAsyncComponent } from 'vue'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app, isClient }) => {
  if (isClient) {
    const DynamicChart = defineAsyncComponent(() => import('vue3-apexcharts'))
    app.component('Apexchart', DynamicChart)
  }
}
