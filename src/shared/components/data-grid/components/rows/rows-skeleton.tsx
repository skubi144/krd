import { memo } from 'react'
import clsx from 'clsx'
import styles from '@/shared/components/data-grid/components/common/data-grid.module.scss'

export const RowsSkeleton = memo(() => {
  return Array.from({ length: 5 }).map((_, i) => (
    <div
      aria-hidden={true}
      key={i}
      className={clsx(
        styles['data-grid__row'],
        styles['data-grid__row--skeleton'],
      )}
    >
      <div className={styles['data-grid__cell']} />
    </div>
  ))
})
