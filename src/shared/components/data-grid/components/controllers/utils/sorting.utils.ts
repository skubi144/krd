import type {
  ColumnComparer,
  ColumnDef,
  ColumnType,
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

const defaultNumberComparer: ColumnComparer = (a, b) => {
  const numA = Number(a)
  const numB = Number(b)

  const isValidA = !isNaN(numA)
  const isValidB = !isNaN(numB)

  if (isValidA && isValidB) {
    return numA - numB
  }

  if (isValidA) return -1
  if (isValidB) return 1

  return 0
}

export const defaultCompare: Record<ColumnType, ColumnComparer> = {
  date: defaultDateComparer,
  text: defaultTextComparer,
  number: defaultNumberComparer,
}

export const sortRows = <T extends Record<string, unknown>>(
  rowsDef: Array<T>,
  columnsHash: Record<keyof T, ColumnDef<T>>,
  sortingModelDef: Array<SortingDef<T>> = [],
) => {
  if (!sortingModelDef.length) return rowsDef

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const getCompare = <K extends keyof T>(
    col: ColumnDef<T>,
  ): ((a: T[K], b: T[K]) => number) => col.compare ?? defaultCompare[col.type]

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

export const changeSortingModel = <T extends Record<string, unknown>>(
  columnId: keyof T,
  sortingModelDef: Array<SortingDef<T>>,
) => {
  const nextSortingModelDef = [...sortingModelDef]
  const sortingModelId = sortingModelDef.findIndex(
    (model) => model.id === columnId,
  )

  if (sortingModelId < 0) {
    nextSortingModelDef.push({ id: columnId, order: 'asc' })
    return nextSortingModelDef
  }
  const newSortingModel = { ...sortingModelDef[sortingModelId] }

  switch (newSortingModel.order) {
    case 'asc':
      newSortingModel.order = 'desc'
      nextSortingModelDef.splice(sortingModelId, 1, newSortingModel)
      break
    case 'desc':
      nextSortingModelDef.splice(sortingModelId, 1)
      break
    default:
  }

  return nextSortingModelDef
}
