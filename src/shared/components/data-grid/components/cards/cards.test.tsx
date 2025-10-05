import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Cards } from '@/shared/components/data-grid/components/cards/cards.tsx'
import {
  testColumns,
  testRows,
} from '@/shared/components/data-grid/components/common/test_utils/data.ts'

describe('Cards tests', () => {
  it('renders the correct number of cards (rows)', () => {
    render(<Cards rows={testRows} columns={testColumns} idKey="id" />)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(testRows.length)
  })

  it('renders correct number of headers and cells per card', () => {
    render(<Cards rows={testRows} columns={testColumns} idKey="id" />)

    const rows = screen.getAllByRole('row')
    rows.forEach(row => {
      const headers = within(row).getAllByRole('columnheader')
      const cells = within(row).getAllByRole('cell')
      expect(headers).toHaveLength(testColumns.columns.length)
      expect(cells).toHaveLength(testColumns.columns.length)
    })
  })

  it('renders proper header labels for each column', () => {
    render(<Cards rows={testRows} columns={testColumns} idKey="id" />)

    testColumns.columns.forEach(col => {
      const headers = screen.getAllByRole('columnheader', { name: col.label })
      expect(headers).toHaveLength(testRows.length)
    })
  })

  it('renders correct values for each cell based on provided data', () => {
    render(<Cards rows={testRows} columns={testColumns} idKey="id" />)

    const rows = screen.getAllByRole('row')
    rows.forEach((row, rowIndex) => {
      const rowData = testRows[rowIndex]
      const cells = within(row).getAllByRole('cell')

      testColumns.columns.forEach((column, colIndex) => {
        const rawValue = rowData[column.id]

        if (column.type === 'date') {
          expect(cells[colIndex].textContent).toMatch(/\d{2}.\d{2}.\d{4}/)
        } else if (column.render) {
          const expected = column.render(rawValue)
          expect(cells[colIndex]).toHaveTextContent((expected ?? '').toString())
        } else {
          expect(cells[colIndex]).toHaveTextContent(rawValue.toString())
        }
      })
    })
  })
})
