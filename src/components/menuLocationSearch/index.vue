<template>
    <div @click=" visible = !visible" id="search"
        class=" flex justify-between cursor-pointer rounded border ml-1 mr-1 h-10 flex items-center p-3">
        <p> {{ selectItem }}</p>
        <i class="fa-solid fa-arrow-down"></i>
    </div>
    <div v-if="visible" id="menu"
        class="` w-[${openClass}] bg-white  h-[300px]  pl-2 pr-2 pt-1 rounded shadow-lg  mb-2 ml-2 mt-2  `">
        <div v-if="showSearch" class="flex items-center border rounded-lg  py-1">
            <input v-model="search" class=" p-1 w-full outline-none" type="text" placeholder="Buscar..." />
            <i class="mr-2 fas fa-search text-gray-500"></i>
        </div>
        <div :class="['overflow-y-scroll', showSearch ? 'h-[240px]' : 'h-[280px]']">
            <div @click="selectItem = company.name; visible = !visible; search = ''; companyStore.fetchCurrentLocation(company)"
                class=" hover:bg-black-600 mt-1 p-2 rounded cursor-pointer hover:text-white flex items-center"
                v-for="company in filterSede()">
                <i class="fa-solid fa-building"></i>
                <p class="ml-2">{{ company.name }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const companyStore = useCompanyStore()
const { company } = storeToRefs(companyStore)
const { items, value, showSearch = true } = defineProps<{ items: Array<any>, value?: string, showSearch?: Boolean }>()
let visible = $ref<Boolean>(false);
let search = $ref<String>("")
let selectItem = $ref<String>(value ?? company.value.name)


function filterSede() {
    const query = search.toLocaleLowerCase()
    if (search == "") {
        return items
    }
    return items.filter((campus) => {
        return Object.values(campus).some((word => String(word).toLocaleLowerCase().includes(query)))
    })
}
</script>