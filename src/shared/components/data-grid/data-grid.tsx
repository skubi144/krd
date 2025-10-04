import styles from './components/common/data-grid.module.scss'
import type { DataGridProps } from '@/shared/components/data-grid/components/common/types.ts'
import type { FC, PropsWithChildren } from 'react'
import { Header } from '@/shared/components/data-grid/components/header/header.tsx'
import { Rows } from '@/shared/components/data-grid/components/rows/rows.tsx'
import { RowsSkeleton } from '@/shared/components/data-grid/components/rows/rows-skeleton.tsx'
import { Cards } from '@/shared/components/data-grid/components/cards/cards.tsx'

const DataGridWrapper: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles['data-grid']}>{children}</div>
)

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
    return (
      <DataGridWrapper>
        <RowsSkeleton />
      </DataGridWrapper>
    )
  }

  if (rows.length === 0 && EmptyComponent) {
    return (
      <DataGridWrapper>
        {view === 'data-grid' && <Header {...props} />}
        {EmptyComponent}
      </DataGridWrapper>
    )
  }

  return (
    <DataGridWrapper>
      {view === 'cards' ? (
        <Cards {...props} />
      ) : (
        <>
          <Header {...props} />
          <Rows {...props} />
        </>
      )}
    </DataGridWrapper>
  )
}
