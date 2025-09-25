import { useState } from 'react'
import type { RowsControllerResult } from '@/shared/components/data-grid/components/common/types.ts'

export const useRowsController = <T extends Record<string, unknown>>(
  rowsDef: Array<T>,
): RowsControllerResult<T> => {
  return useState(() => rowsDef)
}
