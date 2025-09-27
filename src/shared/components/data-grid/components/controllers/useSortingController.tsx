import { useCallback, useMemo, useState, useTransition } from 'react'
import type {
  ColumnComparer,
  ColumnDef,
  ColumnType,
  OnSortChangeHandler,
  SortingControllerResult,
  SortingDef,
} from '@/shared/components/data-grid/components/common/types.ts'

const defaultDateComparer: ColumnComparer = (a, b) => {
  // Maybe timestamp
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  }
  // Maybe date
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime()
  }
  // Maybe ISO
  const ta = Date.parse(String(a))
  const tb = Date.parse(String(b))
  return ta - tb
}
const defaultTextComparer: ColumnComparer = (a, b) =>
  String(a).localeCompare(String(b))
const defaultComparer: ColumnComparer = () => 0

// TODO Try change me to map or smth - avoid unnecessary execution context
const defaultCompare = (type: ColumnType): ColumnComparer => {
  switch (type) {
    case 'date':
      return defaultDateComparer
    case 'text':
      return defaultTextComparer
    default:
      return defaultComparer
  }
}

const sortRows = <T extends Record<string, unknown>>(
  rowsDef: Array<T>,
  columnsHash: Record<keyof T, ColumnDef<T>>,
  sortingModelDef: Array<SortingDef<T>> = [],
) => {
  if (!sortingModelDef.length) return rowsDef

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const getCompare = <K extends keyof T>(
    col: ColumnDef<T>,
  ): ((a: T[K], b: T[K]) => number) => col.compare ?? defaultCompare(col.type)

  return [...rowsDef].sort((a, b) => {
    for (const { id, order } of sortingModelDef) {
      const col = columnsHash[id]
      const cmp = getCompare(col)(a[id], b[id])
      if (cmp !== 0) {
        return order === 'asc' ? cmp : -cmp
      }
    }
    return 0
  })
}

const changeSortingModel = <T extends Record<string, unknown>>(
  columnId: keyof T,
  sortingModelDef: Array<SortingDef<T>>,
) => {
  const nextSortingModelDef = [...sortingModelDef]
  const sortingModelId = sortingModelDef.findIndex(
    (model) => model.id === columnId,
  )
  if (sortingModelId < 0) {
    nextSortingModelDef.push({ id: columnId, order: 'asc' })
  }

  const newSortingModel = { ...sortingModelDef[sortingModelId] }

  switch (newSortingModel.order) {
    case 'asc':
      newSortingModel.order = 'desc'
      break
    case 'desc':
      nextSortingModelDef.splice(sortingModelId, 1)
      break
    default:
  }

  return nextSortingModelDef
}

export const useSortingController = <T extends Record<string, unknown>>(
  rowsDef: Array<T>,
  columnsHash: Record<keyof T, ColumnDef<T>>,
  initialSortingModelDef: Array<SortingDef<T>> = [],
): SortingControllerResult<T> => {
  const [sortedRows, setSortedRows] = useState<Array<T>>(() => rowsDef)
  const [sorting, setSorting] = useState<Array<SortingDef<T>>>(
    () => initialSortingModelDef,
  )
  const [_, startTransition] = useTransition()

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
      (sortingDef) => [sortingDef.id, sortingDef] as const,
    )
    const hash = Object.fromEntries(entries) as Partial<
      Record<keyof T, SortingDef<T>>
    >

    return { rows: sortedRows, onSortChange, sorting,sortingHash: hash }
  }, [sortedRows, sorting, onSortChange])
}
