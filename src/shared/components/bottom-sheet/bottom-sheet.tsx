import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import styles from './bottom-sheet.module.scss'
import type { FC, ReactNode } from 'react'
import { VISIBLE_WHEN_CLOSED } from '@/shared/components/bottom-sheet/common.ts'

type BottomSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  pullBar?: ReactNode
}

export const BottomSheet: FC<BottomSheetProps> = ({
  open,
  onOpenChange,
  children,
  pullBar,
}) => {
  const startY = useRef<number | null>(null)
  const baseY = useRef<number>(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const [closedY, setClosedY] = useState(0)

  useEffect(() => {
    const updateClosedY = () => {
      if (contentRef.current) {
        setClosedY(contentRef.current.offsetHeight - VISIBLE_WHEN_CLOSED)
      }
    }
    updateClosedY()
    window.addEventListener('resize', updateClosedY)
    return () => window.removeEventListener('resize', updateClosedY)
  }, [])

  const handlePointerMove = (e: PointerEvent) => {
    if (startY.current === null || !contentRef.current) return
    const delta = e.clientY - startY.current
    let next = baseY.current + delta
    next = Math.min(Math.max(0, next), closedY)
    contentRef.current.style.transform = `translateY(${next}px)`
  }

  const handlePointerUp = () => {
    if (startY.current === null || !contentRef.current) return
    const transformY =
      parseFloat(
        contentRef.current.style.transform
          .replace('translateY(', '')
          .replace('px)', ''),
      ) || 0
    const mid = closedY / 2
    const shouldOpen = transformY < mid
    onOpenChange(shouldOpen)
    contentRef.current.style.transition = 'transform 0.3s ease'
    contentRef.current.style.transform = shouldOpen
      ? 'translateY(0)'
      : `translateY(${closedY}px)`

    startY.current = null
    document.body.style.userSelect = ''
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    startY.current = e.clientY
    baseY.current = open ? 0 : closedY
    if (contentRef.current) contentRef.current.style.transition = 'none'

    document.body.style.userSelect = 'none'
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  return (
    <div
      aria-hidden={open}
      aria-label="Bottom sheet"
      aria-modal="true"
      role="dialog"
      className={clsx(styles.bottomSheet, {
        [styles['bottomSheet--open']]: open,
      })}
    >
      <div
        className={styles.bottomSheet__overlay}
        onClick={() => onOpenChange(false)}
      />
      <div
        className={styles.bottomSheet__content}
        ref={contentRef}
        style={{
          transform: open ? 'translateY(0)' : `translateY(${closedY}px)`,
        }}
      >
        <div
          className={styles.bottomSheet__header}
          onPointerDown={handlePointerDown}
        >
          <div className={styles.bottomSheet__handle} />
          {pullBar}
        </div>
        <div className={styles.bottomSheet__body}>{children}</div>
      </div>
    </div>
  )
}
