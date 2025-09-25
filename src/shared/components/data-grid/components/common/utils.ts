import type { CommonColumnDef } from '@/shared/components/data-grid/components/common/types.ts'
import type { CSSProperties } from 'react'

export const getGridColumnStyleDef = (
  columnsDef: Array<CommonColumnDef<Record<string, unknown>>>,
): CSSProperties => {
  // gridTemplateColumns: `repeat(${columns.length}, 1fr)`;
  const gridTemplateColumns = columnsDef
    .map((columnDef) => columnDef.width ?? '1fr')
    .join(' ')

  return { gridTemplateColumns }
}
