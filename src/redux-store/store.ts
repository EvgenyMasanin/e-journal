import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import { persistedReducer, serializableCheck } from './persist'
import { timetableApi } from 'services/timetableService'
import { teachersApi } from 'services/teachersService'

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck,
    }),
    teachersApi.middleware,
    timetableApi.middleware,
  ],
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
