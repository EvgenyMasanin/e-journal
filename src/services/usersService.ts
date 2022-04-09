import { createApi } from '@reduxjs/toolkit/query/react'
import { UserFormFields } from 'pages/admins-pages/users-page'
import { User } from 'types/user.types'
import { baseQueryWithReauth } from './api-config'

export enum UsersApiTags {
  user = 'User',
}

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: baseQueryWithReauth,
  tagTypes: [UsersApiTags.user],
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => 'users',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: UsersApiTags.user, id } as const)),
              { type: UsersApiTags.user, id: 'LIST' },
            ]
          : [{ type: UsersApiTags.user, id: 'LIST' }],
    }),
    getUser: build.query<User, number>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: UsersApiTags.user, id }],
    }),
    updateUser: build.mutation<User, UserFormFields>({
      query: (user) => ({
        url: `users/${user.id}`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: [{ type: UsersApiTags.user, id: 'LIST' }],
    }),
    deleteUser: build.mutation<boolean, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: UsersApiTags.user, id: 'LIST' }],
    }),
  }),
})

export const { useGetUserQuery, useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } =
  usersApi
