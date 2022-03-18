import React, { VFC } from 'react'
import { Box } from '@chakra-ui/react'
import { Timetable } from 'components/timetable'
import { lessons, now } from 'data'

export interface MainProps {}

export const Main: VFC<MainProps> = ({}) => {
  return (
    <Box px={5} h="100%" overflow="auto">
      <Timetable lessons={lessons} date={now} />
    </Box>
  )
}
