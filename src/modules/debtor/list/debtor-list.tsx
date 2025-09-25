import styles from './debtor-list.module.scss'
import type { ColumnDef } from '@/shared/components/data-grid/components/common/types.ts'
import { Input } from '@/shared/components/input/input.tsx'
import { Button } from '@/shared/components/button/button.tsx'
import { DataGrid } from '@/shared/components/data-grid/data-grid.tsx'

type User = {
  id: string
  name: string
}

const columns: Array<ColumnDef<User>> = [
  {
    id: 'id',
    type: 'text',
    label: 'Id',
  },
  {
    id: 'name',
    type: 'text',
    label: 'Nazwa',
  },
]

const rows: Array<User> = [
  {
    id: '1',
    name: 'Miłosz',
  },
  {
    id: '2',
    name: 'Karolina',
  },
]


export const DebtorList = () => {
  return (
    <>
      <div className={styles.filters}>
        <Input
          label={'To jest super label'}
          suffix={<Button>Hello world</Button>}
        />
      </div>
      <div>
        <DataGrid<User> columns={columns} rows={rows} />
      </div>
    </>
  )
}
