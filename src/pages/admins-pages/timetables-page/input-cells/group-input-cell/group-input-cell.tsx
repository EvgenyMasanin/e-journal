import { Box } from '@chakra-ui/react'
import { Option, SelectField } from 'components/form'
import { VFC } from 'react'
import { Control, UseFormSetValue } from 'react-hook-form'
import { Group, Timetable } from 'types'
import { findOptionByValue } from 'utils/find-option-by-value'

export const mapGroupsToOptions = (groups: Group[] = []): Option[] =>
  groups.map((group) => ({
    label: group.name,
    value: String(group.id),
  }))

export interface GroupInputCellProps {
  control: Control<Timetable>
  setValue: UseFormSetValue<Timetable>
  value: number
  groups: Group[]
}

export const GroupInputCell: VFC<GroupInputCellProps> = ({ control, setValue, value, groups }) => {
  const groupOptions = mapGroupsToOptions(groups)

  return (
    <Box minW={150}>
      <SelectField
        id="groupId"
        name="groupId"
        control={control}
        options={groupOptions}
        getOnlyValueOnChange
        defaultValue={findOptionByValue(groupOptions, String(value))}
        setDefaultValueFunction={() => setValue('groupId', value)}
      />
    </Box>
  )
}
