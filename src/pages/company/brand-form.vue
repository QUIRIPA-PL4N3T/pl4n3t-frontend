<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Brand } from '~/api-client'

const props = defineProps<{ id?: string }>()

const { t } = useI18n()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const companyStore = useCompanyStore()
const { company, currentBrand } = storeToRefs(companyStore)
const confirmModal = ref<any>(null)
const router = useRouter()

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
  companyStore.fetchBrand(currentBrand.value.id)
}

watch(() => user.value, () => {
  if (user.value)
    companyStore.fetchBrand(Number(props.id))
})

watch(() => company.value, () => {
  if (company.value)
    router.push({ name: 'company' })
})

function closeModal() {
  if (confirmModal.value)
    confirmModal.value.closeModal()
}

companyStore.fetchBrand(Number(props.id))
</script>

<template>
  <div class="xl:col-span-2">
    <Card :title="currentBrand.name || t('brands.newBrand')">
      <div class="flex flex-col lg:flex-row gap-4 pt-10 px-8">
        <!-- Image Column -->
        <div class="w-full lg:w-1/2 flex justify-center">
          <Image
            v-if="currentBrand.id !== 0 && currentBrand.logo_absolute_url"
            :src="currentBrand.logo_absolute_url"
            alt="{{ brand.name }}"
            height="h-full"
            image-class="rounded-md border-1 border-slate-300 w-full md:w-[350px] lg:w-[400px]object-contain object-center"
          />
          <Image
            v-else
            src="https://placehold.co/600x400?text=logo"
            alt="{{ brand.name }}"
            height="h-full"
            image-class="rounded-md border-1 border-slate-300 w-full md:p-4 md:w-[350px] md:w-[400px object-contain object-center"
          />
        </div>
        <!-- Form Column -->
        <div class="w-full lg:w-1/2 justify-center items-center">
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
                validation="required"
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
            <div class="flex justify-end gap-2 pt-6">
              <Modal
                v-if="currentBrand.id !== 0"
                ref="confirmModal"
                :title="t('company.delete.Brand')"
                :label="t('delete')"
                label-class="btn-danger"
                theme-class="bg-danger-500"
              >
                <div class="text-base text-slate-600 dark:text-slate-300">
                  {{ t('company.brand.delete.message') }}
                </div>
                <template #footer>
                  <Button
                    :text="t('cancel')"
                    btn-class="btn-dark"
                    @click="closeModal"
                  />
                  <Button
                    :text="t('Accept')"
                    btn-class="btn-danger"
                    @click="deleteBrand(currentBrand.id)"
                  />
                </template>
              </Modal>
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
