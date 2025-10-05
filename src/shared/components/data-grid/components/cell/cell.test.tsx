import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Cell } from './cell'

const textColumn = { id: 'text', type: 'text' } as const
const numberColumn = { id: 'number', type: 'number' } as const
const dateColumn = { id: 'date', type: 'date' } as const
const customColumn = {
  id: 'custom',
  type: 'text',
  render: (v: unknown) => `custom:${v}`,
} as const

const columns = {
  columns: [textColumn, numberColumn, dateColumn, customColumn],
  columnsHash: {
    text: textColumn,
    number: numberColumn,
    date: dateColumn,
    custom: customColumn,
  },
}

describe('Cell tests', () => {
  it('renders text', () => {
    const value = 'Milosz'
    render(<Cell value={value} columnId="text" columns={columns} />)

    expect(screen.getByRole('cell')).toHaveTextContent(value)
  })

  it('renders number', () => {
    const value = 42
    render(<Cell value={value} columnId="number" columns={columns} />)

    expect(screen.getByRole('cell')).toHaveTextContent(value.toString())
  })

  it('renders date using formatter', () => {
    const value = new Date(2025, 9, 5)
    render(<Cell value={value} columnId="date" columns={columns} />)

    expect(screen.getByRole('cell')).toHaveTextContent('05.10.2025')
  })

  it('renders using custom renderer', () => {
    const value = 'X'
    render(<Cell value={value} columnId="custom" columns={columns} />)

    expect(screen.getByRole('cell')).toHaveTextContent(`custom:${value}`)
  })
})
