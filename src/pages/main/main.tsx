import { VFC } from 'react'
import { Timetable } from 'components/timetable'
import { useGetTeachersTimetablesQuery } from 'services/timetableService'
import { Box } from '@chakra-ui/react'
import { isApiError } from 'utils/isApiError'
import { useTypedSelector } from 'redux-store/hooks'
import { selectUserId } from 'redux-store/reducers/user.slice'

export interface MainProps {}

export const Main: VFC<MainProps> = ({}) => {
  const userId = useTypedSelector(selectUserId)
  console.log('🚀 ~ userId', userId)

  const {
    data: timetables,
    isLoading,
    isError: isErrorResp,
    error,
  } = useGetTeachersTimetablesQuery(userId)

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
