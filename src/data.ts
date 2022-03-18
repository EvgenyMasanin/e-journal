import { Lesson } from 'types/timetable.types'

export const lessons = Array(7)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    subjectName: `lesson${
      i + 1
    }qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty qwerty`,
    lessonNumber: i + 1,
  }))

export const now = new Date().toLocaleString('ru', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

export const lessons1: Lesson[] = [
  {
    id: 1,
    subjectName: 'Современные системы программирования',
    auditorium: 409,
    campus: 2,
    weekType: 'up/down',
    subjectType: 'lecture',
    course: 4,
    groupId: 1,
    subGroupsCount: 2,
    groupName: 'АСОИ-181',
    lessonNumber: 1,
    semester: 'second',
    subGroupNum: 2,
    weekDay: 'monday',
  },
  {
    id: 2,
    subjectName: 'Современные системы программирования',
    auditorium: 519,
    campus: 2,
    weekType: 'up',
    subjectType: 'laboratory',
    course: 4,
    groupId: 1,
    subGroupsCount: 2,
    groupName: 'АСОИ-181',
    lessonNumber: 2,
    semester: 'second',
    subGroupNum: 2,
    weekDay: 'monday',
  },
  {
    id: 3,
    subjectName: 'Технологии интернет программирования',
    auditorium: 517,
    campus: 2,
    weekType: 'down',
    subjectType: 'laboratory',
    course: 4,
    groupId: 2,
    subGroupsCount: 2,
    groupName: 'АСОИ-182',
    lessonNumber: 3,
    semester: 'second',
    subGroupNum: 2,
    weekDay: 'monday',
  },
]
