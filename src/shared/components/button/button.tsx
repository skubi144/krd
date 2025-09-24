import clsx from 'clsx'
import styles from './button.module.scss'
import type { FC, PropsWithChildren } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'text'

interface ButtonProps {
  type?: HTMLButtonElement['type']
  onClick?: () => void
  variant?: ButtonVariant
}
export const Button: FC<PropsWithChildren<ButtonProps>> = (props) => {
  const { type = 'button', onClick, variant = 'primary', children } = props;

  return (
    <button className={clsx(styles.button, variant)} type={type} onClick={onClick}>
      {children}
    </button>
  )
}
