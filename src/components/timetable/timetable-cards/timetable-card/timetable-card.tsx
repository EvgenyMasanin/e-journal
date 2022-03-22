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
import usePrimaryColor from 'hooks/usePrimaryColor'
import { Lesson, WeekDaysRU } from 'types/timetable.types'
import s from './timetable-card.module.css'

export interface TimetableCardProps {
  lessons: Pick<Lesson, 'id' | 'subjectName' | 'lessonNumber'>[]
  weekDay: WeekDaysRU
}

export const TimetableCard = forwardRef<TimetableCardProps, 'div'>(({ lessons, weekDay }, ref) => {
  lessons.sort((a, b) => a.lessonNumber - b.lessonNumber)

  const today = useWeekDay()

  const borderColor = usePrimaryColor()

  const isToday = today === weekDay

  const isLg = useBreakpointValue({ base: 1, lg: 1.1 })

  return (
    <LinkBox ref={isToday ? ref : null} className={s.linkBox}>
      <Card
        w="100%"
        h="100%"
        flexGrow={1}
        cursor="pointer"
        position="relative"
        transform={`scale(${isToday ? 0.95 : 0.9})`}
        borderColor={borderColor}
        borderStyle="solid"
        borderWidth={isToday ? 5 : 0}
        transition=".3s"
        _hover={{ transform: `scale(${isLg})` }}
      >
        <Stack textAlign="center" h="100%">
          <LinkOverlay href="http://google.com">
            <Heading as="h3" size="lg">
              {weekDay}
            </Heading>
          </LinkOverlay>
          <LessonsList lessons={lessons} />
        </Stack>
      </Card>
    </LinkBox>
  )
})

TimetableCard.displayName = 'TimetableCard'
