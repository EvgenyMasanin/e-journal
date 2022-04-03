import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { LoginFormFields } from 'components/form/forms/login-form'
import { UserWithTokens } from 'types/user.types'
import { baseQueryWithReauth } from './api-config'

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    login: build.mutation<UserWithTokens, LoginFormFields>({
      query: (credentials) => ({
        url: 'auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    auth: build.query<UserWithTokens, undefined>({
      query: () => `auth/me`,
    }),
  }),
})

export const { useLoginMutation, useAuthQuery } = authApi
