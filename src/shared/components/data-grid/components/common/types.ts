import type { Dispatch, SetStateAction } from 'react'

export type ColumnComparer<T = unknown> = (a: T, b: T) => number
export type CommonColumnDef<T extends Record<string, unknown>> = {
  id: keyof T
  label?: string
  width?: string
}

export interface TextColumnDef<T extends Record<string, unknown>>
  extends CommonColumnDef<T> {
  type: 'text'
  compare?: ColumnComparer<T[CommonColumnDef<T>['id']]>
}

export interface DateColumnDef<T extends Record<string, unknown>>
  extends CommonColumnDef<T> {
  type: 'date'
  compare?: ColumnComparer<T[CommonColumnDef<T>['id']]>
}

export type ColumnDef<T extends Record<string, unknown>> =
  | TextColumnDef<T>
  | DateColumnDef<T>

export type ColumnType = ColumnDef<Record<string, unknown>>['type']

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
    Record<keyof T, ColumnDef<T>>,
  ]

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
}

export type DataGridProps<TData extends Record<string, unknown>> = {
  columns: ColumnsControllerResult<TData>
  onSortChange?: OnSortChangeHandler<TData>
  rows: Array<TData>
  sorting?: Array<SortingDef<TData>>
  sortingHash?: Partial<Record<keyof TData, SortingHash<TData>>>
}

export type UseListControllerProps<TData extends Record<string, unknown>> = {
  columns: Array<ColumnDef<TData>>
  rows: Array<TData>
}

export type HeaderProps<TData extends Record<string, unknown>> = {
  columns: ColumnsControllerResult<TData>
  onSortChange?: OnSortChangeHandler<TData>
  sorting?: Array<SortingDef<TData>>
  sortingHash?: Partial<Record<keyof TData, SortingHash<TData>>>
}

export type RowsProps<TData extends Record<string, unknown>> = {
  columns: ColumnsControllerResult<TData>
  rows: Array<TData>
}
