import { Controller } from 'react-hook-form'
import { useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilter,
  faSort,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import styles from './debtor-list-filter.module.scss'
import type { FC } from 'react'
import type {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import type { DebtorForm } from '@/modules/debt/common/types.ts'
import type { UseListControllerResult } from '@/shared/components/data-grid/components/common/types.ts'
import type { Debt } from '@/shared/integrations/models'
import { Button } from '@/shared/components/button/button.tsx'
import { useIsMobile } from '@/shared/utils/useIsMobile.ts'
import { BottomSheet } from '@/shared/components/bottom-sheet/bottom-sheet.tsx'
import { Input } from '@/shared/components/input/input.tsx'
import { Header } from '@/shared/components/data-grid/components/header/header.tsx'
import { Badge } from '@/shared/components/badge/badge.tsx'

const inputText = 'PODAJ NIP LUB NAZWĘ DŁUŻNIKA'

interface DebtorListFilterParams {
  control: Control<DebtorForm>
  errors: FieldErrors<DebtorForm>
  handleSubmit: UseFormHandleSubmit<DebtorForm>
  listProps: UseListControllerResult<Debt>
  onClear: () => void
  onValid: SubmitHandler<DebtorForm>
}

export const DebtorListFilter: FC<DebtorListFilterParams> = (props) => {
  const { handleSubmit, onValid, onClear, control, errors, listProps } = props
  const search = useSearch({ from: '/debtor' })
  const isMobile = useIsMobile()
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false)

  const onSubmit: SubmitHandler<DebtorForm> = (data) => {
    setBottomSheetOpen(false)
    onValid(data)
  }

  const form = (
    <form onSubmit={handleSubmit(onSubmit)} onReset={onClear}>
      <Controller
        name="phrase"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className={styles['debtor-list-filter__input']}>
            <Input
              {...field}
              placeholder={isMobile ? inputText : ''}
              label={isMobile ? '' : inputText}
              suffix={
                <>
                  <Button title="Przeszukaj bazę dłużników" type="submit">
                    SZUKAJ
                  </Button>
                  {search.phrase && (
                    <Button variant="secondary" type="reset" title="Wyczyść filtry">
                      <FontAwesomeIcon icon={faXmark} />
                    </Button>
                  )}
                </>
              }
              error={errors.phrase && 'Aby wyszukać, podaj co najmniej 3 znaki'}
            />
          </div>
        )}
      />
    </form>
  )

  const onToggleBottomSheet = (next: boolean) => {
    if (!next && control.getFieldState('phrase').error) {
      control._reset()
    }
    setBottomSheetOpen(next)
  }

  return (
    <>
      {isMobile ? (
        <BottomSheet
          open={isBottomSheetOpen}
          onOpenChange={onToggleBottomSheet}
          pullBar={
            <div className={styles['debtor-list-filter__pull-bar']}>
              <Badge
                content={
                  listProps.sorting?.length
                    ? listProps.sorting.length
                    : undefined
                }
                color="blue"
              >
                <FontAwesomeIcon icon={faSort} />
              </Badge>
              <Badge content={search.phrase ? 1 : undefined} color="blue">
                <FontAwesomeIcon icon={faFilter} />
              </Badge>
            </div>
          }
        >
          <div className={styles['debtor-list-filter__section']}>
            <h4>Filtruj</h4>
            {form}
          </div>
          <div className={styles['debtor-list-filter__section']}>
            <h4>Sortuj</h4>
            <Header direction="vertical" {...listProps} />
          </div>
        </BottomSheet>
      ) : (
        form
      )}
    </>
  )
}
