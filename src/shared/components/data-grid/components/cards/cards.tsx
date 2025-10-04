import { Fragment  } from 'react'
import type {Key} from 'react';
import type { RowsProps } from '@/shared/components/data-grid/components/common/types.ts'
import styles from '@/shared/components/data-grid/components/common/data-grid.module.scss'
import { Cell } from '@/shared/components/data-grid/components/cell/cell.tsx'

export const Cards = <T extends Record<string, unknown>>(
  props: RowsProps<T>,
) => {
  const { rows, columns: columnsState } = props
  const { columns } = columnsState

  return (
    <div className={styles['data-grid__rows']}>
      {rows.map((row) => (
        <div
          key={row['Id'] as Key}
          className={styles['data-grid__row']}
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >
          {columns.map((column) => (
            <Fragment key={column.id as Key} >
              <div className={styles['data-grid__header-cell']}>
                {column.label}
              </div>
              <Cell
                key={column.id as Key}
                columnId={column.id.toString()}
                value={row[column.id]}
                columns={columnsState}
              />
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  )
}
