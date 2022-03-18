import { SubjectHours } from './subject.types'
import { Timetable } from './timetable.types'

export const subGroupNumber = [1, 2] as const
export type SubGroupNumber = typeof subGroupNumber[number]

export interface Group {
  id: number
  name: string
  subGroupsCount: SubGroupNumber
}
