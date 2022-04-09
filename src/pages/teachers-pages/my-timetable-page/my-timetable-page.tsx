import { VFC } from 'react'
import { Timetable } from 'components/timetable'
import { useGetTimetablesByTeacherIdQuery } from 'services/timetableService'
import { Box } from '@chakra-ui/react'
import { isApiError } from 'utils/isApiError'
import { useTypedSelector } from 'redux-store/hooks'
import { selectTeacherId } from 'redux-store/reducers/user.slice'

export interface MyTimetableProps {}

export const MyTimetablePage: VFC<MyTimetableProps> = ({}) => {
  const teacherId = useTypedSelector(selectTeacherId)

  const {
    data: timetables,
    isLoading,
    isError: isErrorResp,
    error,
  } = useGetTimetablesByTeacherIdQuery(teacherId)
  console.log('🚀 ~ timetables', timetables)

  const isError = isErrorResp && isApiError(error)

  return (
    <>
      {isError ? (
        <Box>Error: {error?.data?.message}</Box>
      ) : (
        <Timetable week={timetables} isLoading={isLoading} />
      )}
    </>
  )
}
