import React, { createContext, VFC } from 'react'
import { Box } from '@chakra-ui/react'
import { Timetable } from 'components/timetable'
import { lessons, lessons1 } from 'data'
import { Lesson } from 'types/timetable.types'
import { useGetTeachersTimetablesQuery } from 'services/timetableService'

export interface MainProps {}

export const Main: VFC<MainProps> = ({}) => {
  const { data: timetables, isLoading } = useGetTeachersTimetablesQuery(10)

  return <>{!isLoading && <Timetable week={timetables} />}</>
}
