import { memo } from 'react'
import clsx from 'clsx'
import styles from '@/shared/components/data-grid/components/common/data-grid.module.scss'
import { testId } from '@/shared/components/data-grid/components/common/testid.ts'

const {
  rows: { rowSkeleton },
} = testId
export const RowsSkeleton = memo(() => {
  return Array.from({ length: 5 }).map((_, i) => (
    <div
      aria-hidden={true}
      key={i}
      data-testid={rowSkeleton}
      className={clsx(
        styles['data-grid__row'],
        styles['data-grid__row--skeleton'],
      )}
    >
      <div className={styles['data-grid__cell']} />
    </div>
  ))
})
