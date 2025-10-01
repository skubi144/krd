import type {
  DataGridProps,
  UseListControllerProps,
} from '@/shared/components/data-grid/components/common/types.ts'
import { useColumnsController } from '@/shared/components/data-grid/components/controllers/useColumnsController.tsx'
import { useSortingController } from '@/shared/components/data-grid/components/controllers/useSortingController.tsx'


export const useListController = <TData extends Record<string, unknown>>(
  props: UseListControllerProps<TData>,
): DataGridProps<TData> => {
  const { columns, rows, initialSorting } = props
  const columnsState = useColumnsController(columns)
  const [_, _1, columnsHash] = columnsState
  const {
    rows: sortedRows,
    sorting,
    onSortChange,
    sortingHash,
    busy
  } = useSortingController(rows, columnsHash, initialSorting)

  return {
    rows: sortedRows,
    sorting,
    onSortChange,
    columns: columnsState,
    sortingHash,
    loading: busy,
    view:'data-grid'
  }
}
