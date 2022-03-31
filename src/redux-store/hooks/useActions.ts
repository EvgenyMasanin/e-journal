import {
  logOut,
  setAccessToken,
  setCredentials,
  setIsTokenExpired,
  setRefreshToken,
} from 'redux-store/reducers/user.slice'
import { bindActionCreators } from '@reduxjs/toolkit'
import { selectWeekDay, selectSemester } from 'redux-store/reducers/timetable.slice'
import { useTypedDispatch } from '.'

const AllActions = {
  selectWeekDay,
  selectSemester,
  logOut,
  setAccessToken,
  setCredentials,
  setIsTokenExpired,
  setRefreshToken,
}

export const useActions = () => {
  const dispatch = useTypedDispatch()

  return bindActionCreators(AllActions, dispatch)
}
