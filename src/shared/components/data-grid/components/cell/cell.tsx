import type { CellProps } from '@/shared/components/data-grid/components/common/types.ts'
import type { FC, PropsWithChildren } from 'react'
import styles from '@/shared/components/data-grid/components/common/data-grid.module.scss'
import { timeRenderer } from '@/shared/components/data-grid/components/cell/utils.ts'

const CellRenderer: FC<PropsWithChildren> = ({ children }) => (
  <div role={'cell'} className={styles['data-grid__cell']}>
    {children}
  </div>
)

export const Cell = <T extends Record<string, unknown>>(
  props: CellProps<T>,
) => {
  const { value, columnId, columns } = props
  const { columnsHash } = columns
  const columnDef = columnsHash[columnId]

  if (columnDef.render) {
    return <CellRenderer>{columnDef.render(value)}</CellRenderer>
  }

  switch (columnDef.type) {
    case 'date':
      return <CellRenderer>{timeRenderer(value)}</CellRenderer>
    case 'text':
      return <CellRenderer>{value as string}</CellRenderer>
    case 'number':
      return <CellRenderer>{value as number}</CellRenderer>
    default:
      return ''
  }
}
