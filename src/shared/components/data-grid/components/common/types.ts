import type { Dispatch, SetStateAction } from 'react'

export type CommonColumnDef<T extends Record<string, unknown>> = {
  id: keyof T
  label?: string
  width?: string
}

export interface TextColumnDef<T extends Record<string, unknown>>
  extends CommonColumnDef<T> {
  type: 'text'
}

export interface DateColumnDef<T extends Record<string, unknown>>
  extends CommonColumnDef<T> {
  type: 'date'
}

export type ColumnDef<T extends Record<string, unknown>> =
  | TextColumnDef<T>
  | DateColumnDef<T>

export type UseColumnsControllerProps<T extends Record<string, unknown>> = {
  columns: Array<ColumnDef<T>>
}

export type UseRowsControllerProps<T extends Record<string, unknown>> = {
  rows: Array<T>
}

export type ColumnsControllerResult<T extends Record<string, unknown>> =
  readonly [
    Array<ColumnDef<T>>,
    Dispatch<SetStateAction<Array<ColumnDef<T>>>>,
    Record<string, ColumnDef<T>>,
  ]

export type RowsControllerResult<T extends Record<string, unknown>> = readonly [
  Array<T>,
  Dispatch<SetStateAction<Array<T>>>,
]

type SortingOrder = 'asc' | 'desc'
type SortingDef<T extends Record<string, unknown>> = {
  id: keyof T
  order: SortingOrder
  value: T
}

export type DataGridProps<TData extends Record<string, unknown>> = {
  columns: Array<ColumnDef<TData>>
  onSortChange?: (model: Array<SortingDef<TData>>) => void
  rows: Array<TData>
  sorting?: Array<SortingDef<TData>>
}
