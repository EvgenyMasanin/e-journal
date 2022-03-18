import React, { VFC } from 'react'
import {
  Heading,
  LinkBox,
  LinkOverlay,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { Card } from 'components/card'
import { LessonsList } from './lessons-list'
import s from './timetable-card.module.css'
import { Lesson, WeekDaysRU } from 'types/timetable.types'
import { useWeekDay } from 'hooks/useWeekDay'
import usePrimaryColor from 'hooks/usePrimaryColor'

export interface TimetableCardProps {
  lessons: Pick<Lesson, 'id' | 'subjectName' | 'lessonNumber'>[]
  weekDay: WeekDaysRU
}

export const TimetableCard: VFC<TimetableCardProps> = ({ lessons, weekDay }) => {
  lessons.sort((a, b) => a.lessonNumber - b.lessonNumber)
  const today = useWeekDay()

  const borderColor = usePrimaryColor()

  return (
    <LinkBox className={s.linkBox}>
      <Card
        w="100%"
        h="100%"
        flexGrow={1}
        cursor="pointer"
        position="relative"
        transform={`scale(${today === weekDay ? 1 : 0.9})`}
        borderColor={borderColor}
        borderStyle="solid"
        borderWidth={today === weekDay ? 5 : 0}
        transition=".3s"
        _hover={{ transform: 'scale(1.1)' }}
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
}
