import React, { VFC } from 'react'
import { Heading, LinkBox, LinkOverlay, Stack } from '@chakra-ui/react'
import { Card } from 'components/card'
import { LessonsList } from './lessons-list'
import s from './timetable-card.module.css'
import { Lesson, WeekDaysType } from 'types/timetable.types'

export interface TimetableCardProps {
  lessons: Lesson[]
  weekDay: WeekDaysType
}

export const TimetableCard: VFC<TimetableCardProps> = ({ lessons, weekDay }) => {
  lessons.sort((a, b) => a.number - b.number)
  return (
    <LinkBox className={s.linkBox}>
      <Card
        w="100%"
        h="100%"
        flexGrow={1}
        cursor="pointer"
        position="relative"
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
