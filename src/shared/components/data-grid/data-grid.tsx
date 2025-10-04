import styles from './components/common/data-grid.module.scss'
import type { DataGridProps } from '@/shared/components/data-grid/components/common/types.ts'
import { Header } from '@/shared/components/data-grid/components/header/header.tsx'
import { Rows } from '@/shared/components/data-grid/components/rows/rows.tsx'
import { RowsSkeleton } from '@/shared/components/data-grid/components/rows/rows-skeleton.tsx'
import { Cards } from '@/shared/components/data-grid/components/cards/cards.tsx'

export const DataGrid = <
  TData extends Record<string, unknown> = Record<string, unknown>,
>(
  props: DataGridProps<TData>,
) => {
  const {
    loading,
    view,
    EmptyComponent = (
      <div className={styles['data-grid__row--empty']}>Brak Danych</div>
    ),
    rows,
  } = props

  if (loading) {
    return <RowsSkeleton />
  }

  if (rows.length === 0 && EmptyComponent) {
    return (
      <div className={styles['data-grid']}>
        {view === 'data-grid' && <Header {...props} />}
        {EmptyComponent}
      </div>
    )
  }

  return (
    <div className={styles['data-grid']}>
      {view === 'cards' ? (
        <Cards {...props} />
      ) : (
        <>
          <Header {...props} />
          <Rows {...props} />
        </>
      )}
    </div>
  )
}
