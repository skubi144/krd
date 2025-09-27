import { useMemo } from 'react'
import type { ColumnDef } from '@/shared/components/data-grid/components/common/types.ts'
import type { Debt } from '@/shared/integrations/models'

export const useColumnsDef = () => {
  return useMemo<Array<ColumnDef<Debt>>>(
    () => [
      { id: 'Name', type: 'text', label: 'Dłużnik' },
      { id: 'NIP', type: 'text', label:"NIP" },
      { id: 'Value', type: 'text', label:"Kwota zadłużenia" },
      { id: 'Date', type: 'date', label:"Data powstania zobowiązania" },
      // { id: 'Id', type: 'text' },
      // { id: 'Value', type: 'text' },
      // { id: 'Address', type: 'text' },
      // { id: 'DocumentType', type: 'text' },
      // { id: 'Number', type: 'text' },
    ],
    [],
  )
}
