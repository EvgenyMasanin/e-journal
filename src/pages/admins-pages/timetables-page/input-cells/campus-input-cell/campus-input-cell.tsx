import { NumberInputField } from 'components/form'
import { useRegisterContext } from 'components/table/hooks/useRegisterContext'
import { useValidationErrors } from 'components/table/hooks/useValidationErrors'
import { VFC } from 'react'
import { Timetable } from 'types'

export interface CampusInputCellProps {
  value: number
}

export const CampusInputCell: VFC<CampusInputCellProps> = ({ value }) => {
  const register = useRegisterContext<Timetable>()

  const { errors } = useValidationErrors<Timetable>()

  return (
    <NumberInputField
      minW={78}
      min={1}
      {...register('campus', { value })}
      isInvalid={!!errors.campus}
      errorMessage={errors.campus?.message}
    />
  )
}
