import type { Debt } from '@/shared/integrations/models'
import { fetchApi } from '@/shared/api/fetchApi.ts'

export const topDebtsQuery = () => ({
  queryKey: ['debt', 'top'],
  queryFn: () =>
    fetchApi<Array<Debt>, undefined>({
      url: '/api/Recruitment/GetTopDebts',
    }),
  initialData:[]
})
