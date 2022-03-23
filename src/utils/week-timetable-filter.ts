import { WeekTimetable, WeekType } from 'types'

export const weekTimetableFilter = (weekType: WeekType) => (weekTimetable: WeekTimetable) =>
  weekTimetable.weekType.split('/').includes(weekType)
