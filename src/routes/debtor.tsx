import { createFileRoute, redirect } from '@tanstack/react-router'
import { DebtorView } from '@/modules/debt/view/debtor-view.tsx'
import {
  debtorSearchSchema,
  sortingDebtorSchema,
} from '@/modules/debt/common/schema.ts'

export const Route = createFileRoute('/debtor')({
  component: RouteComponent,
  validateSearch: debtorSearchSchema.extend(sortingDebtorSchema.shape),
  beforeLoad: ({ search }) => {
    if (!search.sorting) {
      throw redirect({
        to: '/debtor',
        search: {
          ...search,
          sorting: [{ id: 'Name', order: 'asc' }],
        },
      })
    }
  },
})

function RouteComponent() {
  return <DebtorView />
}
