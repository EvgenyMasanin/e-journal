import { BaseQueryFn, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
// eslint-disable-next-line import/no-unresolved
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {
  logOut,
  setAccessToken,
  setIsTokenExpired,
  setRefreshToken,
} from 'redux-store/reducers/user.slice'
import { RootState } from 'redux-store/store'
import { Tokens } from 'types/user.types'

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:7000/',
  prepareHeaders: (headers, { getState }) => {
    const { accessToken, isTokenExpired, refreshToken } = (getState() as RootState).user.tokens

    const token = isTokenExpired ? refreshToken : accessToken

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
}) as BaseQueryFn<string | FetchArgs, unknown, ResponseError>

export interface ResponseError {
  data: { statusCode: number; message: string }
  status: number
}

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, ResponseError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)
  const accessToken = (api.getState() as RootState).user.tokens.accessToken
  if (accessToken && result.error && result.error.status === 401) {
    api.dispatch(setIsTokenExpired(true))

    const refreshResult = (await baseQuery(
      '/auth/refresh',
      api,
      extraOptions
    )) as QueryReturnValue<Tokens>

    if (refreshResult.data) {
      api.dispatch(setAccessToken(refreshResult.data.accessToken))
      api.dispatch(setRefreshToken(refreshResult.data.refreshToken))

      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }
  return result
}
