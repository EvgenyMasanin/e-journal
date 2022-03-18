import { Box, Heading, Link, List, ListItem } from '@chakra-ui/react'
import { Table } from 'components/table'
import { now } from 'data'
import { useWeekDay } from 'hooks/useWeekDay'
import React, { useRef, useState, VFC } from 'react'
import getEnumKeyByEnumValue from 'types'
import { Lesson, WeekDaysMap } from 'types/timetable.types'

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
      subjectType,
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
  return (
    <Box overflowX="scroll">
      <Heading mb={5} size="lg">
        Расписание на{' '}
        {getEnumKeyByEnumValue(WeekDaysMap, lessons[0].weekDay.toLowerCase()).toLowerCase()}: {now}
      </Heading>

      <Table
        renderCell={(colName, value) => {
          if (colName === 'Предмет') return <Link href="/">{value}</Link>
        }}
        columnNames={columnNames.current}
        data={mapLessons(lessons)}
      />
    </Box>
  )
}
