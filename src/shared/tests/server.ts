import { setupServer } from 'msw/node'
import { handlers } from '@/shared/tests/handlers.ts'

export const server = setupServer(...handlers)
