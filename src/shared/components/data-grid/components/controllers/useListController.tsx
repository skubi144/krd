import { useMemo } from 'react'
import type {
  DataGridProps,
  UseListControllerProps,
} from '@/shared/components/data-grid/components/common/types.ts'
import { useColumnsController } from '@/shared/components/data-grid/components/controllers/useColumnsController.tsx'
import { useSortingController } from '@/shared/components/data-grid/components/controllers/useSortingController.tsx'
import { useIsMobile } from '@/shared/utils/useIsMobile.ts'

export const useListController = <TData extends Record<string, unknown>>(
  props: UseListControllerProps<TData>,
): DataGridProps<TData> => {
  const { columns, rows, initialSorting } = props
  const columnsState = useColumnsController(columns)
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
