import styles from './debtor-list.module.scss'
import { Input } from '@/shared/components/input/input.tsx'
import { Button } from '@/shared/components/button/button.tsx'

export const DebtorList = () => {
  return (
    <>
      <div className={styles.filters}>
        <Input
          label={'To jest super label'}
          suffix={<Button>Hello world</Button>}
        />
      </div>
      <div></div>
    </>
  )
}
