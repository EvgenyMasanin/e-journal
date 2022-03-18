import { Group, SubGroupNumber } from './group.types'
import { SubjectTypes } from './subject.types'

export enum WeekDaysMap {
  'Понедельник' = 'monday',
  'Вторник' = 'tuesday',
  'Среда' = 'wednesday',
  'Четверг' = 'thursday',
  'Пятница' = 'friday',
  'Суббота' = 'saturday',
}

export const weekDaysRU = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
] as const

export type WeekDaysRU = keyof typeof WeekDaysMap
export type WeekDaysEN = `${WeekDaysMap}`

export const weekType = ['up', 'down', 'up/down'] as const
export type WeekType = typeof weekType[number]

export enum WeekDays {
  'Понедельник' = 1,
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
}

export interface Lesson extends Omit<Timetable, 'subjectId' | 'hoursPerSemester' | 'hoursPerWeek'> {
  subjectName: string
}

export type CourseNum = 1 | 2 | 3 | 4 | 5

export const semester = ['first', 'second'] as const
export type Semester = typeof semester[number]

export interface Timetable {
  id: number
  subjectId: number
  groupId: number
  groupName: string
  subGroupsCount: SubGroupNumber
  subGroupNum: SubGroupNumber
  weekDay: WeekDaysEN
  subjectType: SubjectTypes
  hoursPerSemester: number
  hoursPerWeek: number
  semester: Semester
  course: CourseNum
  lessonNumber: number
  weekType: WeekType
  auditorium: number
  campus: number
}
