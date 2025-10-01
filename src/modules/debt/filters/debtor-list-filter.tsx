import { Controller } from 'react-hook-form'
import { useSearch } from '@tanstack/react-router'
import type {
  Control,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form'
import type { DebtorForm } from '@/modules/debt/common/types.ts'
import type { FC } from 'react'
import { Button } from '@/shared/components/button/button.tsx'
import { Input } from '@/shared/components/input/input.tsx'

//
// <BottomSheet>
// <h4>Filtruj</h4>
// <Controller
//   name="phrase"
//   control={control}
//   defaultValue=""
//   render={({ field }) => (
//     <Input
//       {...field}
//       placeholder={'Podaj NIP lub nazwę dłużnika'}
//       // label="Podaj NIP lub nazwę dłużnika"
//       suffix={
//         <>
//           <Button type="submit">Szukaj</Button>
//           {search.phrase && (
//             <Button variant={'secondary'} type="reset">
//               X
//             </Button>
//           )}
//         </>
//       }
//       error={
//         errors.phrase && 'Aby wyszukać, podaj co najmniej 3 znaki'
//       }
//     />
//   )}
// />
// {/*  <h4>Sortuj</h4>*/}
// {/*  <Header*/}
// {/*    direction={'vertical'}*/}
// {/*    columns={listProps.columns}*/}
// {/*    sorting={listProps.sorting}*/}
// {/*    onSortChange={listProps.onSortChange}*/}
// {/*    sortingHash={listProps.sortingHash}*/}
// {/*  />*/}
// {/*</BottomSheet>*/}

interface DebtorListFilterParams {
  handleSubmit: UseFormHandleSubmit<DebtorForm>
  onClear: () => void
  onValid: SubmitHandler<DebtorForm>
  control: Control<DebtorForm>
  errors: FieldErrors<DebtorForm>
}

export const DebtorListFilter: FC<DebtorListFilterParams> = (props) => {
  const { handleSubmit, onValid, onClear, control, errors } = props
  const search = useSearch({ from: '/debtor' })

  return (
    <form onSubmit={handleSubmit(onValid)} onReset={onClear}>
      <Controller
        name="phrase"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            {...field}
            placeholder={'Podaj NIP lub nazwę dłużnika'}
            // label="Podaj NIP lub nazwę dłużnika"
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
}
