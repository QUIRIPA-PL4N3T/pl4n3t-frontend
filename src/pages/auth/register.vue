<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import logo from '~/assets/images/logo.png'
import { handleError } from '~/utilities/utils'

const { t } = useI18n()
const authStore = useAuthStore()
const checkbox = ref<boolean>(false)
const router = useRouter()
const selectedCheckBox = $ref<boolean>(false)
let dialogVisible = $ref(false)
let errorMessage = $ref('')

function showPassword(node: any) {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

async function onSubmit(value: any) {
  try {
    await authStore.createUser(value)
    dialogVisible = true
  }
  catch (error) {
    errorMessage = t(handleError(error))
  }
}

function dialogConfirm() {
  dialogVisible = false
  router.push('/auth/login')
}
</script>

<template>
  <div class="loginwrapper bg-cover bg-no-repeat bg-center auth-background">
    <div class="lg-inner-column">
      <div class="left-columns lg:w-1/2 lg:block hidden">
        <div class="logo-box-3">
          <Logo :image="logo" class="w-3/4 max-w-[384px]" />
        </div>
      </div>
      <div class="lg:w-1/2 w-full flex flex-col items-center justify-center">
        <div class="auth-box-3">
          <div class="mobile-logo text-center mb-6 lg:hidden block">
            <Logo :image="logo" class="h-16 mt-8 m-auto" />
          </div>
          <div class="text-center 2xl:mb-10 mb-5">
            <h4
              class="font-medium text-2xl text-slate-900 dark:text-white mb-3"
            >
              {{ t('register.title') }}
            </h4>
            <div class="text-slate-500 dark:text-slate-400 text-base">
              {{ t('register.description') }}
            </div>
          </div>
          <el-alert v-if="errorMessage" :title="errorMessage" type="error" show-icon />
          <FormKit type="form" :actions="false" autocomplete="off" :incomplete-message="false" @submit="onSubmit">
            <FormKit
              type="text"
              autocomplete="first_name"
              name="first_name"
              :label="t('register.first-name')"
              validation="required|length:3"
              outer-class="mb-6"
            />
            <FormKit
              type="text"
              name="last_name"
              :label="t('register.last-name')"
              validation="required|length:3"
              outer-class="mb-6"
            />

            <FormKit
              type="text"
              autocomplete="email"
              name="email"
              :label="t('email')"
              placeholder="jondoe@email.com"
              validation="required|email"
              outer-class="mb-6"
            />

            <FormKit
              type="password"
              name="password"
              :label="t('password')"
              placeholder="********"
              validation="required|length:8"
              validation-visibility="live"
              outer-class="mb-7"
              suffix-icon="eyeClosed"
              @suffix-icon-click="showPassword"
            />
            <CheckBoxAuth
              :label="t('register.checkBox')"
              :value="false"
              :model-value="checkbox"
              class="mt-3"
              @on-selected="selectedCheckBox = !selectedCheckBox"
            />
            <div class="border-transparent hover:border-slate-900 border-2 rounded mt-10">
              <FormKit
                type="submit"
                :label="t('register.buttonLogin')"
                :classes="{
                  input: '$reset w-[99%] flex justify-center items-center justify-items-center h-11 bg-slate-900 text-white  rounded m-0.5',
                  wrapper: '$reset',
                  outer: '$reset',
                }"
              />
            </div>
          </FormKit>

          <SignInSocial class=" mt-5 mb-10" />
          <div class="flex justify-center items-center mt-7">
            <label class=" text-gray-500 text-sm mr-2">{{ t('register.footer') }}</label>
            <RouterLink class=" flex justify-center items-center" to="/auth/login">
              <label class=" text-sm">{{ t('register.link') }}</label>
            </RouterLink>
          </div>
        </div>
      </div>

      <el-dialog v-model="dialogVisible" :title="t('register.success')" width="30%" center>
        <span>
          {{ t('register.account-activation') }}
        </span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">{{ t('cancel') }}</el-button>
            <el-button type="primary" @click="dialogConfirm()">
              {{ t('confirm') }}
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<style>
.formkit-suffix-icon {
  @apply ml-3;
}
</style>
