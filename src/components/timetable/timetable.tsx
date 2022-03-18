import React, { VFC } from 'react'
import { Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { TimetableCard } from 'components/timetable-card'
import { Lesson, weekDaysRU } from 'types/timetable.types'

export interface TimetableProps {
  lessons: Pick<Lesson, 'id' | 'subjectName' | 'lessonNumber'>[]
}

export const Timetable: VFC<TimetableProps> = ({ lessons }) => {
  return (
    <Stack direction="column" h="100%" overflow="auto">
      <SimpleGrid
        columns={[1, null, null, 2, 3]}
        justifyContent="space-around"
        px={10}
        py={5}
        spacingX="80px"
        spacingY={5}
      >
        {weekDaysRU.map((weekDay, i) => (
          <TimetableCard key={i} lessons={lessons.slice(0, i)} weekDay={weekDay} />
        ))}
      </SimpleGrid>
    </Stack>
  )
}
