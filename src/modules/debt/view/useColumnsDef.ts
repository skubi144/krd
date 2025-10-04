import { useMemo } from 'react'
import type {
  ColumnDef,
  ValueRenderer,
} from '@/shared/components/data-grid/components/common/types.ts'
import type { Debt } from '@/shared/integrations/models'

const formatter = new Intl.DateTimeFormat('pl-PL', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})
const timeRenderer: ValueRenderer = (value) => {
  let result = ''

  if (typeof value === 'string') {
    result = formatter.format(new Date(value))
  }
  if (typeof value === 'number' || value instanceof Date) {
    result = formatter.format(value)
  }
  return result.replace(/\./g, '-')
}
export const useColumnsDef = () => {
  return useMemo<Array<ColumnDef<Debt>>>(
    () => [
      { id: 'Name', type: 'text', label: 'DŁUŻNIK', width: '2fr' },
      { id: 'NIP', type: 'text', label: 'NIP' },
      { id: 'Value', type: 'number', label: 'KWOTA ZADŁUŻENIA', width: '2fr' },
      {
        id: 'Date',
        type: 'date',
        label: 'DATA POWSTANIA ZOBOWIĄZANIA',
        render: timeRenderer,
        width: '2fr',
      },
    ],
    [],
  )
}
