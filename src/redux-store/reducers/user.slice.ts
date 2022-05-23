import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'redux-store/store'
import { authApi } from 'api/auth.api'
import { AppUser, Tokens } from 'types/user.types'

export interface UserState {
  user: AppUser | null
  isAuthorized: boolean
  tokens: Tokens & {
    isTokenExpired: boolean
  }
}

const initialState: UserState = {
  user: null,
  isAuthorized: false,
  tokens: {
    accessToken: null,
    refreshToken: null,
    isTokenExpired: false,
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user, tokens } }: PayloadAction<UserState>) => {
      state.user = user
      state.tokens = tokens
      state.isAuthorized = true
    },
    setAccessToken: (state, { payload }: PayloadAction<string>) => {
      state.tokens.accessToken = payload
      state.tokens.isTokenExpired = false
    },
    setRefreshToken: (state, { payload }: PayloadAction<string>) => {
      state.tokens.refreshToken = payload
    },
    setIsTokenExpired: (state, { payload }: PayloadAction<boolean>) => {
      state.tokens.isTokenExpired = payload
    },
    logOut: (state) => {
      state.user = null
      state.isAuthorized = false
      state.tokens = {
        accessToken: null,
        refreshToken: null,
        isTokenExpired: false,
      }
    },
  },
  extraReducers: (build) => {
    build
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.isAuthorized = true
        state.user = payload.user
        state.tokens.accessToken = payload.accessToken
        state.tokens.refreshToken = payload.refreshToken
      })
      .addMatcher(authApi.endpoints.signupAdmin.matchFulfilled, (state, { payload }) => {
        state.isAuthorized = true
        state.user = payload.user
        state.tokens.accessToken = payload.accessToken
        state.tokens.refreshToken = payload.refreshToken
      })
      .addMatcher(authApi.endpoints.auth.matchFulfilled, (state, { payload }) => {
        state.isAuthorized = true
        state.user = payload.user
        state.tokens.accessToken = payload.accessToken
        state.tokens.refreshToken = payload.refreshToken
      })
  },
})

export const { setCredentials, logOut, setAccessToken, setRefreshToken, setIsTokenExpired } =
  userSlice.actions

export default userSlice

export const selectUser = (state: RootState) => state.user.user
export const selectUserId = (state: RootState) => selectUser(state)?.id
export const selectUserRoles = (state: RootState) => selectUser(state)?.roles
export const selectTeacherId = (state: RootState) => selectUser(state)?.teacher?.id
