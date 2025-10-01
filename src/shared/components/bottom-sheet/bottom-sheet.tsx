import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import styles from './bottom-sheet.module.scss'
import type { FC, ReactNode } from 'react'

type BottomSheetProps = {
  initialOpen?: boolean
  title?: string
  children: ReactNode
}

const VISIBLE_WHEN_CLOSED = 50

export const BottomSheet: FC<BottomSheetProps> = ({
  initialOpen = false,
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const startY = useRef<number | null>(null)
  const baseY = useRef<number>(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const [closedY, setClosedY] = useState(0)

  useEffect(() => {
    const vh = window.innerHeight
    setClosedY(vh - VISIBLE_WHEN_CLOSED)
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    startY.current = e.clientY
    baseY.current = isOpen ? 0 : closedY
    if (contentRef.current) contentRef.current.style.transition = 'none'
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  const handlePointerMove = (e: PointerEvent) => {
    if (startY.current !== null && contentRef.current) {
      const delta = e.clientY - startY.current
      let next = baseY.current + delta
      next = Math.min(Math.max(0, next), closedY)
      contentRef.current.style.transform = `translateY(${next}px)`
    }
  }

  const handlePointerUp = (e: PointerEvent) => {
    if (startY.current !== null && contentRef.current) {
      const delta = e.clientY - startY.current
      const endY = baseY.current + delta
      const mid = closedY / 2
      const shouldOpen = endY < mid
      setIsOpen(shouldOpen)
      contentRef.current.style.transition = 'transform 0.3s ease'
      contentRef.current.style.transform = shouldOpen
        ? 'translateY(0)'
        : `translateY(${closedY}px)`
    }
    startY.current = null
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
  }

  return (
    <div
      className={clsx(styles.bottomSheet, {
        [styles['bottomSheet--open']]: isOpen,
      })}
    >
      <div
        className={styles.bottomSheet__overlay}
        onClick={() => setIsOpen(false)}
      />
      <div
        className={styles.bottomSheet__content}
        ref={contentRef}
        style={{
          transform: isOpen ? 'translateY(0)' : `translateY(${closedY}px)`,
        }}
      >
        <div
          className={styles.bottomSheet__header}
          onPointerDown={handlePointerDown}
        >
          <div className={styles.bottomSheet__handle} />
          {title && <h2 className={styles.bottomSheet__title}>{title}</h2>}
        </div>
        <div className={styles.bottomSheet__body}>{children}</div>
      </div>
    </div>
  )
}
