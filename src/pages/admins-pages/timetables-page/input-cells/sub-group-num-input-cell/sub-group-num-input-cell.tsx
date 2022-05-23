import { NumberInputField } from 'components/form'
import { useRegisterContext } from 'components/table/hooks/useRegisterContext'
import { useValidationErrors } from 'components/table/hooks/useValidationErrors'
import { VFC } from 'react'
import { Timetable } from 'types'

export interface SubGroupNumInputCellProps {
  value: 1 | 2
}

export const SubGroupNumInputCell: VFC<SubGroupNumInputCellProps> = ({ value }) => {
  const register = useRegisterContext<Timetable>()

  const { errors } = useValidationErrors<Timetable>()

  return (
    <NumberInputField
      minW={78}
      {...register('subGroupNum', { value })}
      max={2}
      min={1}
      isInvalid={!!errors.subGroupNum}
      errorMessage={errors.subGroupNum?.message}
    />
  )
}
