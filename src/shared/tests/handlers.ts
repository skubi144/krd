import { HttpResponse, http } from 'msw'

export const handlers = [
  http.get('**/Recruitment/GetTopDebts', () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
  http.get('**/Recruitment/GetFilteredDebts', () => {
    return HttpResponse.json({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
]
