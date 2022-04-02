import { VFC } from 'react'
import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { useRegisterContext } from '../hooks/useRegisterContext'
import { useValidationErrors } from '../hooks/useValidationErrors'
import { TimetableCellProps } from '../table-cell'

export type TableInputCellProps = Pick<TimetableCellProps, 'fieldName' | 'value'>

export const TableInputCell: VFC<TableInputCellProps> = ({ fieldName, value }) => {
  const register = useRegisterContext()

  const { errors } = useValidationErrors()

  return (
    <FormControl id={fieldName} isInvalid={errors?.[fieldName]}>
      <Input {...register(fieldName)} defaultValue={value ?? ''} />
      <FormErrorMessage>{errors?.[fieldName]?.message}</FormErrorMessage>
    </FormControl>
  )
}
