import { NumberInputField } from 'components/form'
import { useRegisterContext } from 'components/table/hooks/useRegisterContext'
import { useValidationErrors } from 'components/table/hooks/useValidationErrors'
import { VFC } from 'react'
import { Timetable } from 'types'

export interface LessonNumberInputCellProps {
  value: number
}

export const LessonNumberInputCell: VFC<LessonNumberInputCellProps> = ({ value }) => {
  const register = useRegisterContext<Timetable>()

  const { errors } = useValidationErrors<Timetable>()

  return (
    <NumberInputField
      minW={78}
      {...register('lessonNumber', { value })}
      max={6}
      min={1}
      isInvalid={!!errors.lessonNumber}
      errorMessage={errors.lessonNumber?.message}
    />
  )
}
