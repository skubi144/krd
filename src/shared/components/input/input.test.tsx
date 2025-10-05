import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Input } from './input'

describe('Input tests', () => {
  it('renders a label connected to the input', () => {
    const label = 'Username'
    render(<Input label={label} />)

    const input = screen.getByRole('textbox', { name: label })

    expect(input).toBeInTheDocument()
  })

  it('marks input as invalid and describes error when error is provided', () => {
    const label = 'Email'
    const errorMessage = 'Invalid email'
    render(<Input label={label} error={errorMessage} />)

    const input = screen.getByRole('textbox', { name: label })
    const error = screen.getByRole('alert')

    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', error.id)
    expect(error).toHaveTextContent(errorMessage)
  })

  it('renders suffix element when provided', () => {
    const label = 'Search'
    const suffixId = 'suffix'
    const suffixContent = <p>My suffix</p>
    render(
      <Input
        label={label}
        suffix={<span data-testid={suffixId}>{suffixContent}</span>}
      />,
    )

    screen.getByTestId(suffixId)
  })

  it('forwards props to the input element', () => {
    const label = 'Password'
    const defaultValue = 'secret'
    render(
      <Input label={label} type="password" disabled value={defaultValue} />,
    )

    const input = screen.getByLabelText(label)

    expect(input).toHaveAttribute('type', 'password')
    expect(input).toBeDisabled()
    expect(input).toHaveValue(defaultValue)
  })
})
