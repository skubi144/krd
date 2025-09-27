import styles from '../common/data-grid.module.scss'
import type { Key } from 'react'
import type { RowsProps } from '@/shared/components/data-grid/components/common/types.ts'
import { getGridColumnStyleDef } from '@/shared/components/data-grid/components/common/utils.ts'
import { Cell } from '@/shared/components/data-grid/components/cell/cell.tsx'

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
            <Cell
              key={column.id as Key}
              columnId={column.id.toString()}
              value={row[column.id]}
              columns={columnsState}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
