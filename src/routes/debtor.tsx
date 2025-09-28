import { createFileRoute } from '@tanstack/react-router'
import { DebtorView } from '@/modules/debt/list/debtor-view.tsx'
import {
  debtorSearchSchema,
  sortingDebtorSchema,
} from '@/modules/debt/list/schema.ts'

export const Route = createFileRoute('/debtor')({
  component: RouteComponent,
  validateSearch: debtorSearchSchema.extend(sortingDebtorSchema.shape),
  errorComponent: () => <>Something went wrong</>,
})

function RouteComponent() {
  return <DebtorView />
}
