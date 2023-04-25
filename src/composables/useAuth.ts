function useAuth() {
  const ISSERVER = typeof window === 'undefined'
  const authStore = useAuthStore()
  const router = useRouter()

  const checkAuth = () => {
    const user = !ISSERVER ? JSON.parse(localStorage.getItem('currentUser') || '{}') : null
    return { isAuthenticate: true }
  }

  const logoutUser = async () => {
    authStore.logout()
    router.push('/auth/login')
  }
  return { checkAuth, logoutUser }
}

export default useAuth
