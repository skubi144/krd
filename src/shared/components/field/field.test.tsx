import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Field } from '@/shared/components/field/field.tsx'

describe('Field', () => {
  it('renders label correctly associated with input', () => {
    const name = 'email'
    render(
      <Field label={name} id={name}>
        <input id={name} />
      </Field>,
    )

    expect(screen.getByRole('textbox', { name })).toBeInTheDocument()
  })

  it('renders error message when provided', () => {
    const error = 'error'
    render(
      <Field error={error} id="username">
        <input id="username" />
      </Field>,
    )

    expect(screen.getByRole('alert')).toHaveTextContent(error)
  })

  it('renders children inside', () => {
    const testId = 'child'
    render(
      <Field id={'ID'}>
        <div data-testid={testId}>Child</div>
      </Field>,
    )

    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })
})
