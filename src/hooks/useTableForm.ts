import { useCallback, useMemo } from 'react'
import { Resolver, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

export interface UseTableFormProps<T> {
  resolver: Resolver<T>
  handleSubmit?: SubmitHandler<T>
  handleInValid?: SubmitErrorHandler<T>
  handleDelete?: (dataId: number) => void
}

export const useTableForm = <T>({
  resolver,
  handleSubmit = () => undefined,
  handleDelete = () => undefined,
  handleInValid = () => undefined,
}: UseTableFormProps<T>) => {
  const form = useForm<T>({ resolver })

  const onSubmit: SubmitHandler<T> = useCallback(
    (data) => {
      console.log('🚀 ~ data', data)
      const touchedFieldsCount = Object.keys(form.formState.dirtyFields).length

      if (touchedFieldsCount) {
        handleSubmit(data)
      }
    },
    [form.formState.dirtyFields, handleSubmit]
  )

  const onInValid: SubmitErrorHandler<T> = useCallback(
    (data) => handleInValid(data),
    [handleInValid]
  )

  const onDelete = useCallback((dataId: number) => handleDelete(dataId), [handleDelete])

  return useMemo(
    () => ({
      form,
      onSubmit,
      onInValid,
      onDelete,
    }),
    [form, onSubmit, onInValid, onDelete]
  )
}
