import {
  forwardRef,
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Card } from 'components/card'
import { LessonsList } from './lessons-list'
import { useWeekDay } from 'hooks/useWeekDay'
import { Link } from 'react-router-dom'
import { usePrimaryColor } from 'hooks/usePrimaryColor'
import useTimetableContext from 'components/timetable/hooks/useTimetableContest'
import { weekTimetableFilter } from 'utils/week-timetable-filter'
import { isAdmin, WeekDaysMap, WeekDaysRU, WeekTimetable } from 'types'
import s from './timetable-card.module.css'
import { useTypedSelector } from 'redux-store/hooks'
import { selectTeacherId, selectUserRoles } from 'redux-store/reducers/user.slice'
import { AdminPaths, TeacherPaths } from 'routes'

export interface TimetableCardProps {
  weekTimetables: WeekTimetable[]
  weekDay: WeekDaysRU
}

export const TimetableCard = forwardRef<TimetableCardProps, 'div'>(
  ({ weekTimetables, weekDay }, ref) => {
    const teacherId = useTypedSelector(selectTeacherId)

    const { weekType, semester } = useTimetableContext()

    const filteredWeekTimetables = weekTimetables.filter(weekTimetableFilter(weekType, semester))

    const sortedWeekTimetables = [...filteredWeekTimetables].sort(
      (a, b) => a.lessonNumber - b.lessonNumber
    )

    const today = useWeekDay()

    const borderColor = usePrimaryColor()

    const isLg = useBreakpointValue({ base: 1, lg: 1.1 })

    const isToday = today === weekDay

    const userRoles = useTypedSelector(selectUserRoles)

    return (
      <LinkBox ref={isToday ? ref : null} className={s.linkBox}>
        <Card
          w="full"
          h="full"
          cursor="pointer"
          position="relative"
          transform={`scale(${isToday ? 0.95 : 0.9})`}
          borderColor={borderColor}
          borderStyle="solid"
          borderWidth={isToday ? 5 : 0}
          transition="transform .3s"
          _hover={{ transform: `scale(${isLg})` }}
        >
          <Stack textAlign="center" h="full">
            <LinkOverlay
              as={Link}
              to={`/${isAdmin(userRoles) ? AdminPaths.admin : TeacherPaths.teacher}/${
                TeacherPaths.timetableInfo
              }/${teacherId}?week_day=${
                WeekDaysMap[weekDay]
              }&week_type=${weekType}&semester=${semester}`}
            >
              <Heading as="h3" size="lg">
                {weekDay}
              </Heading>
            </LinkOverlay>
            <LessonsList weekTimetables={sortedWeekTimetables} />
          </Stack>
        </Card>
      </LinkBox>
    )
  }
)

TimetableCard.displayName = 'TimetableCard'
