import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DataGrid } from '@/shared/components/data-grid/data-grid.tsx'
import {
  testColumns,
  testRows,
} from '@/shared/components/data-grid/components/common/test_utils/data.ts'
import { testId } from '@/shared/components/data-grid/components/common/test_utils/testid.ts'

const {
  dataGrid: { empty },
  rows: { rowSkeleton },
  card,
} = testId

describe('DataGrid tests', () => {
  it('renders empty state when there are no rows and not loading', () => {
    render(
      <DataGrid rows={[]} columns={testColumns} idKey="id" view="data-grid" />,
    )

    screen.getByRole('status')
    screen.getByTestId(empty)
    expect(screen.queryByRole('row')).not.toBeInTheDocument()
  })

  it('renders header and rows when data is present', () => {
    render(
      <DataGrid
        rows={testRows}
        columns={testColumns}
        idKey="id"
        view="data-grid"
      />,
    )

    const headers = screen.getAllByRole('columnheader')
    const rows = screen.getAllByRole('row')

    expect(headers).toHaveLength(testColumns.columns.length)
    expect(rows).toHaveLength(testRows.length)
  })

  it('renders skeleton and loading status when loading is true', () => {
    render(
      <DataGrid
        loading
        rows={testRows}
        columns={testColumns}
        idKey="id"
        view="data-grid"
      />,
    )

    screen.getByRole('status')
    expect(screen.getAllByTestId(rowSkeleton))
  })

  it('renders cards view correctly', () => {
    render(
      <DataGrid
        rows={testRows}
        columns={testColumns}
        idKey="id"
        view="cards"
      />,
    )

    screen.getByTestId(card)
    expect(screen.getAllByRole('row')).toHaveLength(testRows.length)
  })

  it('renders EmptyComponent when provided explicitly', () => {
    const testid = 'empty-test'
    const Empty = <div data-testid={testid}>no data</div>

    render(
      <DataGrid
        rows={[]}
        columns={testColumns}
        idKey="id"
        view="data-grid"
        EmptyComponent={Empty}
      />,
    )

    expect(screen.getByTestId(testid)).toBeInTheDocument()
  })
})
