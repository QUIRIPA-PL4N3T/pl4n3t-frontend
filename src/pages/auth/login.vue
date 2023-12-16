<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { ElAlert } from 'element-plus'
import { handleError } from '~/utilities/utils'

const authStore = useAuthStore()
const router = useRouter()
const checkbox = ref<boolean>(false)
const typeInput = $ref<string>('password')
const { isAuthenticated } = storeToRefs(authStore)
const { t } = useI18n()

let errorMessage = $ref('')

function showPassword(node: any) {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
  node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

async function login(value: any) {
  try {
    await authStore.logIn(value)
    if (isAuthenticated.value)
      router.push('/dashboard')
  }
  catch (error: any) {
    errorMessage = handleError(error)
  }
}
</script>

<template>
  <div class="loginwrapper auth-background">
    <div class="lg-inner-column">
      <div class="left-columns hidden lg:block lg:w-1/2">
        <div class="logo-box-3">
          <Logo class="max-w-[384px] w-3/4" />
        </div>
      </div>

      <div class="w-full flex flex-col items-center justify-center lg:w-1/2">
        <div class="auth-box-3">
          <div class="mobile-logo mb-6 block text-center lg:hidden">
            <Logo class="m-auto mt-8 h-16" />
          </div>
          <label class="mt-4 flex justify-center text-2xl text-slate-900">{{ t('login.text') }}</label>
          <ElAlert v-if="errorMessage" :title="errorMessage" type="error" show-icon />
          <FormKit
            type="form" :actions="false"
            :incomplete-message="false"
            @submit="login"
          >
            <FormKit
              type="text"
              name="email"
              class="input"
              :label="t('email')"
              placeholder="jondoe@mail.com"
              validation="required|email"
              outer-class="my-6"
            />

            <FormKit
              :type="typeInput"
              name="password"
              :label="t('password')"
              placeholder="********"
              suffix-icon="eyeClosed"
              validation="required|length:8"
              outer-class="mb-4"
              @suffix-icon-click="showPassword"
            />

            <div class="mt-5 flex justify-between">
              <CheckBoxAuth :label="t('login.checkBox')" :model-value="checkbox" :checked="false" :value="false" @on-selected="checkbox = !checkbox" />
              <RouterLink to="/auth/resetPassword">
                <label>{{ t('forgotPassword') }}</label>
              </RouterLink>
            </div>
            <div class="mt-10 border-2 border-transparent rounded hover:border-slate-900">
              <FormKit
                type="submit"
                :label="t('login.buttonLogin')"
                :classes="{
                  input: '$reset w-[99%] flex justify-center items-center justify-items-center h-11 bg-slate-900 text-white  rounded m-0.5',
                  wrapper: '$reset',
                  outer: '$reset',
                }"
              />
            </div>
          </FormKit>
          <SignInSocial class="mb-10 mt-5" />
          <div class="mt-7 flex items-center justify-center">
            <label class="mr-2 text-sm text-gray-500">{{ t('login.footer') }}</label>
            <RouterLink class="flex items-center justify-center" to="/auth/register">
              <label class="text-sm">{{ t('login.link') }}</label>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.auth-background {
  background-image: linear-gradient(135deg, #5c94ff 0%, #9332ff 100%);
}

.formkit-suffix-icon {
  @apply ml-3;
}
</style>
