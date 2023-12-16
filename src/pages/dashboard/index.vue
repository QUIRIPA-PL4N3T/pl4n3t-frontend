<script setup lang="ts">
import { storeToRefs } from 'pinia'

const emissionFactorStore = useEmissionFactorStore()
const companyStore = useCompanyStore()
const { statistics } = storeToRefs(emissionFactorStore)
const { company } = storeToRefs(companyStore)

const show = $ref<boolean[]>([])
function toggleGraphVisibility(index: number) {
  show[index] = !show[index]
}
</script>

<template>
  <div>
    <div class="bg- grid grid-cols-12 mb-5 gap-5">
      <div class="col-span-12 bg-transparent">
        <div class="grid col-span-1 gap-5">
          <div v-for="(item, i) in statistics" :key="i" class="rounded-[6px] px-4 py-[10px] shadow" :class="item.bg">
            <p class="m-2 font-bold uppercase">
              {{ item.title }}
            </p>
            <div class="lg:flex">
              <div class="flex-1">
                <div class="h-36 flex items-center justify-between rounded-3xl bg-white p-4 shadow lg:p-8">
                  <div class="h-full flex flex-col justify-between text-xl font-bold">
                    <p>
                      0
                    </p>
                    <p>Ton CO2e</p>
                  </div>
                  <img
                    class="h-14"
                    src="https://static.vecteezy.com/system/resources/previews/009/372/149/non_2x/cloud-illustration-design-elements-for-web-interface-weather-forecast-or-cloud-storage-applications-white-clouds-set-isolated-on-blue-background-vector-illustration-clouds-silhouettes-free-png.png"
                    alt=""
                  >
                </div>
              </div>
              <div class="bg-black-400 m-auto mb-4 mt-4 h-px w-4/5 border-2 border-dotted lg:hidden" />
              <div class="mb-5 mt-4 lg:ml-6 lg:mr-6">
                <div class="mb-8 flex">
                  <p class="mr-2 text-6xl font-bold lg:text-4xl">
                    {{ company.locations.length }}
                  </p>
                  <p>Sedes registradas</p>
                </div>
                <div class="flex flex-row items-end">
                  <p class="mr-2 text-6xl font-bold lg:text-4xl">
                    0
                  </p>
                  <p>Fuentes de emisión en invierno</p>
                </div>
              </div>
              <div class="bg-black-400 m-auto mb-4 mt-4 h-px w-4/5 border-2 border-dotted lg:hidden" />
              <div class="flex-1">
                <div class="flex-col items-center justify-between rounded-3xl bg-white p-4 shadow-xl lg:p-8">
                  <div class="mb-1 flex flex-row justify-end">
                    <p>Progreso</p>
                  </div>
                  <div v-for="location in item.companies" :key="location.name">
                    <div class="flex justify-between">
                      <div class="flex items-start justify-start">
                        <img class="mr-2 h-7" src="https://cdn-icons-png.flaticon.com/512/4844/4844589.png" alt="">
                        <p> {{ location.name }}</p>
                      </div>
                      <div class="w-36 lg:w-32">
                        <div class="bg-black-300 absolute h-4 w-36 rounded lg:w-32" />
                        <div :class="`relative h-4 z-10 w-${location.progress} bg-red-600 rounded `" />
                        <p
                          class="text-black-500 relative bottom-[15px] left-[110px] z-10 text-xs font-bold lg:left-[92px]"
                        >
                          {{ location.progress }}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p v-if="!show[i]" class="m-2" @click="toggleGraphVisibility(i)">
              Ver gráficas
            </p>
            <p v-if="show[i]" class="m-2" @click="toggleGraphVisibility(i)">
              Ocultar gráfica
            </p>
            <div v-if="show[i]" class="m-2 flex flex-col p-3">
              <chart-bar :id="`chart${i}`" />
            </div>
          </div>
        </div>
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
