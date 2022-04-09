/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react'
import { useRadioGroup, HStack, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { RadioCard } from './radio-card'
import { Control, useController } from 'react-hook-form'

export interface RadioField {
  control: Control<any>
  label?: string
  name: string
  options: Array<string>
  isRequired?: boolean
  setDefault?: () => void
}

export const RadioField: FC<RadioField> = ({
  control,
  name,
  options,
  label,
  isRequired,
  setDefault = () => undefined,
}) => {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name,
  })
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    onChange: field.onChange,
    value: field.value,
  })

  const group = getRootProps()

  useEffect(setDefault, [])

  return (
    <FormControl isRequired={isRequired} isInvalid={!!errors[name]} mb={6}>
      {label && <FormLabel>{label}</FormLabel>}
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value })
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          )
        })}
      </HStack>
      <FormErrorMessage>{errors[name] && errors[name].message}</FormErrorMessage>
    </FormControl>
  )
}
