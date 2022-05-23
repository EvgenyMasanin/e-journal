import { Box } from '@chakra-ui/react'
import { Option, SelectField } from 'components/form'
import { VFC } from 'react'
import { Control, UseFormSetValue } from 'react-hook-form'
import { Timetable, WeekType } from 'types'
import { findOptionByValue } from 'utils/find-option-by-value'

const weekTypeOptions: Option<WeekType>[] = [
  { value: 'up', label: 'Up' },
  { value: 'down', label: 'Down' },
  { value: 'up/down', label: 'Up/down' },
]

export interface WeekTypeInputCellProps {
  control: Control<Timetable>
  setValue: UseFormSetValue<Timetable>
  value: WeekType
}

export const WeekTypeInputCell: VFC<WeekTypeInputCellProps> = ({ control, setValue, value }) => {
  return (
    <Box minW={150}>
      <SelectField
        id="weekType"
        name="weekType"
        control={control}
        options={weekTypeOptions}
        getOnlyValueOnChange
        defaultValue={findOptionByValue(weekTypeOptions, value)}
        setDefaultValueFunction={() => setValue('weekType', value as WeekType)}
      />
    </Box>
  )
}
