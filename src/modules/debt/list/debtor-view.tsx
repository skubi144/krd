import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import styles from './debtor-list.module.scss'
import type { SubmitHandler } from 'react-hook-form'
import { Input } from '@/shared/components/input/input.tsx'
import { Button } from '@/shared/components/button/button.tsx'
import { DataGrid } from '@/shared/components/data-grid/data-grid.tsx'
import { useListController } from '@/shared/components/data-grid/components/controllers/useListController.tsx'
import { useFilteredDebts, useTopDebts } from '@/shared/integrations/queries'
import { useColumnsDef } from '@/modules/debt/list/useColumnsDef.ts'
import { debtorSearchSchema } from '@/modules/debt/list/schema.ts'

interface DebtorForm {
  phrase?: string
}
export const DebtorView = () => {
  const navigate = useNavigate({ from: '/debtor' })
  const search = useSearch({ from: '/debtor' })
  const topDebts = useTopDebts(!search.phrase)
  const filteredDebts = useFilteredDebts(search.phrase)
  const columns = useColumnsDef()
  const listProps = useListController({
    columns,
    rows: search.phrase ? filteredDebts.data : topDebts.data,
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
  const loading =
    listProps.loading || topDebts.isFetching || filteredDebts.isFetching

  const onSubmit: SubmitHandler<DebtorForm> = async (data) => {
    await navigate({ search: data })
  }

  const handleClear = async () => {
    await navigate({ search: { sorting: listProps.sorting } })
    reset({ phrase: '' })
  }

  useEffect(() => {
    navigate({ search: { sorting: listProps.sorting } })
  }, [listProps.sorting])

  return (
    <>
      <div className={styles.filters}>
        <form onSubmit={handleSubmit(onSubmit)} onReset={handleClear}>
          <Controller
            name="phrase"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                label="Podaj NIP lub nazwę dłużnika"
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
                error={errors.phrase && "Aby wyszukać, podaj co najmniej 3 znaki"}
              />
            )}
          />
        </form>
      </div>
      <div>
        <DataGrid {...listProps} loading={loading} />
      </div>
    </>
  )
}
