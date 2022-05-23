import { NumberInputField } from 'components/form'
import { useRegisterContext } from 'components/table/hooks/useRegisterContext'
import { useValidationErrors } from 'components/table/hooks/useValidationErrors'
import { VFC } from 'react'
import { CourseNum, Timetable } from 'types'

export interface CourseInputCellProps {
  value: CourseNum
}

export const CourseInputCell: VFC<CourseInputCellProps> = ({ value }) => {
  const register = useRegisterContext<Timetable>()

  const { errors } = useValidationErrors<Timetable>()

  return (
    <NumberInputField
      minW={78}
      {...register('course', { value })}
      max={5}
      min={1}
      isInvalid={!!errors.course}
      errorMessage={errors.course?.message}
    />
  )
}
