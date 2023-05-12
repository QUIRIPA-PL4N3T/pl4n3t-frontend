<script setup lang="ts">
const { t } = useI18n()

const company = {
  name: 'NOIRLab',
  contact: 'Jon Doe',
  logo: 'https://noirlab.edu/public/media/archives/logos/svg/logo006.svg',
  address: '950 N. Cherry Ave. Tucson, AZ 85719, USA',
  country: 'USA',
  postalCode: 'AZ 85719',
  estate: 'Tucson',
  phone: 'Tel: +1 520 318 8000',
  email: 'info@noirlab.edu',
  url: 'https://noirlab.edu/public',
  membership: {
    locationLimit: 5,
    workersLimit: 50,
  },
}
</script>

<template>
  <div class="w-full h-full">
    <div class="lg:col-span-4 col-span-12 space-y-5">
      <Card :title="company.name">
        <template #header>
          <button type="button" class="btn btn-dark btn-sm">
            {{ t('company.edit') }}
          </button>
        </template>
        <div class="flex flex-col md:flex-row gap-4">
          <div class="w-full flex md:w-1/6 align-middle justify-center">
            <a :href="company.url">
              <img :src="company.logo" :alt="company.name" class="max-w-[300px]" style="width: 100%;">
            </a>
          </div>
          <div class="w-full md:w-3/6">
            <h5>{{ t('company.contact') }}</h5>
            <p>{{ company.address }}</p>
            <p>{{ `${company.estate}, ${company.postalCode}, ${company.country}` }}</p>
            <p>{{ `${t('company.phone')}: ${company.phone}` }}</p>
            <p>{{ `${t('company.email')}: ${company.email}` }}</p>
          </div>
          <div class="flex flex-col w-full md:w-2/6 align-middle justify-center">
            <a href="#" class="font-bold text-sky-400">{{ t('membership.title') }}</a>
            <p>{{ `${t('membership.locationLimit')}: ` }} {{ company.membership.locationLimit }}</p>
            <p>{{ `${t('membership.workersLimit')}: ` }} {{ company.membership.locationLimit }}</p>
          </div>
        </div>
      </Card>

      <Card :title="t('locations.title')" noborder>
        <template #header>
          <DropEvent />
        </template>
        <div class="-mx-6" />
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
