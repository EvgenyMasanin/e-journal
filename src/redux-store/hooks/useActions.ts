import { bindActionCreators } from '@reduxjs/toolkit'
import { selectWeekDay, selectSemester } from 'redux-store/reducers/timetable.slice'
import { useTypedDispatch } from '.'

const AllActions = { selectWeekDay, selectSemester }

export const useActions = () => {
  const dispatch = useTypedDispatch()

  return bindActionCreators(AllActions, dispatch)
}
