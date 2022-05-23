/* eslint-disable react/display-name */
import { UseFormReturn } from 'react-hook-form'
import {
  GroupInputCell,
  CampusInputCell,
  CourseInputCell,
  WeekDayInputCell,
  WeekTypeInputCell,
  SemesterInputCell,
  AuditoriumInputCell,
  SubGroupNumInputCell,
  SubjectTypeInputCell,
  HoursPerWeekInputCell,
  LessonNumberInputCell,
  HoursPerSemesterInputCell,
  TeacherToSubjectIdInputCell,
} from './input-cells'

import getEnumKeyByEnumValue, {
  Group,
  SemesterMap,
  SubjectTypesMap,
  TeacherToSubject,
  Timetable,
  WeekDaysMap,
  WeekTypeMap,
} from 'types'
import { Flex, Tag, Tooltip } from '@chakra-ui/react'
import { getAbbreviation } from 'utils/getAbbreviation'

export interface GetRenderInputCellProps {
  groups: Group[]
  teacherToSubjects: TeacherToSubject[]
  form: UseFormReturn<Timetable>
}

export const getRenderInputCell =
  ({ form, groups, teacherToSubjects }: GetRenderInputCellProps) =>
  (columnName: string, value: string, row: Timetable) => {
    const { control, setValue } = form
    switch (columnName) {
      case 'корпус':
        return <CampusInputCell value={row.campus} />

      case 'курс':
        return <CourseInputCell value={row.course} />

      case 'аудитория':
        return <AuditoriumInputCell value={row.auditorium} />

      case 'номер подгруппы':
        return <SubGroupNumInputCell value={row.subGroupNum} />

      case 'номер пары':
        return <LessonNumberInputCell value={row.lessonNumber} />

      case 'часы в неделю':
        return <HoursPerWeekInputCell value={row.hoursPerWeek} />

      case 'часы в семестр':
        return <HoursPerSemesterInputCell value={row.hoursPerSemester} />

      case 'день недели':
        return <WeekDayInputCell control={control} setValue={setValue} value={row.weekDay} />

      case 'семестр':
        return <SemesterInputCell control={control} setValue={setValue} value={row.semester} />

      case 'тип недели':
        return <WeekTypeInputCell control={control} setValue={setValue} value={row.weekType} />

      case 'тип занятия':
        return (
          <SubjectTypeInputCell control={control} setValue={setValue} value={row.subjectType} />
        )

      case 'группа':
        return (
          <GroupInputCell
            control={control}
            setValue={setValue}
            groups={groups}
            value={row.groupId}
          />
        )

      case 'преподаватель & предмет':
        return (
          <TeacherToSubjectIdInputCell
            control={control}
            setValue={setValue}
            teacherToSubjects={teacherToSubjects}
            value={row.teacherToSubjectId}
          />
        )

      default:
        return null
    }
  }

export interface GetRenderCellProps {
  teacherToSubjects: TeacherToSubject[]
  groups: Group[]
}

export const getRenderCell =
  ({ teacherToSubjects, groups }: GetRenderCellProps) =>
  (columnName: string, value: string, row: Timetable) => {
    switch (columnName) {
      case 'преподаватель & предмет': {
        const teacherToSubject = teacherToSubjects.find(({ id }) => id === row.teacherToSubjectId)
        const { name: teacherName, fullName: teacherFullName } = teacherToSubject?.teacher
        const subjectName = teacherToSubject?.subject?.name

        return (
          <Flex gap={1} pr={5}>
            <Tooltip hasArrow label={teacherFullName}>
              <Tag colorScheme="teal" variant="subtle" minW="fit-content">
                {teacherName}
              </Tag>
            </Tooltip>
            <Tooltip hasArrow label={subjectName}>
              <Tag colorScheme="teal" variant="subtle" cursor="help" minW="fit-content">
                {getAbbreviation(subjectName)}
              </Tag>
            </Tooltip>
          </Flex>
        )
      }
      case 'группа': {
        const group = groups.find(({ id }) => id === row.groupId)
        return group?.name
      }
      case 'день недели':
        return getEnumKeyByEnumValue(WeekDaysMap, row.weekDay).toLowerCase()

      case 'тип занятия':
        return SubjectTypesMap[row.subjectType]

      case 'семестр':
        return SemesterMap[row.semester]

      case 'тип недели':
        return WeekTypeMap[row.weekType]

      default:
        return null
    }
  }
