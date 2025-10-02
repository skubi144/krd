import { Controller } from 'react-hook-form'
import { useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons'
import styles from './debtor-list-filter.module.scss'
import type { FC } from 'react'
import type {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import type { DebtorForm } from '@/modules/debt/common/types.ts'
import type { DataGridProps } from '@/shared/components/data-grid/components/common/types.ts'
import type { Debt } from '@/shared/integrations/models'
import { Button } from '@/shared/components/button/button.tsx'
import { useIsMobile } from '@/shared/utils/useIsMobile.ts'
import { BottomSheet } from '@/shared/components/bottom-sheet/bottom-sheet.tsx'
import { Input } from '@/shared/components/input/input.tsx'
import { Header } from '@/shared/components/data-grid/components/header/header.tsx'
import { Badge } from '@/shared/components/badge/badge.tsx'

const inputText = 'Podaj NIP lub nazwę dłużnika'

interface DebtorListFilterParams {
  control: Control<DebtorForm>
  errors: FieldErrors<DebtorForm>
  handleSubmit: UseFormHandleSubmit<DebtorForm>
  listProps: DataGridProps<Debt>
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
          <Input
            {...field}
            placeholder={isMobile ? inputText : ''}
            label={isMobile ? '' : inputText}
            suffix={
              <>
                <Button type="submit">Szukaj</Button>
                {search.phrase && (
                  <Button variant={'secondary'} type="reset">
                    X
                  </Button>
                )}
              </>
            }
            error={errors.phrase && 'Aby wyszukać, podaj co najmniej 3 znaki'}
          />
        )}
      />
    </form>
  )

  return (
    <>
      {isMobile ? (
        <BottomSheet
          open={isBottomSheetOpen}
          onOpenChange={setBottomSheetOpen}
          pullBar={
            <div className={styles['pullBar']}>
              <Badge
                content={
                  listProps.sorting?.length
                    ? listProps.sorting.length
                    : undefined
                }
                color={'blue'}
              >
                <FontAwesomeIcon icon={faSort} />
              </Badge>
              <Badge content={search.phrase} color={'blue'}>
                <FontAwesomeIcon icon={faFilter} />
              </Badge>
            </div>
          }
        >
          <h4>Filtruj</h4>
          {form}
          <h4>Sortuj</h4>
          <Header direction={'vertical'} {...listProps} />
        </BottomSheet>
      ) : (
        form
      )}
    </>
  )
}
