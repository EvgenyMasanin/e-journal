import { NumberInputField } from 'components/form'
import { useRegisterContext } from 'components/table/hooks/useRegisterContext'
import { useValidationErrors } from 'components/table/hooks/useValidationErrors'
import { VFC } from 'react'
import { Timetable } from 'types'

export interface HoursPerWeekInputCellProps {
  value: number
}

export const HoursPerWeekInputCell: VFC<HoursPerWeekInputCellProps> = ({ value }) => {
  const register = useRegisterContext<Timetable>()

  const { errors } = useValidationErrors<Timetable>()

  return (
    <NumberInputField
      minW={78}
      onlyPositive
      {...register('hoursPerWeek', { value })}
      isInvalid={!!errors.hoursPerWeek}
      errorMessage={errors.hoursPerWeek?.message}
    />
  )
}
