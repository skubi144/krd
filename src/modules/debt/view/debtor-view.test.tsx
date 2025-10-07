import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DebtorView } from '@/modules/debt/view/debtor-view.tsx'
import { renderWithRouter, resizeWindow } from '@/shared/tests/utils.tsx'
import { testId } from '@/shared/components/data-grid/components/common/test_utils/testid.ts'
import { debtList } from '@/shared/tests/fixtures/debts-list.ts'
import { filteredDebtList } from '@/shared/tests/fixtures/filtered-debts-list.ts'

describe('Debtor view tests', () => {
  let originalWidth: number

  beforeEach(async () => {
    originalWidth = window.innerWidth
    await resizeWindow(1440)
  })

  afterEach(async () => {
    await resizeWindow(originalWidth)
  })

  it('render skeletons when loading top 10 debt', async () => {
    await renderWithRouter(<DebtorView />, {
      initialLocation: '/debtor',
      mockRoute: { path: '/debtor' },
    })

    screen.getAllByTestId(testId.rows.rowSkeleton)
  })

  it('render top 10 debtors on loaded, date has format dd-mm-yyyy and not render unnecessary data', async () => {
    await renderWithRouter(<DebtorView />, {
      initialLocation: '/debtor',
      mockRoute: { path: '/debtor' },
    })

    for (const debtor of debtList) {
      const [d] = debtor.Date.split('T')
      const [yyyy, mm, dd] = d.split('-')

      await screen.findByText(`${dd}-${mm}-${yyyy}`)
      await screen.findByText(debtor.Name)
      await screen.findByText(debtor.NIP)
      await screen.findByText(debtor.Value)

      expect(screen.queryByText(debtor.Price)).not.toBeInTheDocument()
      expect(screen.queryByText(debtor.DocumentType)).not.toBeInTheDocument()
      expect(screen.queryByText(debtor.Id)).not.toBeInTheDocument()
      expect(screen.queryByText(debtor.Address)).not.toBeInTheDocument()
    }

    const rows = await screen.findAllByRole('row')
    expect(rows).toHaveLength(debtList.length)
  })

  it('show error when query input has length < 3 and form submitted', async () => {
    const user = userEvent.setup()
    await renderWithRouter(<DebtorView />, {
      initialLocation: '/debtor',
      mockRoute: { path: '/debtor' },
    })
    const query = '11'
    const input = screen.getByRole('textbox')

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(input).toHaveValue('')

    await user.type(input, query)
    expect(input).toHaveValue(query)

    await user.keyboard('{Enter}')

    screen.getByRole('alert')
  })

  it('show filtered rows when query input is valid and submitted', async () => {
    const user = userEvent.setup()
    await renderWithRouter(<DebtorView />, {
      initialLocation: '/debtor',
      mockRoute: { path: '/debtor' },
    })
    const query = '111'
    const input = screen.getByRole('textbox')

    await user.type(input, query)
    await user.click(screen.getByRole('button'))

    await screen.findAllByTestId(testId.rows.rowSkeleton)

    for (const debtor of filteredDebtList) {
      await screen.findByText(debtor.Name)
    }
  })

  it('allow to clear query input and rollback rows to top 10 debt', async () => {
    const user = userEvent.setup()
    await renderWithRouter(<DebtorView />, {
      initialLocation: '/debtor',
      mockRoute: { path: '/debtor' },
    })
    const query = '111'
    const input = screen.getByRole('textbox')
    await user.type(input, `${query}{Enter}`)

    for (const debtor of filteredDebtList) {
      await screen.findByText(debtor.Name)
    }

    await user.click(screen.getByRole('button', { name: /Reset/i }))

    for (const debtor of debtList) {
      await screen.findByText(debtor.Name)
    }
  })

  it('has initial sorting asc on name column when has proper init url', async () => {
    await renderWithRouter(<DebtorView />, {
      initialLocation:
        '/debtor?sorting=%5B%7B"id"%3A"Name"%2C"order"%3A"asc"%7D%5D',
      mockRoute: { path: '/debtor' },
    })

    const headers = screen.getAllByRole('columnheader')
    const nameColumn = headers.find((item) => /dłużnik/i.test(item.textContent))

    expect(nameColumn).toHaveAttribute('aria-sort', 'ascending')
  })

  it('allow to toggle sorting', async () => {
    const user = userEvent.setup()
    await renderWithRouter(<DebtorView />, {
      initialLocation:
        '/debtor?sorting=%5B%7B"id"%3A"Name"%2C"order"%3A"asc"%7D%5D',
      mockRoute: { path: '/debtor' },
    })

    const headers = screen.getAllByRole('columnheader')
    const nameColumnIndex = headers.findIndex((item) =>
      /dłużnik/i.test(item.textContent),
    )

    const sortedNameList = [...debtList]
      .sort((a, b) => a.Name.localeCompare(b.Name))
      .map((d) => d.Name)

    const nameAsc = (
      await screen.findAllByRole('row')
    ).map((r) => within(r).getAllByRole('cell')[nameColumnIndex].textContent)

    expect(nameAsc).toEqual(sortedNameList)

    await user.click(headers[nameColumnIndex])
    expect(headers[nameColumnIndex]).toHaveAttribute('aria-sort', 'descending')

    const nameDesc = (
      await screen.findAllByRole('row')
    ).map((r) => within(r).getAllByRole('cell')[nameColumnIndex].textContent)

    expect(nameDesc).toEqual([...sortedNameList].reverse())
  })
})
