import { FC } from 'react'
import { useRadio, Box, Center } from '@chakra-ui/react'
import { useHoverColor } from 'hooks/useHoverColor'

export const RadioCard: FC = ({ children, ...props }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Center
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{ ...useHoverColor() }}
        _focus={{
          boxShadow: 'outline',
        }}
        w={10}
        h={10}
      >
        {children}
      </Center>
    </Box>
  )
}
