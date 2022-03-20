import React, { VFC } from 'react'
import { Center, Text } from '@chakra-ui/react'

export const TimetableCardPlaceholder: VFC = () => {
  return (
    <Center h="100%" alignItems="center">
      <Text>Свободный день.</Text>
    </Center>
  )
}
