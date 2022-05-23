import { usersApi } from 'api/users.api'
import { subjectsApi } from 'api/subjects.api'
import { mistakesApi } from 'api/mistake.api'
import { combineReducers } from '@reduxjs/toolkit'
import { authApi } from 'api/auth.api'
import { teachersApi } from 'api/teachers.api'
import { timetableApi } from 'api/timetable.api'
import timetableReducer from './timetable.slice'
import userSlice from './user.slice'
import { rolesApi } from 'api/role.api'
import { groupsApi } from 'api/group.api'
import { teacherToSubjectApi } from 'api/teacher-to-subject.api'
import { filesApi } from 'api/files.api'

export const rootReducer = combineReducers({
  [teachersApi.reducerPath]: teachersApi.reducer,
  [timetableApi.reducerPath]: timetableApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [mistakesApi.reducerPath]: mistakesApi.reducer,
  [subjectsApi.reducerPath]: subjectsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [rolesApi.reducerPath]: rolesApi.reducer,
  [groupsApi.reducerPath]: groupsApi.reducer,
  [teacherToSubjectApi.reducerPath]: teacherToSubjectApi.reducer,
  [filesApi.reducerPath]: filesApi.reducer,
  [userSlice.name]: userSlice.reducer,
  timetableReducer,
})

export type RootReducerState = ReturnType<typeof rootReducer>
