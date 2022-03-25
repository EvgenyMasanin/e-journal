import { Semester } from './../types/timetable.types'
import { WeekTimetable, WeekType } from 'types'

export const weekTimetableFilter =
  (weekType: WeekType, semester: Semester) => (weekTimetable: WeekTimetable) =>
    weekTimetable.weekType.split('/').includes(weekType) && weekTimetable.semester === semester
