import type { ValueRenderer } from '@/shared/components/data-grid/components/common/types.ts'

export const formatter = new Intl.DateTimeFormat('pl-PL', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

export const timeRenderer: ValueRenderer = (value) => {
  if (typeof value === 'string') {
    return formatter.format(new Date(value))
  }
  if (typeof value === 'number' || value instanceof Date) {
    return formatter.format(value)
  }
  return ''
}