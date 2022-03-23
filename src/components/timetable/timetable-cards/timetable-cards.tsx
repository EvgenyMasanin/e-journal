import { forwardRef } from '@chakra-ui/react'
import useTimetableContext from 'components/timetable/hooks/useTimetableContest'
import { TimetableCard } from './timetable-card/timetable-card'
import { WeekDaysMap, weekDaysRU } from 'types'

export interface TimetableCardsProps {}

export const TimetableCards = forwardRef<TimetableCardsProps, 'div'>((_, ref) => {
  const { week } = useTimetableContext()

  return (
    <>
      {weekDaysRU.map((weekDay, i) => (
        <TimetableCard
          ref={ref}
          key={i}
          weekTimetables={week[WeekDaysMap[weekDay]]}
          weekDay={weekDay}
        />
      ))}
    </>
  )
})
