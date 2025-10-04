import styles from './field.module.scss'
import type { FC, PropsWithChildren } from 'react'

export interface FieldProps {
  label?: string
  error?: string
  id?: string
}
export const Field: FC<PropsWithChildren<FieldProps>> = (props) => {
  const { label, error, id, children } = props

  return (
    <div className={styles.field}>
      {label && <label className={styles['field__label']} htmlFor={id}>{label}</label>}
      {children}
      {error && <span className={styles['field__error']}>{error}</span>}
    </div>
  )
}
