import { useCallback, useEffect, useMemo, useState, useTransition } from 'react'
import type {
  ColumnDef,
  OnSortChangeHandler,
  SortingControllerResult,
  SortingDef,
  SortingHash,
} from '@/shared/components/data-grid/components/common/types.ts'
import {
  changeSortingModel,
  sortRows,
} from '@/shared/components/data-grid/components/controllers/utils/sorting.utils.ts'

export const useSortingController = <T extends Record<string, unknown>>(
  rowsDef: Array<T>,
  columnsHash: Partial<Record<keyof T, ColumnDef<T>>>,
  initialSortingModelDef: Array<SortingDef<T>> = [],
): SortingControllerResult<T> => {
  const [sortedRows, setSortedRows] = useState<Array<T>>(() => rowsDef)
  const [sorting, setSorting] = useState<Array<SortingDef<T>>>(
    () => initialSortingModelDef,
  )
  const [busy, startTransition] = useTransition()

  useEffect(() => {
    startTransition(() => {
      setSortedRows(sortRows(rowsDef, columnsHash, sorting))
    })
  }, [rowsDef, columnsHash])

  const onSortChange = useCallback<OnSortChangeHandler<T>>(
    (columnId) => {
      startTransition(() => {
        const nextSortingDef = changeSortingModel(columnId, sorting)
        const nextSortedRows = sortRows(rowsDef, columnsHash, nextSortingDef)

        setSortedRows(nextSortedRows)
        setSorting(nextSortingDef)
      })
    },
    [sorting, sortedRows],
  )

  return useMemo<SortingControllerResult<T>>(() => {
    const entries = sorting.map(
      (sortingDef, index) => [sortingDef.id, { ...sortingDef, index }] as const,
    )
    const hash = Object.fromEntries(entries) as Partial<
      Record<keyof T, SortingHash<T>>
    >

    return { rows: sortedRows, onSortChange, sorting, sortingHash: hash, busy }
  }, [sortedRows, sorting, onSortChange, busy])
}
