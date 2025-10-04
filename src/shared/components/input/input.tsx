import { forwardRef, useId } from 'react'
import styles from './input.module.scss'
import type { InputHTMLAttributes, ReactNode } from 'react'
import type { FieldProps } from '@/shared/components/field/field.tsx'
import { Field } from '@/shared/components/field/field.tsx'
import { errorIdGenerator } from '@/shared/components/field/utils.ts'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>,
    Omit<FieldProps, 'id'> {
  suffix?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ suffix, value, disabled, ...rest }, ref) => {
    const id = useId()
    const hasError = !!rest.error
    return (
      <Field id={id} {...rest}>
        <div className={styles.input}>
          <div className={styles.input__field}>
            <input
              id={id}
              ref={ref}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorIdGenerator(id) : undefined}
              className={styles.input__control}
              disabled={disabled}
              value={value}
              {...rest}
            />
          </div>
          {suffix && <div className={styles.input__suffix}>{suffix}</div>}
        </div>
      </Field>
    )
  },
)
