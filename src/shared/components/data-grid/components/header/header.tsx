import styles from '../common/data-grid.module.scss'
import type { HeaderProps } from '@/shared/components/data-grid/components/common/types.ts'
import { getGridColumnStyleDef } from '@/shared/components/data-grid/components/common/utils.ts'

export const Header = <T extends Record<string, unknown>>(
  props: HeaderProps<T>,
) => {
  const { columns: columnsDef } = props
  const [columns] = columnsDef
  return (
    <div
      className={styles['data-grid__header']}
      style={getGridColumnStyleDef(columns)}
    >
      {columns.map((column) => (
        <div
          className={styles['data-grid__header-cell']}
          key={column.id.toString()}
        >
          {column.label}
        </div>
      ))}
    </div>
  )
}
