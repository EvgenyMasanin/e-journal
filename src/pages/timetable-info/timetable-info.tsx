import { Box, Heading, Link, List, ListItem, Text } from '@chakra-ui/react'
import { Table } from 'components/table'
import { now } from 'data'
import usePrimaryColor from 'hooks/usePrimaryColor'
import { useWeekDay } from 'hooks/useWeekDay'
import React, { useRef, useState, VFC } from 'react'
import getEnumKeyByEnumValue from 'types'
import { SubjectTypesMap } from 'types/subject.types'
import { Lesson, SemesterMap, WeekDaysMap, WeekTypeMap } from 'types/timetable.types'

const mapLessons = (lessons: Lesson[]) =>
  lessons.map(
    ({
      id,
      lessonNumber,
      subjectName,
      subjectType,
      auditorium,
      campus,
      groupName,
      subGroupNum,
      course,
    }) => ({
      id,
      lessonNumber,
      subjectName,
      subjectType: SubjectTypesMap[subjectType],
      auditorium,
      campus,
      groupName,
      subGroupNum,
      course,
    })
  )

export interface TimetableInfoProps {
  lessons: Lesson[]
}

export const TimetableInfo: VFC<TimetableInfoProps> = ({ lessons }) => {
  const columnNames = useRef([
    'Номер пары',
    'Предмет',
    'Тип',
    'Аудитория',
    'Корпус',
    'Группа',
    'Кол-во подгрупп',
    'курс',
  ])

  const color = usePrimaryColor()

  const { semester, weekDay, weekType } = lessons[0]
  return (
    <Box>
      <Heading mb={3} size="lg">
        Расписание на{' '}
        <Text as="i" color={color}>
          {getEnumKeyByEnumValue(WeekDaysMap, weekDay.toLowerCase()).toLowerCase()}:{' '}
        </Text>
        {now}
      </Heading>
      <Heading mb={3} size="md">
        Семестр:{' '}
        <Text as="i" color={color}>
          {SemesterMap[semester]}
        </Text>
      </Heading>
      <Heading mb={5} size="md">
        Тип недели:{' '}
        <Text as="i" color={color}>
          {WeekTypeMap.down}
        </Text>
      </Heading>

      <Table
        renderCell={(colName, value) => {
          if (colName === 'Предмет')
            return (
              <Link href="/" fontSize="xl" fontWeight="bold" color={color}>
                {value}
              </Link>
            )
        }}
        columnNames={columnNames.current}
        data={mapLessons(lessons)}
      />
    </Box>
  )
}
