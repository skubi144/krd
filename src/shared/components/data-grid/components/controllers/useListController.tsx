import type {
  DataGridProps,
  UseListControllerProps,
} from '@/shared/components/data-grid/components/common/types.ts'
import { useColumnsController } from '@/shared/components/data-grid/components/controllers/useColumnsController.tsx'
import { useSortingController } from '@/shared/components/data-grid/components/controllers/useSortingController.tsx'

const r = [
  {
    id: '1',
    name: 'Miłosz',
  },
  {
    id: '2',
    name: 'Karolina',
  },
]

export const useListController = <TData extends Record<string, unknown>>(
  props: UseListControllerProps<TData>,
): DataGridProps<TData> => {
  const { columns } = props
  const columnsState = useColumnsController(columns)
  const [_, _1, columnsHash] = columnsState
  const { rows, sorting, onSortChange } = useSortingController(
     r as Array<TData>,
    columnsHash,
  )

  return {
    rows,
    sorting,
    onSortChange,
    columns:columnsState
  }
}
