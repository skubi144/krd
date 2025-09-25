import styles from '../common/data-grid.module.scss'
import { useColumns } from '@/shared/components/data-grid/components/controllers/data-grid.context.tsx'
import { getGridColumnStyleDef } from '@/shared/components/data-grid/components/common/utils.ts'

export const Header = () => {
  const state = useColumns()
  const [columns] = state
  console.log(getGridColumnStyleDef(columns))
  return (
    <div
      className={styles["data-grid__header"]}
      style={getGridColumnStyleDef(columns)}
    >
      {columns.map((column) => (
        <div
          className={styles["data-grid__header-cell"]}
          key={column.id.toString()}>{column.label}</div>
      ))}
    </div>
  )
}
