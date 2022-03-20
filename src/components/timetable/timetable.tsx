import { createContext, VFC } from 'react'
import { useBreakpointValue, VStack } from '@chakra-ui/react'
import { TimetableCardSlider } from 'components/timetable/timetable-card-slider'
import { TimetableCardsGrid } from './timetable-cards-grid'
import { Lesson } from 'types/timetable.types'

export interface TimetableProps {
  lessons: Lesson[]
}

export const TimetableContext = createContext<{ lessons: Lesson[] }>({
  lessons: [],
})

export const Timetable: VFC<TimetableProps> = ({ lessons }) => {
  const isLg = useBreakpointValue({ base: true, lg: false })

  return (
    <TimetableContext.Provider value={{ lessons }}>
      <VStack h="100%" overflow="auto" justifyContent="center">
        {!isLg ? <TimetableCardsGrid /> : <TimetableCardSlider />}
      </VStack>
    </TimetableContext.Provider>
  )
}
