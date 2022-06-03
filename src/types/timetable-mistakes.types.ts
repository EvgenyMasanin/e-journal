import { SubGroupNumber } from './group.types'
import { SubjectTypes } from './subject.types'
import { CourseNum, Semester, WeekDaysEN, WeekType } from './timetable.types'

export interface CountOfLessonsMistake {
  teacherId: number
  teacherName: string
  subjectId: number
  subjectName: string
  subjectType: SubjectTypes
  groupId: number
  groupName: string
  subgroupNum: SubGroupNumber
  expectedHoursPerWeek: number
  realHoursPerWeek: number
}

export interface MissingCampusOrAuditoriumMistake {
  id: number
  teacherId: number
  teacherName: string
  teacherFullName: string
  subjectId: number
  subjectName: string
  groupId: number
  groupName: string
  subGroupNum: SubGroupNumber
  semester: Semester
  course: CourseNum
  lessonNumber: number
  weekDay: WeekDaysEN
  weekType: WeekType
  type: SubjectTypes
  auditorium: number
  campus: number
}

export interface SameAuditoriumMistakeTimetableData {
  id: number
  teacherName: string
  subjectName: string
  subjectType: SubjectTypes
  groupName: string
  subGroupNumber: SubGroupNumber
  auditorium: number
  campus: number
  course: CourseNum
  lessonNumber: number
  semester: Semester
  weekDay: WeekDaysEN
  weekType: WeekType
}

export interface SameAuditoriumMistake {
  timetable1: SameAuditoriumMistakeTimetableData
  timetable2: SameAuditoriumMistakeTimetableData
}

export type Mistakes = {
  mistakesWithCountOfLessons: CountOfLessonsMistake[]
  missingCampusOrAuditorium: MissingCampusOrAuditoriumMistake[]
  sameAuditorium: SameAuditoriumMistake[]
}
