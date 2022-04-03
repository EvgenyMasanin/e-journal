import { Stack } from '@chakra-ui/react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
// eslint-disable-next-line import/no-unresolved
import { Path } from 'react-hook-form/dist/types/path'
import { InputField } from '../controls/input-field'

export interface FormControlsProps<T> {
  register: UseFormRegister<T>
  errors: FieldErrors<T>
  fields: Path<T>[]
}

export const FormControls = <T,>({ fields, register, errors }: FormControlsProps<T>) => {
  return (
    <Stack spacing="6">
      {fields.map((fieldName) => {
        const stringFieldName = String(fieldName)

        const errorsAny = errors as any

        return (
          <InputField
            key={stringFieldName}
            label={fieldName}
            placeholder={fieldName}
            {...register(fieldName)}
            isInvalid={!!errorsAny[fieldName]}
            errorMessage={errorsAny[fieldName]?.message}
          />
        )
      })}
    </Stack>
  )
}
