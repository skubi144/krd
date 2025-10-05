import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { SortingDef } from '@/shared/components/data-grid/components/common/types.ts'
import type { TestRow } from '@/shared/components/data-grid/components/common/test_utils/data.ts'
import { Header } from '@/shared/components/data-grid/components/header/header.tsx'
import { testColumns } from '@/shared/components/data-grid/components/common/test_utils/data.ts'
import { testId } from '@/shared/components/data-grid/components/common/test_utils/testid.ts'

const {
  header: { sortIndicator },
} = testId

describe('Header tests', () => {
  it('renders all columns as columnheaders', () => {
    render(<Header columns={testColumns} />)

    const headers = screen.getAllByRole('columnheader')
    expect(headers).toHaveLength(testColumns.columns.length)

    testColumns.columns.forEach((col, i) => {
      expect(headers[i]).toHaveTextContent(col.label ?? '')
    })
  })

  it('sets correct aria-sort for sorted columns', () => {
    const sortingHash = {
      text: { id: 'text', order: 'asc', index: 0 },
      number: { id: 'number', order: 'desc', index: 1 },
    } as const

    render(<Header columns={testColumns} sortingHash={sortingHash} />)

    const headers = screen.getAllByRole('columnheader')
    const textHeader = headers.find((h) => h.textContent.includes('text'))
    const numberHeader = headers.find((h) => h.textContent.includes('number'))
    const dateHeader = headers.find((h) => h.textContent.includes('date'))

    expect(textHeader).toHaveAttribute('aria-sort', 'ascending')
    expect(numberHeader).toHaveAttribute('aria-sort', 'descending')
    expect(dateHeader).toHaveAttribute('aria-sort', 'none')
  })

  it('calls onSortChange on click', async () => {
    const user = userEvent.setup()
    const onSortChange = vi.fn()

    render(<Header columns={testColumns} onSortChange={onSortChange} />)

    const headers = screen.getAllByRole('columnheader')
    await user.click(headers[0])

    expect(onSortChange).toHaveBeenCalledTimes(1)
    expect(onSortChange).toHaveBeenCalledWith(testColumns.columns[0].id)
  })

  it('calls onSortChange on keyboard Enter and Space', async () => {
    const user = userEvent.setup()
    const onSortChange = vi.fn()

    render(<Header columns={testColumns} onSortChange={onSortChange} />)

    const first = screen.getAllByRole('columnheader')[0]
    first.focus()
    await user.keyboard('{Enter}')
    await user.keyboard(' ')
    await user.keyboard('a')

    expect(onSortChange).toHaveBeenCalledTimes(2)
    expect(onSortChange).toHaveBeenCalledWith(testColumns.columns[0].id)
  })

  it('renders sort priority index when sorting multiple columns', () => {
    const sorting: Array<SortingDef<TestRow>> = [
      { id: 'text', order: 'asc' },
      { id: 'number', order: 'desc' },
    ]
    const sortingHash = {
      text: { id: 'text', order: 'asc', index: 0 },
      number: { id: 'number', order: 'desc', index: 1 },
    } as const

    render(
      <Header
        columns={testColumns}
        sorting={sorting}
        sortingHash={sortingHash}
      />,
    )

    const sortIndicators = screen.getAllByTestId(sortIndicator)

    expect(sortIndicators).toHaveLength(sorting.length)
    sortIndicators.forEach((indicator, i) => {
      expect(indicator).toHaveTextContent((i + 1).toString())
    })
  })
})
