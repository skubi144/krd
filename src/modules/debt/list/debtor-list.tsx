import styles from './debtor-list.module.scss'
import { Input } from '@/shared/components/input/input.tsx'
import { Button } from '@/shared/components/button/button.tsx'
import { DataGrid } from '@/shared/components/data-grid/data-grid.tsx'
import { useListController } from '@/shared/components/data-grid/components/controllers/useListController.tsx'
import { useTopDebts } from '@/shared/integrations/queries'
import { useColumnsDef } from '@/modules/debt/list/useColumnsDef.ts'

export const DebtorList = () => {
  const {data} = useTopDebts()
  const columns = useColumnsDef()
  const listProps = useListController({ columns, rows:data })

  return (
    <>
      <div className={styles.filters}>
        <Input
          label={'To jest super label'}
          suffix={<Button>Hello world</Button>}
        />
      </div>
      <div>
        <DataGrid {...listProps} />
      </div>
    </>
  )
}
