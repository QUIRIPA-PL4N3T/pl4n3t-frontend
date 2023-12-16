import { useAuthStore } from '~/stores/auth'

async function isAuthenticatedGuard(to: any, from: any, next: any) {
  const requiredAuth = to.meta.auth
  const authStore = useAuthStore()
  if (authStore.isAuthenticated)
    return next()

  if ((requiredAuth || authStore.isAuthenticated))
    next()
  else next('/auth/login')
}

export default isAuthenticatedGuard
