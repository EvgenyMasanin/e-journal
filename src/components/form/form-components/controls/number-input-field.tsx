import { forwardRef } from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputStepper,
  NumberInputField as NumberInputFieldUI,
  NumberInputFieldProps as NumberInputFieldUIProps,
} from '@chakra-ui/react'

export interface NumberInputFieldProps extends NumberInputFieldUIProps {
  errorMessage?: string
  label?: string
  isInvalid: boolean
}

export const NumberInputField = forwardRef<HTMLInputElement, NumberInputFieldProps>(
  ({ isInvalid, label, errorMessage, ...props }, ref) => {
    return (
      <FormControl isInvalid={isInvalid}>
        {label && <FormLabel>{label}</FormLabel>}
        <NumberInput allowMouseWheel>
          <NumberInputFieldUI ref={ref} {...props} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    )
  }
)

NumberInputField.displayName = 'InputField'
