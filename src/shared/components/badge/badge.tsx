import clsx from 'clsx'
import styles from './badge.module.scss'
import type { FC, PropsWithChildren } from 'react'

type BadgeProps = {
  content?: string | number
  color?: 'red' | 'blue' | 'green'
}

export const Badge: FC<PropsWithChildren<BadgeProps>> = ({
  children,
  content,
  color = 'red',
}) => {
  return (
    <div className={styles.badge}>
      {children}
      {content !== undefined && content !== '' && (
        <div
          className={clsx(
            styles.badge__content,
            styles[`badge__content--${color}`],
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}
