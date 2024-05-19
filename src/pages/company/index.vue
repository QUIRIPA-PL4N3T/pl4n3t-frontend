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
        <div class="flex flex-col md:flex-row gap-4 justify-between">
          <div class="w-full flex md:w-1/6 align-middle justify-center">
            <a :href="company.website!" target="_blank">
              <img v-if="company.logo_absolute_url" :src="company.logo_absolute_url!" :alt="company.name" class="max-w-[300px]" style="width: 100%;">
              <img v-else :src="`https://ui-avatars.com/api/?background=a0a0a0&size=128&name=${company.name}`" alt="" class="rounded-full">
            </a>
          </div>
          <div class="md:w-3/6">
            <h5 class="pb-3">
              {{ company.name }}
            </h5>
            <table class="text-sm w-full md:w-auto">
              <tbody>
                <tr>
                  <td class="font-bold">
                    {{ t('general.nit') }}:
                  </td>
                  <td class="px-4 text-right md:text-left">
                    {{ company.nit }}
                  </td>
                </tr>
                <tr>
                  <td class="font-bold">
                    {{ t('company.size') }}:
                  </td>
                  <td class="px-4 text-right md:text-left">
                    {{ company.size_name }}
                  </td>
                </tr>
                <tr>
                  <td class="font-bold">
                    {{ t('general.industry_type') }}:
                  </td>
                  <td class="px-4 text-right md:text-left">
                    {{ company.industry_type_name }}
                  </td>
                </tr>
                <tr>
                  <td class="font-bold">
                    {{ t('general.economic_sector') }}:
                  </td>
                  <td class="px-4 text-right md:text-left">
                    {{ company.economic_sector_name }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="w-full md:w-2/6">
            <h5 class="pb-3">
              {{ t('company.contact') }}
            </h5>
            <div class="flex flex-col text-sm">
              <p>
                <span class="font-bold">
                  {{ t('company.email') }}:
                </span><a class="text-sky-600 ps-2" :href="`mailto:${company!.email!}`">{{ company!.email! }}</a>
              </p>
              <p><span class="font-bold">{{ t('company.phone') }}</span> {{ company.phone }}</p>
              <span>{{ t('company.address') }}</span>
              <span>{{ company.address }}</span>
              <span>{{ `${company.city_name}, ${company.state_name}` }}</span>
              <span class="uppercase">
                {{ `${company.country_name}` }}
              </span>
            </div>
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
              v-if="brand.logo_absolute_url"
              :src="brand.logo_absolute_url"
              alt="{{ brand.name }}"
              image-class="rounded-md border-2 border-slate-300 w-[163px] object-contain object-center"
            />
            <Image
              v-else
              :src="`https://placehold.co/400x400?text=${brand.name}`"
              :alt="brand.name"
              height="h-full"
              image-class="rounded-md border-2 border-slate-300 w-[163px] object-contain object-center"
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

      <!-- Company Membership -->
      <Card v-if="company.id" :title="`${t('membership.currentTitle')}: ${company.membership.membership.name}`">
        <div class="flex flex-col w-full align-middle justify-center">
          <p class="flex flex-col text-sm">
            <span>{{ `${t('membership.locationLimit')}: ${company.membership.membership.num_locations}` }}</span>
            <span>{{ `${t('membership.brandsLimit')}: ${company.membership.membership.num_brands}` }}</span>
            <span>{{ `${t('membership.userLimit')}: ${company.membership.membership.num_users}` }} </span>
            <span>{{ `${t('membership.endDate')}: ${company.membership.end_date}` }} </span>
            <span>{{ `${t('membership.daysRemaining')}: ${company.membership.days_remaining}` }} </span>
            <a href="#" class="font-light text-sky-400">{{ t('membership.changePlan') }} </a>
          </p>
        </div>
      </Card>

      <!-- Company Membership -->
      <Card v-if="company.id" :title="t('company.members')">
        <template #header>
          <button type="button" class="btn btn-dark btn-sm">
            {{ t('company.addMember') }}
          </button>
        </template>
        <div v-for="member in company.members_roles" :key="member.user_email">
          <div>
            {{ member.user_email }}
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
