import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { LoginFormFields } from 'components/form/forms/login-form'
import { UserWithTokens } from 'types/user.types'
import { baseQueryWithReauth } from './api-config'

export enum AuthApiTags {
  auth = 'Auth',
}

const URL = 'auth'

export const authApi = createApi({
  reducerPath: 'auth',
  tagTypes: [AuthApiTags.auth],
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    login: build.mutation<UserWithTokens, LoginFormFields>({
      query: (credentials) => ({
        url: `${URL}/signin`,
        method: 'POST',
        body: credentials,
      }),
    }),
    auth: build.query<UserWithTokens, void>({
      query: () => `${URL}/me`,
    }),
    isAdminExist: build.query<{ isAdminExist: boolean }, void>({
      query: () => `${URL}/is-admin-exist`,
      providesTags: () => [{ type: AuthApiTags.auth, id: 1 }], // FIXME:
    }),
    signupAdmin: build.mutation<UserWithTokens, LoginFormFields>({
      query: (credentials) => ({
        url: `${URL}/signup-admin`,
        method: 'POST',
        body: credentials,
        invalidatesTags: () => [{ type: AuthApiTags.auth, id: 1 }], // FIXME: doesn't trigger refetch isAdminExist
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useAuthQuery,
  useLazyAuthQuery,
  useIsAdminExistQuery,
  useSignupAdminMutation,
  useLazyIsAdminExistQuery,
} = authApi
