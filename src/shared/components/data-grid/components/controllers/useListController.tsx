import { useMemo, useState } from 'react'
import type {
  UseListControllerProps,
  UseListControllerResult,
} from '@/shared/components/data-grid/components/common/types.ts'
import { useColumnsController } from '@/shared/components/data-grid/components/controllers/useColumnsController.tsx'
import { useSortingController } from '@/shared/components/data-grid/components/controllers/useSortingController.tsx'
import { useIsMobile } from '@/shared/utils/useIsMobile.ts'

export const useListController = <TData extends Record<string, unknown>>(
  props: UseListControllerProps<TData>,
): UseListControllerResult<TData> => {
  const { columns, initialSorting } = props
  const columnsState = useColumnsController(columns)
  const [rows, setRows] = useState<Array<TData>>(() => [])
  const { columnsHash } = columnsState
  const {
    rows: sortedRows,
    sorting,
    onSortChange,
    sortingHash,
    busy,
  } = useSortingController(rows, columnsHash, initialSorting)
  const isMobile = useIsMobile()

  return useMemo(
    () => ({
      setRows,
      rows: sortedRows,
      sorting,
      onSortChange,
      columns: columnsState,
      sortingHash,
      loading: busy,
      view: isMobile ? 'cards' : 'data-grid',
    }),
    [
      busy,
      isMobile,
      sortingHash,
      columnsState,
      sortedRows,
      onSortChange,
      sortingHash,
    ],
  )
}
