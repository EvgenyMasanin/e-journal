import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './api-config'
import { Group } from 'types'

export enum GroupApiTags {
  group = 'Group',
}

const URL = 'groups'

export const groupsApi = createApi({
  reducerPath: 'groups',
  baseQuery: baseQueryWithReauth,
  tagTypes: [GroupApiTags.group],
  endpoints: (build) => ({
    getGroups: build.query<Group[], void>({
      query: () => URL,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: GroupApiTags.group, id } as const)),
              { type: GroupApiTags.group, id: 'LIST' },
            ]
          : [{ type: GroupApiTags.group, id: 'LIST' }],
    }),
    getGroup: build.query<Group, number>({
      query: (id) => `${URL}/${id}`,
      providesTags: (result, error, id) => [{ type: GroupApiTags.group, id }],
    }),
    // createGroup: build.mutation<Group, RoleFormFields>({
    createGroup: build.mutation<Group, Omit<Group, 'id'>>({
      query: (body) => ({
        url: URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: GroupApiTags.group, id: 'LIST' }],
    }),
    updateGroup: build.mutation<Group, Group>({
      query: (body) => ({
        url: `${URL}/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: GroupApiTags.group, id: 'LIST' }],
    }),
    deleteGroup: build.mutation<boolean, number>({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: GroupApiTags.group, id: 'LIST' }],
    }),
  }),
})

export const {
  useGetGroupsQuery,
  useGetGroupQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupsApi
