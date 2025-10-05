import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { DataGrid } from '@/shared/components/data-grid/data-grid'
import { useListController } from '@/shared/components/data-grid/components/controllers/useListController'
import {
  numberColumn,
  testColumns,
  testRows,
  textColumn,
} from '@/shared/components/data-grid/components/common/test_utils/data'
import { testId } from '@/shared/components/data-grid/components/common/test_utils/testid.ts'

const { card } = testId

const GridContainer = () => {
  const controller = useListController({
    columns: testColumns.columns,
    rows: testRows,
  })
  return <DataGrid idKey="id" {...controller} />
}

const resizeWindow = async (width: number) => {
  await act(async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    })
    window.dispatchEvent(new Event('resize'))
  })
}

describe('Data-Grid + useListController tests', () => {
  describe('Resize tests', () => {
    let originalWidth: number

    beforeEach(() => {
      originalWidth = window.innerWidth
    })

    afterEach(async () => {
      await resizeWindow(originalWidth)
    })

    it('renders grid view on desktop width', async () => {
      await resizeWindow(1440)
      render(<GridContainer />)
      expect(screen.getAllByRole('columnheader')).toHaveLength(
        testColumns.columns.length,
      )
    })

    it('renders cards view on mobile width', async () => {
      await resizeWindow(480)
      render(<GridContainer />)
      const cards = screen.getAllByRole('row')
      expect(cards).toHaveLength(testRows.length)
      expect(screen.getByTestId(card))
    })
  })

  describe('Sort testing', () => {
    let originalWidth: number

    beforeEach(async () => {
      originalWidth = window.innerWidth
      await resizeWindow(1440)
    })

    afterEach(async () => {
      await resizeWindow(originalWidth)
    })

    it('toggles sort by clicking on a header', async () => {
      const user = userEvent.setup()
      render(<GridContainer />)

      const textHeader = screen
        .getAllByRole('columnheader')
        .find((item) => item.textContent === textColumn.label)!

      expect(textHeader).toHaveAttribute('aria-sort', 'none')

      await user.click(textHeader)
      expect(
        screen
          .getAllByRole('columnheader')
          .find((item) => item.textContent === textColumn.label),
      ).toHaveAttribute('aria-sort', 'ascending')
      const filtered1 = await screen.findAllByRole('row')
      expect(filtered1[0]).toHaveTextContent(testRows[0].text)
      expect(filtered1[1]).toHaveTextContent(testRows[1].text)

      await user.click(textHeader)
      expect(
        screen
          .getAllByRole('columnheader')
          .find((item) => item.textContent === textColumn.label),
      ).toHaveAttribute('aria-sort', 'descending')
      const filtered2 = await screen.findAllByRole('row')
      expect(filtered2[0]).toHaveTextContent(testRows[1].text)
      expect(filtered2[1]).toHaveTextContent(testRows[0].text)

      await user.click(textHeader)
      expect(textHeader).toHaveAttribute('aria-sort', 'none')
    })

    it('sorts via keyboard (Enter, Space) on focused header', async () => {
      const user = userEvent.setup()
      render(<GridContainer />)

      const textHeader = screen
        .getAllByRole('columnheader')
        .find((item) => item.textContent === textColumn.label)!

      expect(textHeader).toHaveAttribute('aria-sort', 'none')

      textHeader.focus()
      await user.keyboard('{Enter}')
      expect(
        screen
          .getAllByRole('columnheader')
          .find((item) => item.textContent === textColumn.label),
      ).toHaveAttribute('aria-sort', 'ascending')
      const filtered1 = await screen.findAllByRole('row')
      expect(filtered1[0]).toHaveTextContent(testRows[0].text)
      expect(filtered1[1]).toHaveTextContent(testRows[1].text)

      await user.keyboard(' ')
      expect(
        screen
          .getAllByRole('columnheader')
          .find((item) => item.textContent === textColumn.label),
      ).toHaveAttribute('aria-sort', 'descending')
      const filtered2 = await screen.findAllByRole('row')
      expect(filtered2[0]).toHaveTextContent(testRows[1].text)
      expect(filtered2[1]).toHaveTextContent(testRows[0].text)

      await user.keyboard('{Enter}')
      expect(textHeader).toHaveAttribute('aria-sort', 'none')
    })

    it('applies multi-column sorting by clicking headers and verifies row values', async () => {
      const user = userEvent.setup()
      render(<GridContainer />)

      const textHeader = screen
        .getAllByRole('columnheader')
        .find((el) => el.textContent === textColumn.label)!
      const numberHeader = screen
        .getAllByRole('columnheader')
        .find((el) => el.textContent === numberColumn.label)!

      expect(textHeader).toHaveAttribute('aria-sort', 'none')
      expect(numberHeader).toHaveAttribute('aria-sort', 'none')

      await user.click(textHeader)
      expect(textHeader).toHaveAttribute('aria-sort', 'ascending')

      await user.click(numberHeader)
      expect(numberHeader).toHaveAttribute('aria-sort', 'ascending')

      const textIdx = testColumns.columns.findIndex((c) => c.id === 'text')
      const numberIdx = testColumns.columns.findIndex((c) => c.id === 'number')

      const rows1 = await screen.findAllByRole('row')
      const textAfterAscAsc = rows1.map(
        (r) => within(r).getAllByRole('cell')[textIdx].textContent,
      )
      const numberAfterAscAsc = rows1.map((r) =>
        Number(within(r).getAllByRole('cell')[numberIdx].textContent),
      )

      expect(textAfterAscAsc).toEqual([testRows[0].text, testRows[1].text])
      expect(numberAfterAscAsc).toEqual([
        testRows[0].number,
        testRows[1].number,
      ])

      await user.click(numberHeader)
      expect(numberHeader).toHaveAttribute('aria-sort', 'descending')

      const rows2 = await screen.findAllByRole('row')
      const textAfterAscDesc = rows2.map(
        (r) => within(r).getAllByRole('cell')[textIdx].textContent,
      )
      const numberAfterAscDesc = rows2.map((r) =>
        Number(within(r).getAllByRole('cell')[numberIdx].textContent),
      )

      expect(textAfterAscDesc).toEqual([testRows[0].text, testRows[1].text])
      expect(numberAfterAscDesc).toEqual([
        testRows[0].number,
        testRows[1].number,
      ])

      await user.click(numberHeader)
      await user.click(numberHeader)
      await user.click(textHeader)
      await user.click(textHeader)

      expect(textHeader).toHaveAttribute('aria-sort', 'none')
      expect(numberHeader).toHaveAttribute('aria-sort', 'ascending')

      const rows3 = await screen.findAllByRole('row')
      const textAfterNoneAsc = rows3.map(
        (r) => within(r).getAllByRole('cell')[textIdx].textContent,
      )
      const numberAfterNoneAsc = rows3.map((r) =>
        Number(within(r).getAllByRole('cell')[numberIdx].textContent),
      )

      expect(textAfterNoneAsc).toEqual([testRows[1].text, testRows[0].text])
      expect(numberAfterNoneAsc).toEqual([
        testRows[1].number,
        testRows[0].number,
      ])
    })
  })
})
