<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Brand } from '~/api-client'

const props = defineProps<{ id?: string }>()

const { t } = useI18n()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const companyStore = useCompanyStore()
const { company, currentBrand } = storeToRefs(companyStore)

async function save(data: any) {
  const requestData: Brand = {
    id: currentBrand.value.id,
    company: company.value.id,
    name: data.name,
    description: data.description,
    logo_absolute_url: '',
    logo: data.logo.length > 0 ? data.logo[0].file : null,
  }
  await companyStore.saveBrand(requestData)
}

async function deleteBrand(id: number) {
  await companyStore.deleteBrand(id)
}

watch(() => user.value, () => {
  if (user.value)
    companyStore.fetchBrand(Number(props.id))
})

companyStore.fetchBrand(Number(props.id))
</script>

<template>
  <div class="xl:col-span-2">
    <Card :title="currentBrand.name">
      <div class="flex flex-row gap-4">
        <!-- Image Column -->
        <div class="w-full md:w-1/2 flex justify-center">
          <Image
            :src="currentBrand.logo_absolute_url"
            alt="{{ brand.name }}"
            image-class="rounded-md border-1 border-slate-300 w-[300px] h-[300px] object-contain object-center"
          />
        </div>
        <!-- Form Column -->
        <div class="w-full md:w-1/2">
          <FormKit
            v-model="currentBrand"
            type="form"
            :actions="false"
            :incomplete-message="false"
            @submit="save"
          >
            <div class="flex flex-col w-full pb-3">
              <FormKit
                type="text"
                name="name"
                :label="t('brand.name')"
                validation="required|length:3"
                placeholder="..."
              />
              <FormKit
                type="text"
                name="description"
                :label="t('brand.description')"
                placeholder="..."
              />
              <FormKit
                type="file"
                name="logo"
                accept=".jpg,.png,.pdf"
                :label="t('brand.logo')"
                multiple="false"
                placeholder="..."
              />
            </div>
            <div class="flex justify-end gap-2 pr-9">
              <Button :text="t('delete')" btn-class="btn-danger" @click="deleteBrand(currentBrand.id)" />
              <div class="space-y-5">
                <Button :text="t('save')" btn-class="btn-dark" />
              </div>
            </div>
          </FormKit>
        </div>
      </div>
    </Card>
  </div>
</template>

<route lang="yaml">
path: '/brand-edit/:id'
name: brand-edit
meta:
  layout: sidebar
  requiresAuth: true
</route>
