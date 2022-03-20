import { useEffect, useState } from 'react'
import { WeekDaysRU } from 'types/timetable.types'
import capitalizeFirst from 'utils/capitalizeFirst'
import getWeekDay from 'utils/getWeekDay'

export const useWeekDay = () => {
  const [weekDay, setWeekDay] = useState<WeekDaysRU>()
  useEffect(() => {
    setWeekDay(getWeekDay())
  }, [])
  return weekDay
}
