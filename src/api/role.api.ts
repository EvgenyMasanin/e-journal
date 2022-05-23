import { createApi } from '@reduxjs/toolkit/query/react'
import { RoleFormFields } from 'components/form/forms/add-role-form'
import { Role } from 'types/user.types'
import { baseQueryWithReauth } from './api-config'

export enum RoleApiTags {
  role = 'Role',
}

const URL = 'roles'

export const rolesApi = createApi({
  reducerPath: 'roles',
  baseQuery: baseQueryWithReauth,
  tagTypes: [RoleApiTags.role],
  endpoints: (build) => ({
    getRoles: build.query<Role[], void>({
      query: () => URL,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: RoleApiTags.role, id } as const)),
              { type: RoleApiTags.role, id: 'LIST' },
            ]
          : [{ type: RoleApiTags.role, id: 'LIST' }],
    }),
    getRole: build.query<Role, number>({
      query: (id) => `${URL}/${id}`,
      providesTags: (result, error, id) => [{ type: RoleApiTags.role, id }],
    }),
    createRole: build.mutation<Role, RoleFormFields>({
      query: (role) => ({
        url: URL,
        method: 'POST',
        body: role,
      }),
      invalidatesTags: [{ type: RoleApiTags.role, id: 'LIST' }],
    }),
    updateRole: build.mutation<Role, Role>({
      query: (role) => ({
        url: `${URL}/${role.id}`,
        method: 'PATCH',
        body: role,
      }),
      invalidatesTags: [{ type: RoleApiTags.role, id: 'LIST' }],
    }),
    deleteRole: build.mutation<boolean, number>({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: RoleApiTags.role, id: 'LIST' }],
    }),
  }),
})

export const {
  useGetRolesQuery,
  useGetRoleQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesApi
