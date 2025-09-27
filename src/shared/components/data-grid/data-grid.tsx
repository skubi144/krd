import styles from './components/common/data-grid.module.scss'
import type { DataGridProps } from '@/shared/components/data-grid/components/common/types.ts'
import { Header } from '@/shared/components/data-grid/components/header/header.tsx'
import { Rows } from '@/shared/components/data-grid/components/rows/rows.tsx'

export const DataGrid = <
  TData extends Record<string, unknown> = Record<string, unknown>,
>(
  props: DataGridProps<TData>,
) => {
  return (
    <div className={styles['data-grid']}>
      <Header {...props} />
      <Rows {...props} />
    </div>
  )
}
