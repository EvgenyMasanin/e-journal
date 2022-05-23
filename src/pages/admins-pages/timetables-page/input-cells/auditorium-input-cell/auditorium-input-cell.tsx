import { NumberInputField } from 'components/form'
import { useRegisterContext } from 'components/table/hooks/useRegisterContext'
import { useValidationErrors } from 'components/table/hooks/useValidationErrors'
import { VFC } from 'react'
import { Timetable } from 'types'

export interface AuditoriumCellProps {
  value: number
}

export const AuditoriumInputCell: VFC<AuditoriumCellProps> = ({ value }) => {
  const register = useRegisterContext<Timetable>()

  const { errors } = useValidationErrors<Timetable>()

  return (
    <NumberInputField
      minW={78}
      min={1}
      {...register('auditorium', { value })}
      isInvalid={!!errors.auditorium}
      errorMessage={errors.auditorium?.message}
    />
  )
}
