import { useEffect, useState } from 'react'
import { WeekDaysRU } from 'types/timetable.types'
import capitalizeFirst from 'utils/capitalizeFirst'

export const useWeekDay = () => {
  const [weekDay, setWeekDay] = useState<WeekDaysRU>()
  useEffect(() => {
    setWeekDay(capitalizeFirst<WeekDaysRU>(new Date().toLocaleString('ru', { weekday: 'long' })))
  }, [])
  return weekDay
}
