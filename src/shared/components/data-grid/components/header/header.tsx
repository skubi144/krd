import clsx from 'clsx'
import styles from '../common/data-grid.module.scss'
import type { KeyboardEvent } from 'react'
import type {
  ColumnDef,
  HeaderProps,
} from '@/shared/components/data-grid/components/common/types.ts'
import { getGridColumnStyleDef } from '@/shared/components/data-grid/components/common/utils.ts'
import {
  ariaSort,
  sortIcon,
} from '@/shared/components/data-grid/components/header/consts.tsx'
import { testId } from '@/shared/components/data-grid/components/common/test_utils/testid.ts'

const {
  header: { sortIndicator },
} = testId

export const Header = <T extends Record<string, unknown>>(
  props: HeaderProps<T>,
) => {
  const {
    columns: columnsDef,
    sortingHash,
    onSortChange,
    direction = 'horizontal',
    sorting,
  } = props
  const { columns } = columnsDef

  const handleKeydown =
    (columnId: ColumnDef<T>['id']) =>
    (event: KeyboardEvent<HTMLDivElement>) => {
      const { key } = event
      if (!['Enter', ' '].includes(key)) return
      event.preventDefault()
      event.stopPropagation()
      onSortChange?.(columnId)
      event.currentTarget.focus()
    }

  const handleClick = (columnId: ColumnDef<T>['id']) => () => {
    onSortChange?.(columnId)
  }

  return (
    <div
      className={clsx(
        styles['data-grid__header'],
        styles[`data-grid__header--${direction}`],
      )}
      style={getGridColumnStyleDef(columns)}
    >
      {columns.map((column) => {
        const { order, index } = sortingHash?.[column.id] ?? {}
        return (
          <div
            role="columnheader"
            aria-label={`Kolumna ${column.label}, kliknij aby posortować`}
            aria-sort={ariaSort[order ?? ''] ?? 'none'}
            tabIndex={0}
            className={styles['data-grid__header-cell']}
            key={column.id.toString()}
            onKeyDown={handleKeydown(column.id)}
            onClick={handleClick(column.id)}
          >
            {column.label}
            {sortIcon[order ?? 'none']}
            {sorting && sorting.length > 1 && index !== undefined ? (
              <sup
                data-testid={sortIndicator}
                aria-label={`Kolumn ${column.label}, priorytet sortowania ${index + 1}`}
              >
                {index + 1}
              </sup>
            ) : (
              <sup aria-hidden={true} />
            )}
          </div>
        )
      })}
    </div>
  )
}
