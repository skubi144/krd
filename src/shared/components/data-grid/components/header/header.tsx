import { useColumns } from '@/shared/components/data-grid/components/controllers/data-grid.context.tsx'

export const Header = () => {
  const state = useColumns()
  const [columns] = state

  return (
    <div>
      {columns.map((column) => (
        <div key={column.id.toString()}>{column.label}</div>
      ))}
    </div>
  )
}
