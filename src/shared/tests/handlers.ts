import { HttpResponse, http, delay } from 'msw'
import { debtList } from '@/shared/tests/fixtures/debts-list.ts'
import { filteredDebtList } from '@/shared/tests/fixtures/filtered-debts-list.ts'

export const handlers = [
  http.get('**/Recruitment/GetTopDebts', async () => {
    await delay(300)
    return HttpResponse.json(debtList)
  }),
  http.post('**/Recruitment/GetFilteredDebts', async () => {
    await delay(300)
    return HttpResponse.json(filteredDebtList)
  }),
]
