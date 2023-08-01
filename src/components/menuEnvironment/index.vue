<template>
    <div @click=" visible = !visible" id="search"
        class=" flex justify-between cursor-pointer rounded border ml-1 mr-1 h-10 flex items-center p-3">
        <p> {{ selectItem }}</p>
        <i class="fa-solid fa-arrow-down"></i>
    </div>
    <div v-if="visible" id="menu"
        class="` w-[${openClass}] bg-white    pl-2 pr-2 pt-1 rounded shadow-lg  mb-2 ml-2 mt-2  `">

        <div class="overflow-y-scroll h-[150px]">
            <div @click="selectItem = environment;  environmentStore.fetchEnvironment(enviro) "
                :class="['hover:bg-black-600 mt-1 p-2 rounded cursor-pointer hover:text-white flex items-center', selectItem == environment ? 'bg-black-600 text-white' : ' bg-white' ]"
                v-for="environment in getEnvironments">
                <i class="fa-solid fa-building"></i>
                <p class="ml-2">{{ environment }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const environmentStore = useEnvironmentStore()
const { getEnvironments } = storeToRefs(environmentStore)
let visible = $ref<Boolean>(true);
let selectItem = $ref<String>('Gestiona')


</script>