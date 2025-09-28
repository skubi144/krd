import { z } from 'zod'

export const debtorSearchSchema = z.object({
  phrase: z.string().min(3).optional(),
})

export const sortingDebtorSchema = z.object({
  sorting: z
    .array(
      z.object({
        id: z.enum([
          'Id',
          'Name',
          'NIP',
          'Date',
          'Value',
          'Address',
          'DocumentType',
          'Price',
          'Number',
        ]),
        order: z.enum(['asc', 'desc']),
      }),
    )
    .optional(),
})
