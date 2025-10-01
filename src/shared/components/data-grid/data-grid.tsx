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
  const { loading, view } = props

  if (loading) {
    return <div>{view === 'cards' ? <RowsSkeleton /> : <RowsSkeleton />}</div>
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
