import styles from './components/common/data-grid.module.scss'
import type { DataGridProps } from '@/shared/components/data-grid/components/common/types.ts'
import type { FC, PropsWithChildren } from 'react'
import { Header } from '@/shared/components/data-grid/components/header/header.tsx'
import { Rows } from '@/shared/components/data-grid/components/rows/rows.tsx'
import { RowsSkeleton } from '@/shared/components/data-grid/components/rows/rows-skeleton.tsx'
import { Cards } from '@/shared/components/data-grid/components/cards/cards.tsx'
import { testId } from '@/shared/components/data-grid/components/common/test_utils/testid.ts'

const {
  dataGrid: { empty },
} = testId

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
      <div data-testid={empty} className={styles['data-grid__row--empty']}>
        Brak Danych
      </div>
    ),
    rows,
  } = props

  if (rows.length === 0 && !loading && EmptyComponent) {
    return (
      <DataGridWrapper>
        {view === 'data-grid' && <Header {...props} />}
        {EmptyComponent}
        <div role="status" aria-live="polite" className="sr-only">
          Brak danych
        </div>
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
          {loading ? (
            <>
              <RowsSkeleton />
              <div role="status" aria-live="polite" className="sr-only">
                Ładowanie danych
              </div>
            </>
          ) : (
            <Rows {...props} />
          )}
        </>
      )}
    </DataGridWrapper>
  )
}
