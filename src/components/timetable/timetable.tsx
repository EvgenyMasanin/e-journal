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
  const isMd = useBreakpointValue({ base: true, md: false })

  return (
    <TimetableContext.Provider value={{ lessons }}>
      <VStack h="100%" overflow="auto" justifyContent="center">
        {!isMd ? <TimetableCardsGrid /> : <TimetableCardSlider />}
      </VStack>
    </TimetableContext.Provider>
  )
}
