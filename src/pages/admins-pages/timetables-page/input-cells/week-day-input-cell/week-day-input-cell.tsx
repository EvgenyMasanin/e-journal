import { Box } from '@chakra-ui/react'
import { Option, SelectField } from 'components/form'
import { VFC } from 'react'
import { Control, UseFormSetValue } from 'react-hook-form'
import { Timetable, WeekDaysEN } from 'types'
import { findOptionByValue } from 'utils/find-option-by-value'

const weekDayOptions: Option<WeekDaysEN>[] = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
]

export interface WeekDayInputCellProps {
  control: Control<Timetable>
  setValue: UseFormSetValue<Timetable>
  value: WeekDaysEN
}

export const WeekDayInputCell: VFC<WeekDayInputCellProps> = ({ control, setValue, value }) => {
  return (
    <Box minW={200}>
      <SelectField
        id="weekDay"
        name="weekDay"
        control={control}
        options={weekDayOptions}
        getOnlyValueOnChange
        defaultValue={findOptionByValue(weekDayOptions, value)}
        setDefaultValueFunction={() => setValue('weekDay', value)}
      />
    </Box>
  )
}
