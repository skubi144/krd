import type { CellProps } from '@/shared/components/data-grid/components/common/types.ts'
import styles from '@/shared/components/data-grid/components/common/data-grid.module.scss'

export const Cell = <T extends Record<string, unknown>>(
  props: CellProps<T>,
) => {
  const { value, columnId, columns } = props
  const [_, _2, hash] = columns
  const columnDef = hash[columnId]

  switch (columnDef.type) {
    case 'date':
      return <div className={styles['data-grid__cell']}>{value as string}</div>

    case 'text':
      return <div className={styles['data-grid__cell']}>{value as string}</div>

    default:
      return ''
  }
}
