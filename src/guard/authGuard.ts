import { useAuthStore } from '~/store/auth'

async function isAuthenticatedGuard(to: any, from: any, next: any) {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated && to.path !== '/auth/login')
    next('/auth/login')
  else
    next()
}
export default isAuthenticatedGuard
