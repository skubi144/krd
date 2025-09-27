import { z } from 'zod'

export const debtorSearchSchema = z.object({
  phrase: z.string().min(3).optional(),
})