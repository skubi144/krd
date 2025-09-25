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
  // console.log( value)
  // const valueToRender = isValidElement(value) ? value : ''
  //
  //
  //
  // return <div>{valueToRender}</div>
  switch (columnDef.type) {
    case 'date':
      return value as string
    case 'text':
      return value as string
    default:
      return ''
  }
}

export const Rows = () => {
  const columnsState = useColumns()
  const rowsState = useRows()
  const [rows] = rowsState
  const [columns] = columnsState

  return rows.map((row, id) => (
    <div key={id}>
      {columns.map((column) => (
        <Cell key={column.id} columnId={column.id} value={row[column.id]} />
      ))}
    </div>
  ))
}
