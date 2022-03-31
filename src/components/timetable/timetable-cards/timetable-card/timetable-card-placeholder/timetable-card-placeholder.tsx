import React, { VFC } from 'react'
import { Center, Text } from '@chakra-ui/react'

export const TimetableCardPlaceholder: VFC = () => {
  return (
    <Center h="full" alignItems="center">
      <Text>Свободный день.</Text>
    </Center>
  )
}
