import { NumberInputField } from 'components/form'
import { useRegisterContext } from 'components/table/hooks/useRegisterContext'
import { useValidationErrors } from 'components/table/hooks/useValidationErrors'
import { VFC } from 'react'
import { Timetable } from 'types'

export interface HoursPerSemesterInputCellProps {
  value: number
}

export const HoursPerSemesterInputCell: VFC<HoursPerSemesterInputCellProps> = ({ value }) => {
  const register = useRegisterContext<Timetable>()

  const { errors } = useValidationErrors<Timetable>()

  return (
    <NumberInputField
      minW={78}
      onlyPositive
      {...register('hoursPerSemester', { value })}
      isInvalid={!!errors.hoursPerSemester}
      errorMessage={errors.hoursPerSemester?.message}
    />
  )
}
