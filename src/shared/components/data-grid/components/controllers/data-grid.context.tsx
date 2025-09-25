import { createContext, useContext } from 'react'
import type { PropsWithChildren } from 'react'
import type {
  ColumnsControllerResult,
  DataGridProps,
  RowsControllerResult,
} from '@/shared/components/data-grid/components/common/types.ts'
import { useRowsController } from '@/shared/components/data-grid/components/controllers/useRowsController.tsx'
import { useColumnsController } from '@/shared/components/data-grid/components/controllers/useColumnsController.tsx'

const ColumnsContext = createContext<unknown>(undefined)
const RowsContext = createContext<unknown>(undefined)

export const DataGridContext = <TData extends Record<string, unknown>>(
  props: PropsWithChildren<DataGridProps<TData>>,
) => {
  const { children, rows, columns } = props
  const columnsController = useColumnsController(columns)
  const rowsController = useRowsController(rows)

  return (
    <ColumnsContext.Provider value={columnsController}>
      <RowsContext.Provider value={rowsController}>
        {children}
      </RowsContext.Provider>
    </ColumnsContext.Provider>
  )
}
export function useColumns<T extends Record<string, unknown>>() {
  const ctx = useContext(ColumnsContext)

  if (!ctx) throw new Error('ColumnsContext not provided')

  return ctx as ColumnsControllerResult<T>
}

export function useRows<T extends Record<string, unknown>>() {
  const ctx = useContext(RowsContext)

  if (!ctx) throw new Error('RowsContext not provided')

  return ctx as RowsControllerResult<T>
}
