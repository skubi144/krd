import { createFileRoute } from '@tanstack/react-router'
import { DebtorView } from '@/modules/debt/list/debtor-view.tsx'
import { topDebtsQuery } from '@/shared/integrations/queries/debts/queries.ts'
import { debtorSearchSchema } from '@/modules/debt/list/schema.ts'

export const Route = createFileRoute('/debtor')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(topDebtsQuery()),
  validateSearch: debtorSearchSchema,
  errorComponent: () => <>Something went wrong</>,
})

function RouteComponent() {
  return <DebtorView />
}
