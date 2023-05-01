import { useLoaderStore } from '~/store/loader'

export function useLoader() {
  const loader = useLoaderStore()
  return {
    setLoading: (isLoading: boolean) => {
      loader.setLoading(isLoading)
    },
  }
}
