import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './badge'

describe('Badge tests', () => {
  it('renders children and content when valid content is provided', () => {
    const children = 'Hello'
    const content = '99'

    render(<Badge content={content}>{children}</Badge>)

    const wrapper = screen.getByText(children).parentElement
    const contentEl = screen.getByText(content)

    expect(wrapper?.textContent).toBe(`${children}${content}`)
    expect(contentEl).toBeInTheDocument()
  })
})