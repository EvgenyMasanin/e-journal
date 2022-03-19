import React, { VFC } from 'react'
import { Box } from '@chakra-ui/react'
import { Timetable } from 'components/timetable'
import { lessons, lessons1 } from 'data'

export interface MainProps {}

export const Main: VFC<MainProps> = ({}) => {
  return <Timetable lessons={lessons1} />
}
