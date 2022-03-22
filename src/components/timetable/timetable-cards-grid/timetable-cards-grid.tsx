import { VFC } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { TimetableCards } from '../timetable-cards/timetable-cards'

export interface TimetableCardsGridProps {}

export const TimetableCardsGrid: VFC<TimetableCardsGridProps> = ({}) => {
  return (
    <SimpleGrid
      columns={[1, null, null, 2, 3]}
      justifyContent="space-around"
      px={10}
      py={5}
      spacingX="80px"
      spacingY={5}
      overflowY="auto"
    >
      <TimetableCards />
    </SimpleGrid>
  )
}
