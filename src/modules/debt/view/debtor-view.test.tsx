import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DebtorView } from '@/modules/debt/view/debtor-view.tsx'
import { testId } from '@/shared/components/data-grid/components/common/test_utils/testid.ts'

const {rows:{rowSkeleton}} = testId;

describe('Debtor view tests', () => {
  it('load top 10 debtors', () => {
    render(<DebtorView />)

    screen.getByTestId(rowSkeleton)
  })
})
