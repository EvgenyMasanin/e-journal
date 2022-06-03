import { createApi } from '@reduxjs/toolkit/query/react'
import { refetchAction } from 'api/teacher-to-subject.api'
import { baseQueryWithReauth } from './api-config'

import { Teacher } from 'types'

export enum TeachersApiTags {
  teacher = 'Teacher',
}

export const teachersApi = createApi({
  reducerPath: 'teachers',
  baseQuery: baseQueryWithReauth,
  tagTypes: [TeachersApiTags.teacher],
  endpoints: (build) => ({
    getTeachers: build.query<Teacher[], void>({
      query: () => 'teachers',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: TeachersApiTags.teacher, id } as const)),
              { type: TeachersApiTags.teacher, id: 'LIST' },
            ]
          : [{ type: TeachersApiTags.teacher, id: 'LIST' }],
      transformResponse: (response: Teacher[]) => {
        const sortedData = [...(response || [])]?.sort((a, b) => {
          if (a.name > b.name) return 1
          if (a.name < b.name) return -1
          return 0
        })
        return sortedData
      },
    }),
    getTeacher: build.query<Teacher, number>({
      query: (id) => `teachers/${id}`,
      providesTags: (result, error, id) => [{ type: TeachersApiTags.teacher, id }],
    }),
    updateTeacher: build.mutation<Teacher, Teacher>({
      query: (teacher) => ({
        url: `teachers/${teacher.id}`,
        method: 'PATCH',
        body: teacher,
      }),
      invalidatesTags: [{ type: TeachersApiTags.teacher, id: 'LIST' }],
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(refetchAction)
      },
    }),
    deleteTeacher: build.mutation<boolean, number>({
      query: (id) => ({
        url: `teachers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: TeachersApiTags.teacher, id: 'LIST' }],
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(refetchAction)
      },
    }),
  }),
})

export const {
  useGetTeachersQuery,
  useGetTeacherQuery,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teachersApi
