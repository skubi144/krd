import clsx from 'clsx'
import styles from '../common/data-grid.module.scss'
import type { HeaderProps } from '@/shared/components/data-grid/components/common/types.ts'
import { getGridColumnStyleDef } from '@/shared/components/data-grid/components/common/utils.ts'

export const Header = <T extends Record<string, unknown>>(
  props: HeaderProps<T>,
) => {
  const {
    columns: columnsDef,
    sortingHash,
    onSortChange,
    direction = 'horizontal',
  } = props
  const [columns] = columnsDef

  return (
    <div
      className={clsx(
        styles['data-grid__header'],
        styles[`data-grid__header--${direction}`],
      )}
      style={getGridColumnStyleDef(columns)}
    >
      {columns.map((column) => (
        <div
          className={styles['data-grid__header-cell']}
          key={column.id.toString()}
          onClick={() => onSortChange?.(column.id)}
        >
          {column.label}

          {sortingHash?.[column.id]?.order}
          {sortingHash?.[column.id]?.index}
        </div>
      ))}
    </div>
  )
}
