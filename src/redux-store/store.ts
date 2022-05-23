import { rolesApi } from '../api/role.api'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import { persistedReducer, serializableCheck } from './persist'
import { timetableApi } from 'api/timetable.api'
import { teachersApi } from 'api/teachers.api'
import { authApi } from 'api/auth.api'
import { mistakesApi } from 'api/mistake.api'
import { subjectsApi } from 'api/subjects.api'
import { usersApi } from 'api/users.api'
import { groupsApi } from 'api/group.api'
import { teacherToSubjectApi } from 'api/teacher-to-subject.api'
import { filesApi } from 'api/files.api'

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck,
    }),
    authApi.middleware,
    teachersApi.middleware,
    timetableApi.middleware,
    mistakesApi.middleware,
    subjectsApi.middleware,
    usersApi.middleware,
    rolesApi.middleware,
    groupsApi.middleware,
    teacherToSubjectApi.middleware,
    filesApi.middleware
  ],
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
