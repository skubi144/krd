import { useQuery } from '@tanstack/react-query'
import type { Debt } from '@/shared/integrations/models'
import type { ApiError } from '@/shared/api/fetchApi.ts'
import { topDebtsQuery } from '@/shared/integrations/queries/debts/queries.ts'

export const useTopDebts = () =>
  useQuery<Array<Debt>, ApiError<undefined>>(topDebtsQuery())
