import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import type { SortingOrder } from '@/shared/components/data-grid/components/common/types.ts'
import type { AriaAttributes, ReactElement } from 'react'

export const ariaSort: Record<
  string | SortingOrder,
  AriaAttributes['aria-sort']
> = {
  asc: 'ascending',
  desc: 'descending',
}

export const sortIcon: Record<string | SortingOrder, ReactElement> = {
  asc: <FontAwesomeIcon aria-hidden={'true'} icon={faCaretUp} />,
  desc: <FontAwesomeIcon aria-hidden={'true'} icon={faCaretDown} />,
}
