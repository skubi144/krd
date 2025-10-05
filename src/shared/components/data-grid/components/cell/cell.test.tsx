import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Cell } from './cell'
import { testColumns } from '@/shared/components/data-grid/components/common/test_utils/data.ts'

describe('Cell tests', () => {
  it('renders text', () => {
    const value = 'Milosz'
    render(<Cell value={value} columnId="text" columns={testColumns} />)

    expect(screen.getByRole('cell')).toHaveTextContent(value)
  })

  it('renders number', () => {
    const value = 42
    render(<Cell value={value} columnId="number" columns={testColumns} />)

    expect(screen.getByRole('cell')).toHaveTextContent(value.toString())
  })

  it('renders date using formatter', () => {
    const value = new Date(2025, 9, 5)
    render(<Cell value={value} columnId="date" columns={testColumns} />)

    expect(screen.getByRole('cell')).toHaveTextContent('05.10.2025')
  })

  it('renders using custom renderer', () => {
    const value = 'X'
    render(<Cell value={value} columnId="custom" columns={testColumns} />)

    expect(screen.getByRole('cell')).toHaveTextContent(`custom:${value}`)
  })
})
