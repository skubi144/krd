import { useQuery } from '@tanstack/react-query'
import type { Debt } from '@/shared/integrations/models'
import type { ApiError } from '@/shared/api/fetchApi.ts'
import { filteredDebtsQuery } from '@/shared/integrations/queries/debts/queries.ts'

export const useFilteredDebts = (phrase?: string) =>
  useQuery<Array<Debt>, ApiError<undefined>>(filteredDebtsQuery(phrase))
