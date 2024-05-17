<script setup lang="ts">
import { storeToRefs } from 'pinia'

const companyStore = useCompanyStore()
const { company } = storeToRefs(companyStore)
const router = useRouter()

const { t } = useI18n()

function goEditCompany() {
  router.push({ name: 'company-edit', params: { id: 0 } })
}

function goEditBrand(id: number) {
  router.push({
    name: 'brand-edit',
    params: { id },
  })
}
</script>

<template>
  <div class="w-full h-full">
    <div class="lg:col-span-4 col-span-12 space-y-5 text-gray-700">
      <Card v-if="company.id !== 0" :title="company.name">
        <template #header>
          <button type="button" class="btn btn-dark btn-sm" @click.prevent="goEditCompany">
            {{ t('company.edit') }}
          </button>
        </template>
        <div class="flex flex-col md:flex-row gap-4">
          <div class="w-full flex md:w-1/6 align-middle justify-center">
            <a :href="company.website!" target="_blank">
              <img v-if="company.logo_absolute_url" :src="company.logo_absolute_url!" :alt="company.name" class="max-w-[300px]" style="width: 100%;">
              <img v-else :src="`https://ui-avatars.com/api/?background=a0a0a0&size=128&name=${company.name}`" alt="" class="rounded-full">
            </a>
          </div>
          <div class="w-full md:w-3/6">
            <h5>{{ t('company.contact') }}</h5>
            <p>{{ company.address }}</p>
            <p>{{ `${company.city_name}, ${company.state_name}` }}</p>
            <p class="uppercase">
              {{ `${company.country_name}` }}
            </p>
            <p>{{ `${t('company.phone')}: ${company.phone}` }}</p>
            <p>{{ `${t('company.email')}: ${company.email}` }}</p>
          </div>
          <div class="flex flex-col w-full md:w-2/6 align-middle justify-center">
            <span class="font-bold text-sky-400">{{ t('membership.title') }} {{ company.membership.membership.name }}</span>
            <p>{{ `${t('membership.locationLimit')}: ${company.membership.membership.num_locations}` }}</p>
            <p>{{ `${t('membership.brandsLimit')}: ${company.membership.membership.num_brands}` }}</p>
            <p>{{ `${t('membership.userLimit')}: ${company.membership.membership.num_users}` }} </p>
            <a href="#" class="font-light text-sky-400">{{ t('membership.changePlan') }} </a>
          </div>
        </div>
      </Card>
      <!-- EmptyCompanyCard.vue -->
      <Card v-else>
        <div class="empty-card flex gap-4">
          <img
            src="https://ui-avatars.com/api/?background=a0a0a0&size=128&name=+"
            alt=""
            class="rounded-full"
            width="128"
            height="128"
          >
          <div>
            <h4 class="card-title text-slate-900 dark:text-white">
              No hay ninguna compañía registrada.
            </h4>
            <p class="text-sm font-light dark:text-slate-400">
              Agrega tu primera compañía haciendo clic en el botón a continuación.
            </p>
            <button class="btn inline-flex justify-center btn-dark mt-3" @click.prevent="goEditCompany">
              Agregar Compañía
            </button>
          </div>
        </div>
      </Card>

      <!-- Company Brands -->
      <Card :title="t('brand.title') ">
        <div
          class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5"
        >
          <button
            v-for="(brand, i) in company.brands"
            :key="i"
            class="relative flex items-center justify-center"
            @click.prevent="goEditBrand(brand.id)"
          >
            <Image
              :src="brand.logo_absolute_url"
              alt="{{ brand.name }}"
              image-class="rounded-md border-2 border-slate-300 w-[163px] h-[163px] object-contain object-center p-3"
            />
          </button>
          <div>
            <div class="relative">
              <button
                class="relative flex items-center justify-center"
                @click.prevent="goEditBrand(0)"
              >
                <img
                  src="https://ui-avatars.com/api/?background=EEEEEE&size=163&name=+"
                  :alt="t('general.new')"
                  class="max-w-full block rounded-md border-2 border-slate-200"
                >
                <Icon icon="heroicons-outline:plus" class="absolute z-10 bg-white p-1 rounded-full text-4xl" />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<route lang="yaml">
name: company
meta:
  layout: sidebar
  requiresAuth: true
</route>
