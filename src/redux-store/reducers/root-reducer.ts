import { subjectsApi } from 'services/subjectsService'
import { mistakesApi } from './../../services/mistakeService'
import { combineReducers } from '@reduxjs/toolkit'
import { authApi } from 'services/authService'
import { teachersApi } from 'services/teachersService'
import { timetableApi } from 'services/timetableService'
import timetableReducer from './timetable.slice'
import userSlice from './user.slice'

export const rootReducer = combineReducers({
  [teachersApi.reducerPath]: teachersApi.reducer,
  [timetableApi.reducerPath]: timetableApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [mistakesApi.reducerPath]: mistakesApi.reducer,
  [subjectsApi.reducerPath]: subjectsApi.reducer,
  [userSlice.name]: userSlice.reducer,
  timetableReducer,
})

export type RootReducerState = ReturnType<typeof rootReducer>
