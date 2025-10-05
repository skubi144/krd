import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RowsSkeleton } from './rows-skeleton'
import { testId } from '@/shared/components/data-grid/components/common/test_utils/testid.ts'

describe('RowsSkeleton tests', () => {
  it('renders skeleton rows', () => {
    render(<RowsSkeleton />)

    screen.getAllByTestId(testId.rows.rowSkeleton)
  })

  it('marks skeleton rows as aria-hidden', () => {
    render(<RowsSkeleton />)

    const rows = screen.getAllByTestId(testId.rows.rowSkeleton)
    rows.forEach((row) => {
      expect(row).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
