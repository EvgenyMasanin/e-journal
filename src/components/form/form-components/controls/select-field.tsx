import { VFC } from 'react'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { OptionBase, Select } from 'chakra-react-select'
import { Control, useController } from 'react-hook-form'

export interface Option extends OptionBase {
  label: string
  value: string
}

export interface SelectFieldProps {
  id: string
  name: string
  control: Control<any>
  isMulti?: boolean
  placeholder?: string
  label?: string
  options: Option[]
}

export const SelectField: VFC<SelectFieldProps> = ({
  name,
  control,
  options,
  label,
  placeholder,
  ...props
}) => {
  //FIXME: not sure about "value"
  const {
    field: { value, ...field },
    fieldState: { invalid, error },
  } = useController({
    name: name as any,
    control,
  })

  return (
    <FormControl isInvalid={invalid}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select {...field} placeholder={placeholder || label || ''} {...props} options={options} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

SelectField.displayName = 'InputField'
