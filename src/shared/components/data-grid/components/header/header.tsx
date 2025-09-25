import styles from '../common/data-grid.module.scss'
import { useColumns } from '@/shared/components/data-grid/components/controllers/data-grid.context.tsx'

export const Header = () => {
  const state = useColumns()
  const [columns] = state

  return (
    <div
      className={styles["data-grid__header"]}
      style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
    >
      {columns.map((column) => (
        <div
          className={styles["data-grid__header-cell"]}
          key={column.id.toString()}>{column.label}</div>
      ))}
    </div>
  )
}
