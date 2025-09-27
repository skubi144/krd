import { createFileRoute } from '@tanstack/react-router'
import { DebtorList } from '@/modules/debt/list/debtor-list.tsx'

export const Route = createFileRoute('/debtor')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DebtorList />
}
