import type { Dispatch, ReactNode, SetStateAction } from 'react'

export type ColumnComparer = (a: unknown, b: unknown) => number
export type ValueRenderer = (value: unknown) => ReactNode
export type CommonColumnDef<T extends Record<string, unknown>> = {
  id: keyof T
  label?: string
  width?: string
  render?: ValueRenderer
}

export interface TextColumnDef<T extends Record<string, unknown>>
  extends CommonColumnDef<T> {
  type: 'text'
  compare?: ColumnComparer
}

export interface DateColumnDef<T extends Record<string, unknown>>
  extends CommonColumnDef<T> {
  type: 'date'
  compare?: ColumnComparer
}

export interface NumberColumnDef<T extends Record<string, unknown>>
  extends CommonColumnDef<T> {
  type: 'number'
  compare?: ColumnComparer
}

export type ColumnDef<T extends Record<string, unknown>> =
  | TextColumnDef<T>
  | DateColumnDef<T>
  | NumberColumnDef<T>

export type ColumnType = ColumnDef<Record<string, unknown>>['type']

export type UseColumnsControllerProps<T extends Record<string, unknown>> = {
  columns: Array<ColumnDef<T>>
}

export type UseRowsControllerProps<T extends Record<string, unknown>> = {
  rows: Array<T>
}

export type ColumnsControllerResult<T extends Record<string, unknown>> = {
  columns: Array<ColumnDef<T>>
  columnsHash: Record<keyof T, ColumnDef<T>>
}

export type RowsControllerResult<T extends Record<string, unknown>> = readonly [
  Array<T>,
  Dispatch<SetStateAction<Array<T>>>,
]

export type SortingOrder = 'asc' | 'desc'
export type SortingDef<T extends Record<string, unknown>> = {
  id: keyof T
  order: SortingOrder
}

export type OnSortChangeHandler<T extends Record<string, unknown>> = (
  columnId: keyof T,
) => void

export type SortingHash<T extends Record<string, unknown>> = {
  index: number
} & SortingDef<T>

export type SortingControllerResult<T extends Record<string, unknown>> = {
  rows: Array<T>
  sorting: Array<SortingDef<T>>
  sortingHash: Partial<Record<keyof T, SortingHash<T>>>
  onSortChange: OnSortChangeHandler<T>
  busy: boolean
}

export type DataGridView = 'data-grid' | 'cards'
export type UseListControllerResult<TData extends Record<string, unknown>> = {
  columns: ColumnsControllerResult<TData>
  onSortChange?: OnSortChangeHandler<TData>
  rows: Array<TData>
  sorting?: Array<SortingDef<TData>>
  sortingHash?: Partial<Record<keyof TData, SortingHash<TData>>>
  loading?: boolean
  view?: DataGridView
}
export interface DataGridProps<TData extends Record<string, unknown>>
  extends UseListControllerResult<TData> {
  EmptyComponent?: ReactNode
  idKey: keyof TData
}

export type UseListControllerProps<TData extends Record<string, unknown>> = {
  columns: Array<ColumnDef<TData>>
  rows: Array<TData>
  initialSorting?: Array<SortingDef<TData>>
}

export type HeaderProps<TData extends Record<string, unknown>> = {
  columns: ColumnsControllerResult<TData>
  onSortChange?: OnSortChangeHandler<TData>
  sorting?: Array<SortingDef<TData>>
  sortingHash?: Partial<Record<keyof TData, SortingHash<TData>>>
  direction?: 'horizontal' | 'vertical'
}

export type RowsProps<TData extends Record<string, unknown>> = {
  columns: ColumnsControllerResult<TData>
  rows: Array<TData>
  idKey: keyof TData
}

export type CellProps<TData extends Record<string, unknown>> = {
  columns: ColumnsControllerResult<TData>
  columnId: string
  value?: unknown
}
