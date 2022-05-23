import { RadioField } from 'components/form'
import { VFC } from 'react'
import { Control, UseFormSetValue } from 'react-hook-form'
import { semester, Semester, Timetable } from 'types'

export interface SemesterInputCellProps {
  control: Control<Timetable>
  setValue: UseFormSetValue<Timetable>
  value: Semester
}

export const SemesterInputCell: VFC<SemesterInputCellProps> = ({ control, setValue, value }) => {
  return (
    <RadioField
      name="semester"
      options={[...semester]}
      control={control}
      setDefault={() => setValue('semester', value)}
    />
  )
}
