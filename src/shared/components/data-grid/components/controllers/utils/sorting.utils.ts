import type {
  ColumnComparer,
  ColumnDef,
  ColumnType,
  SortingDef,
} from '@/shared/components/data-grid/components/common/types.ts'

const toEpochMs = (v: unknown): number | null => {
  if (v instanceof Date) {
    const t = v.getTime()
    return Number.isFinite(t) ? t : null
  }

  switch (typeof v) {
    case 'number':
      return Number.isFinite(v) ? v : null

    case 'string': {
      const parsed = Date.parse(v)
      return Number.isFinite(parsed) ? parsed : null
    }

    default:
      return null
  }
}

const defaultDateComparer: ColumnComparer = (a, b) => {
  const ta = toEpochMs(a)
  const tb = toEpochMs(b)

  if (ta !== null && tb !== null) return ta - tb
  if (ta !== null) return -1
  if (tb !== null) return 1
  return 0
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

const buildComparator = <T extends Record<string, unknown>>(
  sortingModelDef: Array<SortingDef<T>>,
  columnsHash: Record<keyof T, ColumnDef<T>>,
) => {
  const comparators = sortingModelDef.map(({ id, order }) => {
    const col = columnsHash[id]
    const cmp = col.compare ?? defaultCompare[col.type]
    const factor = order === 'asc' ? 1 : -1

    return (a: T, b: T) => {
      const result = cmp(a[id], b[id])
      return factor * result
    }
  })

  return (a: T, b: T) => {
    for (const cmp of comparators) {
      const result = cmp(a, b)
      if (result !== 0) return result
    }
    return 0
  }
}

export const sortRows = <T extends Record<string, unknown>>(
  rowsDef: Array<T>,
  columnsHash: Record<keyof T, ColumnDef<T>>,
  sortingModelDef: Array<SortingDef<T>> = [],
) => {
  if (!sortingModelDef.length) return rowsDef

  const comparator = buildComparator(sortingModelDef, columnsHash)

  return [...rowsDef].sort(comparator)
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
