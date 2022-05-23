import { VFC } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { TimetableCards } from '../timetable-cards/timetable-cards'

export const TimetableCardsGrid: VFC = () => {
  return (
    <SimpleGrid
      columns={[1, null, null, 2, 3]}
      justifyContent="space-around"
      px={10}
      py={5}
      w="full"
      spacingX="30px"
      spacingY={5}
      overflowY="auto"
    >
      <TimetableCards />
    </SimpleGrid>
  )
}
