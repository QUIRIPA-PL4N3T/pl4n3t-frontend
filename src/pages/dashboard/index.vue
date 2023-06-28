<script setup lang="ts">
import { storeToRefs } from 'pinia'
import widget1 from '~/assets/images/all-img/widget-bg-1.png'

const { t } = useI18n()

const emissionFactorStore = useEmissionFactorStore()
const { statistics } = storeToRefs(emissionFactorStore)
</script>

<template>
  <div>
    <div class="grid grid-cols-12 gap-5 mb-5">
      <div class="2xl:col-span-3 lg:col-span-4 col-span-12">
        <div
          class="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
          :style="{
            backgroundImage:
              `url(${widget1})`,
          }"
        >
          <div class="max-w-[169px]">
            <div class="text-xl font-medium text-slate-900 mb-2">
              {{ t('membership.update') }}
            </div>
            <p class="text-sm text-slate-800">
              {{ t('membership.benefits') }}
            </p>
          </div>
          <div
            class="absolute top-1/2 -translate-y-1/2 ltr:right-6 rtl:left-6 mt-2 h-12 w-12 bg-white text-slate-900 rounded-full text-xs font-medium flex flex-col items-center justify-center"
          >
            Now
          </div>
        </div>
      </div>
      <div class="2xl:col-span-9 lg:col-span-8 col-span-12">
        <Card body-class="p-4">
          <div class="grid md:grid-cols-3 col-span-1 gap-4">
            <div
              v-for="(item, i) in statistics"
              :key="i"
              class="py-[18px] px-4 rounded-[6px]"
              :class="item.bg"
            >
              <div class="flex items-center space-x-6 rtl:space-x-reverse">
                <div class="flex-1">
                  <div
                    class="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium"
                  >
                    {{ item.title }}
                  </div>
                  <div
                    class="text-slate-900 dark:text-white text-lg font-medium"
                  >
                    {{ item.count }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: dashboard
meta:
  layout: sidebar
  requiresAuth: true
</route>
