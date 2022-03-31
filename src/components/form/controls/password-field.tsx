import { forwardRef, useRef } from 'react'
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
  Link,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react'
import { usePrimaryColor } from 'hooks/usePrimaryColor'
import { HiEye, HiEyeOff } from 'react-icons/hi'

export interface PasswordFieldProps extends InputProps {
  errorMessage?: string
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ isInvalid, errorMessage, ...props }, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)

    const mergeRef = useMergeRefs(inputRef, ref)

    const onClickReveal = () => {
      onToggle()
      const input = inputRef.current
      if (input) {
        input.focus({ preventScroll: true })
        const length = input.value.length
        requestAnimationFrame(() => {
          input.setSelectionRange(length, length) // for async move the cursor to the end
        })
      }
    }

    const color = usePrimaryColor()

    const bgColor = useColorModeValue('transparent', 'gray.700')
    const bgColorHover = useColorModeValue('gray.300', 'gray.600')

    return (
      <FormControl id="password" isInvalid={isInvalid}>
        <Flex justify="space-between">
          <FormLabel>Пароль</FormLabel>
          <Box as={Link} color={color} fontWeight="semibold" fontSize="sm">
            Забыли пароль?
          </Box>
        </Flex>
        <InputGroup>
          <Input
            ref={mergeRef}
            id="password"
            type={isOpen ? 'text' : 'password'}
            autoComplete="current-password"
            {...props}
          />
          <InputRightElement>
            <IconButton
              h="calc(100% - 2px)"
              mr="1px"
              bgColor={bgColor}
              _hover={{ bgColor: bgColorHover }}
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    )
  }
)

PasswordField.displayName = 'PasswordField'
