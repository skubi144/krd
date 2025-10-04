import type { FC, ReactNode } from 'react'
import { VISIBLE_WHEN_CLOSED } from '@/shared/components/bottom-sheet/common.ts'

type BottomSheetSpacerProps = {
  isMobile: boolean
  children: ReactNode
}

export const BottomSheetSpacer: FC<BottomSheetSpacerProps> = (props) => {
  const { isMobile, children } = props

  return (
    <div
      style={{
        paddingBottom: isMobile ? VISIBLE_WHEN_CLOSED : 0,
      }}
    >
      {children}
    </div>
  )
}
