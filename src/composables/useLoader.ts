import { useLoaderStore } from '~/stores/loader'

export function useLoader() {
  const loader = useLoaderStore()
  return {
    setLoading: (isLoading: boolean) => {
      loader.setLoading(isLoading)
    },
  }
}
