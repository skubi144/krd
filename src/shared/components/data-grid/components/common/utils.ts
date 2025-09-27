import type { CommonColumnDef } from '@/shared/components/data-grid/components/common/types.ts'
import type { CSSProperties } from 'react'

export const getGridColumnStyleDef = <T extends Record<string, unknown>>(
  columnsDef: Array<CommonColumnDef<T>>,
): CSSProperties => {

  const gridTemplateColumns = columnsDef
    .map((columnDef) => columnDef.width ?? '1fr')
    .join(' ')

  return { gridTemplateColumns }
}
