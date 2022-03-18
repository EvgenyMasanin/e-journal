export enum WeekDays {
  'Понедельник' = 1,
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
}

export const weekDaysType = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
] as const

export type WeekDaysType = typeof weekDaysType[number]

export interface Lesson {
  id: number
  name: string
  number: number
}
