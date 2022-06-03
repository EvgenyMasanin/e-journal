import { Box, HStack, Tag, VStack, Text, Flex, Avatar } from '@chakra-ui/react'
import { VFC } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { useTypedSelector } from 'redux-store/hooks'

export const User: VFC = ({}) => {
  const user = useTypedSelector((state) => state.user.user)
  const teacher = user.teacher

  const userName = teacher ? teacher.fullName ?? teacher.name : user.email

  return (
    <HStack>
      <VStack alignItems="flex-start" spacing={1} ml="2">
        <Text fontSize="md" fontWeight="semibold">
          {userName}
        </Text>
        <Flex gap={2}>
          {user.roles?.map((r) => (
            <Tag
              key={r.id}
              fontWeight="bold"
              fontSize="md"
              size="sm"
              variant="subtle"
              colorScheme="teal"
            >
              {r.name}
            </Tag>
          ))}
        </Flex>
      </VStack>
      <Box display={{ base: 'none', md: 'flex' }}>
        <FiChevronDown />
      </Box>
    </HStack>
  )
}
