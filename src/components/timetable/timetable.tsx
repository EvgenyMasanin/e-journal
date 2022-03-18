import React, { VFC } from 'react'
import { Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { TimetableCard } from 'components/timetable-card'
import { Lesson, weekDaysType } from 'types/timetable.types'

export interface TimetableProps {
  lessons: Lesson[]
  date: string
}

export const Timetable: VFC<TimetableProps> = ({ lessons, date }) => {
  return (
    <Stack direction="column">
      <Heading mb={5} size="lg">
        Расписание на: {date}
      </Heading>
      <SimpleGrid
        columns={[1, null, null, 2, 3]}
        justifyContent="space-around"
        px={10}
        pb={5}
        spacingX="80px"
        spacingY={5}
      >
        {weekDaysType.map((weekDay, i) => (
          <TimetableCard key={i} lessons={lessons.slice(0, i)} weekDay={weekDay} />
        ))}
      </SimpleGrid>
    </Stack>
  )
}
