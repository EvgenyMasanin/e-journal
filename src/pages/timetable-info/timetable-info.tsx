import { useRef, VFC } from 'react'
import { Box, Heading, Link, Text } from '@chakra-ui/react'
import { Table } from 'components/table'
import usePrimaryColor from 'hooks/usePrimaryColor'
import { weekTimetableFilter } from 'utils/week-timetable-filter'
import getEnumKeyByEnumValue, {
  SubjectTypesMap,
  SemesterMap,
  WeekDaysEN,
  WeekDaysMap,
  WeekTimetable,
  WeekType,
  WeekTypeMap,
  Week,
} from 'types'
import { useDate } from 'hooks/useDate'

const mapLessons = (lessons: WeekTimetable[]) =>
  lessons.map(
    ({
      id,
      lessonNumber,
      subject: { name: subjectName },
      groups,
      subjectType,
      auditorium,
      campus,
      course,
    }) => ({
      id,
      lessonNumber,
      subjectName,
      subjectType: SubjectTypesMap[subjectType],
      auditorium,
      campus,
      groupNames: groups.map((g) => g.name).join(),
      subGroupNum: groups[0].subGroupNum,
      course,
    })
  )

export interface TimetableInfoProps {
  week: Week
  weekDay: WeekDaysEN
  weekType: WeekType
  isLoading: boolean
}

export const TimetableInfo: VFC<TimetableInfoProps> = ({ isLoading, week, weekDay, weekType }) => {
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

  const date = useDate()

  const lessons = week?.[weekDay]

  const semester = lessons?.[0].semester
  return (
    <Box>
      <Heading mb={3} size="lg">
        Расписание на{' '}
        <Text as="i" color={color}>
          {getEnumKeyByEnumValue(WeekDaysMap, weekDay.toLowerCase()).toLowerCase()}:{' '}
        </Text>
        {date}
      </Heading>
      <Heading mb={3} size="md">
        Семестр:{' '}
        {!isLoading && (
          <Text as="i" color={color}>
            {SemesterMap[semester]}
          </Text>
        )}
      </Heading>
      <Heading mb={5} size="md">
        Тип недели:{' '}
        <Text as="i" color={color}>
          {WeekTypeMap[weekType]}
        </Text>
      </Heading>

      <Table
        isLoading={isLoading}
        renderCell={(colName, value) => {
          if (colName === 'Предмет')
            return (
              <Link href="/" fontSize="xl" fontWeight="bold" color={color}>
                {value}
              </Link>
            )
        }}
        columnNames={columnNames.current}
        data={!isLoading && mapLessons(lessons.filter(weekTimetableFilter(weekType)))}
      />
    </Box>
  )
}
