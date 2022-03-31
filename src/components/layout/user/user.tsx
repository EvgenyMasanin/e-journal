import { Avatar, Box, HStack, Tag, VStack, Text } from '@chakra-ui/react'
import { VFC } from 'react'
import { FiChevronDown } from 'react-icons/fi'

export interface UserProps {}

export const User: VFC<UserProps> = ({}) => {
  return (
    <HStack>
      <Avatar
        size={'sm'}
        src={
          'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
        }
      />
      <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
        <Text fontSize="sm">Justina Clark</Text>
        <Tag fontWeight="bold" fontSize="md" size="sm" variant="subtle" colorScheme="teal">
          Admin
        </Tag>
      </VStack>
      <Box display={{ base: 'none', md: 'flex' }}>
        <FiChevronDown />
      </Box>
    </HStack>
  )
}
