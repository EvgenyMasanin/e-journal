import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import { persistedReducer, serializableCheck } from './persist'
import { timetableApi } from 'services/timetableService'
import { teachersApi } from 'services/teachersService'
import { authApi } from 'services/authService'
import { mistakesApi } from 'services/mistakeService'
import { subjectsApi } from 'services/subjectsService'
import { usersApi } from 'services/usersService'

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
  ],
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
