import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  testColumns,
  testRows,
} from '@/shared/components/data-grid/components/common/test_utils/data.ts'
import { Rows } from '@/shared/components/data-grid/components/rows/rows.tsx'

describe('Rows tests', () => {
  it('renders the correct number of rows', () => {
    render(<Rows rows={testRows} columns={testColumns} idKey="id" />)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(testRows.length)
  })

  it('renders the correct number of cells per row', () => {
    render(<Rows rows={testRows} columns={testColumns} idKey="id" />)

    const rows = screen.getAllByRole('row')
    rows.forEach(row => {
      const cells = within(row).getAllByRole('cell')
      expect(cells).toHaveLength(testColumns.columns.length)
    })
  })

  it('renders proper values in cells based on provided data', () => {
    render(<Rows rows={testRows} columns={testColumns} idKey="id" />)

    const renderedRows = screen.getAllByRole('row')
    renderedRows.forEach((rowEl, rowIndex) => {
      const rowData = testRows[rowIndex]
      const cells = within(rowEl).getAllByRole('cell')

      testColumns.columns.forEach((column, colIndex) => {
        const rawValue = rowData[column.id]

        if (column.type === 'date') {
          expect(cells[colIndex].textContent).toMatch(/\d{2}.\d{2}.\d{4}/)
          return
        }

        if (column.render) {
          const expected = column.render(rawValue)
          expect(cells[colIndex]).toHaveTextContent((expected ?? '').toString())
          return
        }

        expect(cells[colIndex]).toHaveTextContent(rawValue.toString())
      })
    })
  })
})
