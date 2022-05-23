import { useEffect, useRef, useState, VFC } from 'react'
import { Box, Center, Flex, Heading, Link, SimpleGrid, Tag, Text, Wrap } from '@chakra-ui/react'
import { Table } from 'components/table'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDate } from 'hooks/useDate'
import { usePrimaryColor } from 'hooks/usePrimaryColor'
import { useGetTimetablesByTeacherIdQuery } from 'api/timetable.api'
import { weekTimetableFilter } from 'utils/week-timetable-filter'
import getEnumKeyByEnumValue, {
  SubjectTypesMap,
  SemesterMap,
  WeekDaysEN,
  WeekDaysMap,
  WeekTimetable,
  WeekType,
  WeekTypeMap,
  Semester,
} from 'types'

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
      subGroupNum: groups[0].subGroupNum === 'all' ? 'все' : groups[0].subGroupNum,
      course,
    })
  )

export interface TimetableInfoProps {}

export interface TimetableInfoParams extends Record<string, string> {
  teacher_id: string
}

export const TimetableInfoPage: VFC<TimetableInfoProps> = ({}) => {
  const [weekDay, setWeekDay] = useState<WeekDaysEN>()
  const [weekType, setWeekType] = useState<WeekType>()
  const [semester, setSemester] = useState<Semester>()

  const params = useParams<TimetableInfoParams>()

  const [searchParams] = useSearchParams()

  useEffect(() => {
    setWeekDay(searchParams.get('week_day') as WeekDaysEN)
    setWeekType(searchParams.get('week_type') as WeekType)
    setSemester(searchParams.get('semester') as Semester)
  }, [searchParams])

  const { data: week, isLoading, isError } = useGetTimetablesByTeacherIdQuery(+params.teacher_id)

  const color = usePrimaryColor()

  const date = useDate()

  const [lessons, setLessons] = useState<WeekTimetable[]>([])

  useEffect(() => {
    if (isLoading || isError || !weekDay) return
    const lessons = week[weekDay]

    if (!lessons) return

    setLessons(lessons)
  }, [weekDay, isLoading, week, isError, lessons])

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
    <Box>
      <Heading mb={3} size="lg">
        Расписание на{' '}
        <Text as="i" color={color}>
          {getEnumKeyByEnumValue(WeekDaysMap, weekDay?.toLowerCase()).toLowerCase()}:{' '}
        </Text>
        {date}
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
          {WeekTypeMap[weekType]}
        </Text>
      </Heading>

      <Table
        isLoading={isLoading}
        renderCell={(colName, value) => {
          if (colName === 'Предмет') {
            return (
              <Link href="/" fontSize="xl" fontWeight="bold" color={color}>
                {value}
              </Link>
            )
          }
          if (colName === 'Группа' && typeof value === 'string') {
            return (
              <Wrap justifyContent="space-around">
                {value.split(',').map((groupName) => (
                  <Center key={groupName}>
                    <Tag colorScheme="teal">{groupName}</Tag>
                  </Center>
                ))}
              </Wrap>
            )
          }
        }}
        columnNames={columnNames.current}
        data={!isLoading && mapLessons(lessons.filter(weekTimetableFilter(weekType, semester)))}
      />
    </Box>
  )
}
