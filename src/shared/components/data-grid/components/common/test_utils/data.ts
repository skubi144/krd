import type {
  ColumnDef,
  ColumnsControllerResult,
} from '@/shared/components/data-grid/components/common/types'

export type TestRow = {
  id: number
  text: string
  number: number
  date: string
  custom: string
}

export const textColumn: ColumnDef<TestRow> = { id: 'text', type: 'text', label: 'text' }
export const numberColumn: ColumnDef<TestRow> = { id: 'number', type: 'number', label: 'number' }
export const dateColumn: ColumnDef<TestRow> = { id: 'date', type: 'date', label: 'date' }
export const customColumn: ColumnDef<TestRow> = {
  id: 'custom',
  type: 'text',
  label: 'custom',
  render: (v: unknown) => `custom:${v}`,
}

export const testColumns: ColumnsControllerResult<TestRow> = {
  columns: [textColumn, numberColumn, dateColumn, customColumn],
  columnsHash: {
    text: textColumn,
    number: numberColumn,
    date: dateColumn,
    custom: customColumn,
  },
}

export const testRows: Array<TestRow> = [
  {
    id: 1,
    text: 'Alice',
    number: 42,
    date: '2025-10-05',
    custom: 'foo',
  },
  {
    id: 2,
    text: 'Bob',
    number: 13,
    date: '2024-05-01',
    custom: 'bar',
  },
]
