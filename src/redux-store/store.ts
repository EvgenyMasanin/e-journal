import { configureStore } from '@reduxjs/toolkit'
import { teachersApi } from 'services/teachersService'
import { timetableApi } from 'services/timetableService'

export const store = configureStore({
  reducer: {
    [teachersApi.reducerPath]: teachersApi.reducer,
    [timetableApi.reducerPath]: timetableApi.reducer,
  },

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    teachersApi.middleware,
    timetableApi.middleware,
  ],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
