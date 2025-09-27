import { forwardRef, useId } from 'react'
import styles from './input.module.scss'
import type { InputHTMLAttributes, ReactNode } from 'react'
import type { FieldProps } from '@/shared/components/field/field.tsx'
import { Field } from '@/shared/components/field/field.tsx'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>,
    Omit<FieldProps, 'id'> {
  suffix?: ReactNode
  onClear?: () => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ suffix, value, disabled, onClear, ...rest }, ref) => {
    const id = useId()

    return (
      <Field id={id} {...rest}>
        <div className={styles.wrapper}>
          <div className={styles.inputwrapper}>
            <input
              id={id}
              ref={ref}
              className={styles.input}
              disabled={disabled}
              value={value}
              {...rest}
            />
            <button
              onClick={onClear}
              type="button"
              disabled={!value || disabled}
              className={styles.button}
            >
              {value ? 'X' : ' '}
            </button>
          </div>
          {suffix}
        </div>
      </Field>
    )
  },
)
