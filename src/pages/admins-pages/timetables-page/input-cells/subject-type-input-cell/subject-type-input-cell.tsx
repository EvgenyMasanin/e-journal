import { Box } from '@chakra-ui/react'
import { Option, SelectField } from 'components/form'
import { VFC } from 'react'
import { Control, UseFormSetValue } from 'react-hook-form'
import { SubjectTypes, Timetable } from 'types'
import { findOptionByValue } from 'utils/find-option-by-value'

const subjectTypesOptions: Option<SubjectTypes>[] = [
  {
    value: 'lecture',
    label: 'Lecture',
  },
  { value: 'laboratory', label: 'Laboratory' },
  { value: 'practice', label: 'Practice' },
]

export interface SubjectTypeInputCellProps {
  control: Control<Timetable>
  setValue: UseFormSetValue<Timetable>
  value: SubjectTypes
}

export const SubjectTypeInputCell: VFC<SubjectTypeInputCellProps> = ({
  control,
  setValue,
  value,
}) => {
  return (
    <Box minW={200}>
      <SelectField
        id="subjectType"
        name="subjectType"
        control={control}
        options={subjectTypesOptions}
        getOnlyValueOnChange
        defaultValue={findOptionByValue(subjectTypesOptions, value)}
        setDefaultValueFunction={() => setValue('subjectType', value as SubjectTypes)}
      />
    </Box>
  )
}
