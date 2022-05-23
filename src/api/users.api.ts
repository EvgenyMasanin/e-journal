import { createApi } from '@reduxjs/toolkit/query/react'
import { UserFormFields } from 'pages/admins-pages/users-page'
import { User } from 'types/user.types'
import { baseQueryWithReauth } from './api-config'

export enum UsersApiTags {
  user = 'User',
}

const URL = 'users'

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: baseQueryWithReauth,
  tagTypes: [UsersApiTags.user],
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => URL,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: UsersApiTags.user, id } as const)),
              { type: UsersApiTags.user, id: 'LIST' },
            ]
          : [{ type: UsersApiTags.user, id: 'LIST' }],
    }),

    getUser: build.query<User, number>({
      query: (id) => `${URL}/${id}`,
      providesTags: (result, error, id) => [{ type: UsersApiTags.user, id }],
    }),

    createUser: build.mutation<User, Omit<UserFormFields, 'id'>>({
      query: (body) => ({
        url: URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: UsersApiTags.user, id: 'LIST' }],
    }),

    updateUser: build.mutation<User, UserFormFields>({
      query: (user) => ({
        url: `${URL}/${user.id}`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: [{ type: UsersApiTags.user, id: 'LIST' }],
    }),

    deleteUser: build.mutation<boolean, number>({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: UsersApiTags.user, id: 'LIST' }],
    }),
  }),
})

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi
