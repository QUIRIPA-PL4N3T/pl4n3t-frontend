<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const emissionFactorStore = useEmissionFactorStore()
const { statistics } = storeToRefs(emissionFactorStore)

const sedes = [
  { label: '1' },
]

const show = $ref<boolean[]>([])
function toggleGraphVisibility(index: number) {
  show[index] = !show[index]
}
</script>

<template>
  <div>
    <div class="grid grid-cols-12 gap-5 mb-5 bg-">
      <div class="col-span-12 bg-transparent ">
        <div class="grid col-span-1 gap-5 ">
          <div v-for="(item, i) in statistics" :key="i" class="py-[10px] px-4 rounded-[6px] shadow" :class="item.bg">
            <p class=" m-2 uppercase font-bold">
              {{ item.title }}
            </p>
            <div class=" lg:flex">
              <div class="flex-1">
                <div class=" flex justify-between items-center h-36 bg-white lg:p-8  p-4 rounded-3xl shadow">
                  <div class="flex flex-col h-full justify-between text-xl font-bold">
                    <p>
                      123,5
                    </p>
                    <p>Ton CO2e</p>
                  </div>
                  <img
                    class=" h-14 "
                    src="https://static.vecteezy.com/system/resources/previews/009/372/149/non_2x/cloud-illustration-design-elements-for-web-interface-weather-forecast-or-cloud-storage-applications-white-clouds-set-isolated-on-blue-background-vector-illustration-clouds-silhouettes-free-png.png"
                    alt=""
                  >
                </div>
              </div>
              <div class=" lg:hidden h-px w-4/5 bg-black-400 border-dotted border-2 m-auto mt-4 mb-4" />
              <div class="mt-4 mb-5 lg:ml-6 lg:mr-6">
                <div class="flex mb-8">
                  <p class=" mr-2 font-bold text-6xl lg:text-4xl ">
                    5
                  </p>
                  <p>Sedes registradas</p>
                </div>
                <div class="flex flex-row items-end">
                  <p class=" mr-2 font-bold text-6xl lg:text-4xl">
                    110
                  </p>
                  <p>Fuentes de emision en invierno</p>
                </div>
              </div>
              <div class=" lg:hidden h-px w-4/5 bg-black-400 border-dotted border-2 m-auto mt-4 mb-4 " />
              <div class="flex-1">
                <div class=" flex-col justify-between items-center  bg-white lg:p-8  p-4 rounded-3xl shadow-xl">
                  <div class="flex flex-row justify-end mb-1">
                    <p>Progreso</p>
                  </div>
                  <div v-for="company in item.companies" :key="company.name">
                    <div class="flex justify-between">
                      <div class=" flex justify-start items-start">
                        <img class=" h-7  mr-2 " src="https://cdn-icons-png.flaticon.com/512/4844/4844589.png" alt="">
                        <p> {{ company.name }}</p>
                      </div>
                      <div class=" w-36 lg:w-32 ">
                        <div class="absolute h-4 w-36 bg-black-300 rounded lg:w-32" />
                        <div :class="`relative h-4 z-10 w-${company.progress} bg-red-600 rounded `" />
                        <p
                          class=" relative z-10 bottom-[15px] left-[110px] text-xs text-black-500 font-bold lg:left-[92px] "
                        >
                          {{ company.progress }}%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p v-if="!show[i]" class="m-2" @click="toggleGraphVisibility(i)">
              Ver graficas
            </p>
            <p v-if="show[i]" class="m-2" @click="toggleGraphVisibility(i)">
              Ocultar grafica
            </p>
            <div v-if="show[i]" class=" flex flex-col p-3 m-2">
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
