import { PersistConfig, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import createFilter from 'redux-persist-transform-filter'
import persistReducer from 'redux-persist/es/persistReducer'
import userSlice from 'redux-store/reducers/user.slice'
import { rootReducer, RootReducerState } from 'redux-store/reducers/root-reducer'
import { authApi } from 'services/authService'
import { teachersApi } from 'services/teachersService'
import { timetableApi } from 'services/timetableService'
import storage from 'redux-persist/lib/storage'

export const serializableCheck = {
  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
}

const saveSubsetFilter = createFilter(userSlice.name, ['tokens', 'isAuthorized'])

const persistConfig: PersistConfig<RootReducerState> = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [userSlice.name],
  blacklist: [authApi.reducerPath, teachersApi.reducerPath, timetableApi.reducerPath],
  transforms: [saveSubsetFilter],
}

export const persistedReducer = persistReducer<RootReducerState>(persistConfig, rootReducer)
