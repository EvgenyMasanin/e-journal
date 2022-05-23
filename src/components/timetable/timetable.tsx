import { createContext, VFC } from 'react'
import { VStack } from '@chakra-ui/react'
import { TimetableCardsGrid } from './timetable-cards-grid'
import { Semester, Week, WeekType } from 'types'
import { useTypedSelector } from 'redux-store/hooks'
import { TimetableHeading } from './timetable-heading'
import { Loader } from 'components/loader'

export interface TimetableProps {
  week: Week
  isLoading: boolean
}

export interface ITimetableContext {
  week: Week
  weekType: WeekType
  semester: Semester
}

export const TimetableContext = createContext<ITimetableContext>({
  week: null,
  weekType: null,
  semester: null,
})

export const Timetable: VFC<TimetableProps> = ({ week, isLoading }) => {
  const { selectedSemester: semester, selectedWeekType: weekType } = useTypedSelector((state) => ({
    selectedWeekType: state.timetableReducer.selectedWeekType,
    selectedSemester: state.timetableReducer.selectedSemester,
  }))

  return (
    <TimetableContext.Provider value={{ week: week, weekType: weekType, semester }}>
      <VStack h="full" overflow="auto">
        <TimetableHeading />
        {isLoading ? <Loader /> : <TimetableCardsGrid />}
        {/* {isLoading ? <Loader /> : !isMd ? <TimetableCardsGrid /> : <TimetableCardSlider />} */}
      </VStack>
    </TimetableContext.Provider>
  )
}
