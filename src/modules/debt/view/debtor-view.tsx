import { useForm } from 'react-hook-form'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import styles from './debtor-view.module.scss'
import type { SubmitHandler } from 'react-hook-form'
import type { DebtorForm } from '@/modules/debt/common/types.ts'
import { useListController } from '@/shared/components/data-grid/components/controllers/useListController.tsx'
import { useFilteredDebts, useTopDebts } from '@/shared/integrations/queries'
import { useColumnsDef } from '@/modules/debt/view/useColumnsDef.ts'
import { debtorSearchSchema } from '@/modules/debt/common/schema.ts'
import { DebtorListFilter } from '@/modules/debt/filters/debtor-list-filter.tsx'
import { DataGrid } from '@/shared/components/data-grid/data-grid.tsx'
import { BottomSheetSpacer } from '@/shared/components/bottom-sheet/bottom-sheet-spacer.tsx'
import { useIsMobile } from '@/shared/utils/useIsMobile.ts'

export const DebtorView = () => {
  const navigate = useNavigate({ from: '/debtor' })
  const search = useSearch({ from: '/debtor' })
  const topDebts = useTopDebts(search.phrase)
  const filteredDebts = useFilteredDebts(search.phrase)
  const columns = useColumnsDef()
  const listProps = useListController({
    columns,
    initialSorting: search.sorting,
  })
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { phrase: search.phrase ?? '' },
    resolver: zodResolver(debtorSearchSchema),
  })
  const isMobile = useIsMobile()
  const loading =
    listProps.loading || topDebts.isFetching || filteredDebts.isFetching

  const onSubmit: SubmitHandler<DebtorForm> = async (data) => {
    await navigate({ search: (prev) => ({ ...prev, ...data }) })
  }

  const handleClear = async () => {
    await navigate({ search: { sorting: listProps.sorting } })
    reset({ phrase: '' })
  }

  useEffect(() => {
    if (!topDebts.data || !topDebts.dataUpdatedAt) return

    listProps.setRows(topDebts.data)
  }, [topDebts.dataUpdatedAt])

  useEffect(() => {
    if (!filteredDebts.data || !filteredDebts.dataUpdatedAt) return

    listProps.setRows(filteredDebts.data)
  }, [filteredDebts.dataUpdatedAt])

  useEffect(() => {
    navigate({ search: (prev) => ({ ...prev, sorting: listProps.sorting }) })
  }, [listProps.sorting])

  return (
    <BottomSheetSpacer isMobile={isMobile}>
      <div className={styles['debtor-view__filters']}>
        <DebtorListFilter
          listProps={listProps}
          handleSubmit={handleSubmit}
          onClear={handleClear}
          onValid={onSubmit}
          control={control}
          errors={errors}
        />
      </div>
      <div className={styles['debtor-view__data-grid']}>
        <DataGrid idKey={'Id'} {...listProps} loading={loading} />
      </div>
    </BottomSheetSpacer>
  )
}
