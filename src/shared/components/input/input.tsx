import { useId } from 'react'
import styles from './input.module.scss'
import type { ChangeEventHandler, FC } from 'react'
import type { FieldProps } from '@/shared/components/field/field.tsx'
import { Field } from '@/shared/components/field/field.tsx'

interface InputProps extends Omit<FieldProps, 'id'> {
  disabled?: boolean
  placeholder?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  name?: string
  suffix?: React.ReactNode
}
export const Input: FC<InputProps> = (props) => {
  const { suffix } = props
  const id = useId()

  return (
    <Field id={id} {...props}>
      <div className={styles.wrapper}>
        <input className={styles.input} id={id} {...props} />
        {suffix}
      </div>
    </Field>
  )
}
