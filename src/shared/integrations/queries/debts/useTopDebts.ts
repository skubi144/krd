import { useQuery } from '@tanstack/react-query'
import type { Debt } from '@/shared/integrations/models'
import type { ApiError } from '@/shared/api/fetchApi.ts'
import { fetchApi } from '@/shared/api/fetchApi.ts'

export const useTopDebts = () => {
  const queryFn = () => {
    return fetchApi<Array<Debt>, undefined>({
      url: '/api/Recruitment/GetTopDebts',
    })
  }

  return useQuery<Array<Debt>, ApiError<undefined>>({
    queryFn,
    queryKey: ['debt', 'top'],
    initialData:[]
  })
}
