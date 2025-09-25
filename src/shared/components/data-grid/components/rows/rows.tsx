import styles from '../common/data-grid.module.scss'
import {
  useColumns,
  useRows,
} from '@/shared/components/data-grid/components/controllers/data-grid.context.tsx'

type CellProps = {
  columnId: string
  value?: unknown
}
export const Cell = (props: CellProps) => {
  const { value, columnId } = props
  const [_, _1, hash] = useColumns()
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

export const Rows = () => {
  const columnsState = useColumns()
  const rowsState = useRows()
  const [rows] = rowsState
  const [columns] = columnsState

  return (
    <div className={styles['data-grid__rows']}>
      {rows.map((row, id) => (
        <div
          key={id}
          className={styles['data-grid__row']}
          style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
        >
          {columns.map((column) => (
            <Cell key={column.id} columnId={column.id} value={row[column.id]} />
          ))}
        </div>
      ))}
    </div>
  )
}
