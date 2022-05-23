import { useEffect } from 'react'
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { ActionMeta, MultiValue, OptionBase, Select } from 'chakra-react-select'
import { Control, useController } from 'react-hook-form'
import { usePrimaryColor } from 'hooks/usePrimaryColor'

export interface Option<T extends string = string> extends OptionBase {
  label: string
  value: T
}

export interface SelectFieldProps<T extends string> {
  id: string
  name: string
  control: Control<any>
  isMulti?: boolean
  placeholder?: string
  label?: string
  options: Option<T>[]
  defaultValue?: Option<T>
  getOnlyValueOnChange?: boolean
  setDefaultValueFunction?: () => void
}

export const SelectField = <T extends string>({
  name,
  control,
  options,
  label,
  placeholder,
  defaultValue,
  setDefaultValueFunction = () => undefined,
  getOnlyValueOnChange,
  ...props
}: SelectFieldProps<T>) => {
  //FIXME: not sure about "value"
  const {
    field: { value, ...field },
    fieldState: { invalid, error },
  } = useController({
    name: name as any,
    control,
  })

  const { onChange } = field

  const handleChange = (
    newValue: Option<T> | MultiValue<Option<T>>,
    actionMeta: ActionMeta<Option<T>>
  ) => {
    let currentValue: Option<T> | MultiValue<Option<T>> | string = newValue
    if ('value' in newValue) {
      currentValue = newValue.value
    }
    onChange(...[currentValue, actionMeta])
  }

  useEffect(setDefaultValueFunction, [setDefaultValueFunction])

  return (
    <FormControl isInvalid={invalid}>
      {label && <FormLabel>{label}</FormLabel>}
      <Select
        {...field}
        focusBorderColor={usePrimaryColor()}
        selectedOptionStyle="check"
        defaultValue={defaultValue}
        placeholder={placeholder || label || ''}
        {...props}
        options={options}
        onChange={getOnlyValueOnChange ? handleChange : onChange}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

SelectField.displayName = 'InputField'
