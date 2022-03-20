import { forwardRef } from '@chakra-ui/react'
import useTimetableContext from 'components/timetable/hooks/useTimetableContest'
import { TimetableCard } from './timetable-card/timetable-card'
import { weekDaysRU } from 'types/timetable.types'

export interface TimetableCardsProps {}

export const TimetableCards = forwardRef<TimetableCardsProps, 'div'>((_, ref) => {
  const { lessons } = useTimetableContext()

  return (
    <>
      {weekDaysRU.map((weekDay, i) => (
        <TimetableCard ref={ref} key={i} lessons={lessons.slice(0, i)} weekDay={weekDay} />
      ))}
    </>
  )
})
