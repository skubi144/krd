import type { Debt } from '@/shared/integrations/models'
import { fetchApi } from '@/shared/api/fetchApi.ts'

export const topDebtsQuery = (phrase?: string) => ({
  queryKey: ['debt', 'top', phrase],
  queryFn: () =>
    fetchApi<Array<Debt>, undefined>({
      url: '/api/Recruitment/GetTopDebts',
    }),
  enabled: !phrase,
  placeholderData: [],
})

export const filteredDebtsQuery = (phrase?: string) => ({
  queryKey: ['debt', 'filtered', phrase],
  queryFn: () =>
    fetchApi<Array<Debt>, undefined>({
      url: '/api/Recruitment/GetFilteredDebts',
      method: 'POST',
      body: { phrase },
    }),
  enabled: !!phrase,
  placeholderData: [],
})
