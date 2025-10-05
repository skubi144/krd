import { HttpResponse, http } from 'msw'
import { debtList } from '@/shared/tests/fixtures/debts-list.ts'

export const handlers = [
  http.get('**/Recruitment/GetTopDebts', () => {
    return HttpResponse.json(debtList)
  }),
  http.get('**/Recruitment/GetFilteredDebts', () => {
    return HttpResponse.json(debtList)
  }),
]
