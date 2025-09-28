import type {
  CellProps,
  ValueRenderer,
} from '@/shared/components/data-grid/components/common/types.ts'
import styles from '@/shared/components/data-grid/components/common/data-grid.module.scss'

const formatter = new Intl.DateTimeFormat('pl-PL', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

const timeRenderer: ValueRenderer = (value) => {
  if (typeof value === 'string') {
    return formatter.format(new Date(value))
  }
  if (typeof value === 'number' || value instanceof Date) {
    return formatter.format(value)
  }
  return ''
}

export const Cell = <T extends Record<string, unknown>>(
  props: CellProps<T>,
) => {
  const { value, columnId, columns } = props
  const [_, _2, hash] = columns
  const columnDef = hash[columnId]

  if (columnDef.render) {
    return (
      <div className={styles['data-grid__cell']}>{columnDef.render(value)}</div>
    )
  }

  switch (columnDef.type) {
    case 'date':
      return <div className={styles['data-grid__cell']}>{timeRenderer(value)}</div>
    case 'text':
      return <div className={styles['data-grid__cell']}>{value as string}</div>
    default:
      return ''
  }
}
