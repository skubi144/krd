import { createFileRoute } from '@tanstack/react-router'
import { DebtorList } from '@/modules/debtor/list/debtor-list'

export const Route = createFileRoute('/debtor')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DebtorList />
}
