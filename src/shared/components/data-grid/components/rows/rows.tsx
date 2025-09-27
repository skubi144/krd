import styles from '../common/data-grid.module.scss'
import type { Key } from 'react'
import type {
  ColumnsControllerResult,
  RowsProps,
} from '@/shared/components/data-grid/components/common/types.ts'
import { getGridColumnStyleDef } from '@/shared/components/data-grid/components/common/utils.ts'

type CellProps<TData extends Record<string, unknown>> = {
  columns: ColumnsControllerResult<TData>
  columnId: string
  value?: unknown
}
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

export const Rows = <T extends Record<string, unknown>>(
  props: RowsProps<T>,
) => {
  const { rows, columns: columnsState } = props

  const [columns] = columnsState

  return (
    <div className={styles['data-grid__rows']}>
      {rows.map((row) => (
        <div
          key={row['id'] as Key}
          className={styles['data-grid__row']}
          style={getGridColumnStyleDef(columns)}
        >
          {columns.map((column) => (
            // @ts-ignore
            <Cell
              key={column.id as Key}
              columnId={column.id}
              value={row[column.id]}
              columns={columnsState}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
