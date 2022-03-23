import { VFC } from 'react'
import { Timetable } from 'components/timetable'
import { useGetTeachersTimetablesQuery } from 'services/timetableService'

export interface MainProps {}

export const Main: VFC<MainProps> = ({}) => {
  const { data: timetables, isLoading } = useGetTeachersTimetablesQuery(10)

  return <>{!isLoading && <Timetable week={timetables} />}</>
}
