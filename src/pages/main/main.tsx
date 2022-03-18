import React, { VFC } from 'react'
import { Box } from '@chakra-ui/react'
import { Timetable } from 'components/timetable'
import { lessons } from 'data'

export interface MainProps {}

export const Main: VFC<MainProps> = ({}) => {
  return <Timetable lessons={lessons} />
}
