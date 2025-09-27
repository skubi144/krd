import { useMemo, useState } from 'react'
import type {
  ColumnDef,
  ColumnsControllerResult,
} from '@/shared/components/data-grid/components/common/types.ts'

export const useColumnsController = <T extends Record<string, unknown>>(
  columnsDef: Array<ColumnDef<T>>,
): ColumnsControllerResult<T> => {
  const state = useState<Array<ColumnDef<T>>>(() => columnsDef)
  const [columns, setColumns] = state

  return useMemo(() => {
    const entries = columnsDef.map(
      (columnDef) => [columnDef.id, columnDef] as const,
    )
    const hash = Object.fromEntries(entries) as Record<keyof T, ColumnDef<T>>

    return [columns, setColumns, hash] as const
  }, [columns])
}
