import type { CellProps } from '@/shared/components/data-grid/components/common/types.ts'
import styles from '@/shared/components/data-grid/components/common/data-grid.module.scss'
import { timeRenderer } from '@/shared/components/data-grid/components/cell/utils.ts'

export const Cell = <T extends Record<string, unknown>>(
  props: CellProps<T>,
) => {
  const { value, columnId, columns } = props
  const { columnsHash } = columns
  const columnDef = columnsHash[columnId]

  if (columnDef.render) {
    return (
      <div className={styles['data-grid__cell']}>{columnDef.render(value)}</div>
    )
  }

  switch (columnDef.type) {
    case 'date':
      return (
        <div className={styles['data-grid__cell']}>{timeRenderer(value)}</div>
      )
    case 'text':
      return <div className={styles['data-grid__cell']}>{value as string}</div>
    default:
      return ''
  }
}
