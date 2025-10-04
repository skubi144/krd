import clsx from 'clsx'
import styles from './button.module.scss'
import type { FC, PropsWithChildren } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps {
  type?: HTMLButtonElement['type']
  onClick?: () => void
  variant?: ButtonVariant
  title?: string
  disabled?: boolean
}
export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const {
    title,
    type = 'button',
    onClick,
    variant = 'primary',
    children,
    disabled,
  } = props

  return (
    <button
      disabled={disabled}
      title={title}
      className={clsx(
        styles.button,
        styles[`button__${variant}`],
        disabled && styles['button--disabled'],
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
