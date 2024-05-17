<script setup lang="ts">
import { storeToRefs } from 'pinia'
import * as pkg from 'vue-toastification'
import { useI18n } from 'vue-i18n'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import go from '~/assets/images/icons/gp.svg'
import { auth } from '~/config/firebaseConfig'
import { handleError } from '~/utilities/utils'

const { useToast } = pkg
const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()
const { isAuthenticated } = storeToRefs(authStore)
const toast = useToast()
let errorMessage = $ref('')

async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    const idToken = await result.user.getIdToken()

    // Send the token to Firebase ID Token in backend
    await authStore.googleLogin({ token: idToken })

    if (isAuthenticated.value)
      router.push('/dashboard')
  }
  catch (error: any) {
    errorMessage = handleError(error)
    toast.error(errorMessage)
  }
};
</script>

<template>
  <div class=" mt-4">
    <div class="flex justify-between items-center mb-6">
      <div class=" w-2/6 h-0.5 bg-gray-200" />
      <label class=" text-gray-500 ml-1 mr-1 text-xs">{{ t('signInSocial') }}</label>
      <div class="w-2/6  h-0.5 bg-gray-200" />
    </div>
    <div class="flex justify-center">
      <div class=" justify-center items-center w-7/12">
        <ul class="flex justify-center">
          <RouterLink
            class="inline-flex w-10 h-10 bg-red-500 text-white text-2xl flex-col items-center justify-center rounded-full"
            to="#"
            @click.prevent="signInWithGoogle"
          >
            <img :src="go" alt="google">
          </RouterLink>
        </ul>
      </div>
    </div>
  </div>
</template>
