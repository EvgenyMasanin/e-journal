import React, { createContext, VFC } from 'react'
import { Box } from '@chakra-ui/react'
import { Timetable } from 'components/timetable'
import { lessons, lessons1 } from 'data'
import { Lesson } from 'types/timetable.types'

export interface MainProps {}

export const Main: VFC<MainProps> = ({}) => {
  return <Timetable lessons={lessons1} />
}
