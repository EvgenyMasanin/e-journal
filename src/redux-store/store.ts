import { configureStore } from '@reduxjs/toolkit'
import { teachersApi } from 'services/teachersService'

export const store = configureStore({
  reducer: {
    [teachersApi.reducerPath]: teachersApi.reducer,
  },

  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), teachersApi.middleware],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
