/* eslint-disable react/display-name */
import { RadioField } from 'components/form'
import { UseFormReturn } from 'react-hook-form'
import { GroupFormFields } from './groups-page'

export const getRenderCell =
  (form: UseFormReturn<GroupFormFields>) => (columnName: string, value: string) => {
    if (columnName === 'Количество подгрупп') {
      return (
        <RadioField
          control={form.control}
          name="subGroupsCount"
          options={['1', '2']}
          setDefault={() => form.setValue('subGroupsCount', value as '1' | '2')}
        />
      )
    }
    return null
  }
