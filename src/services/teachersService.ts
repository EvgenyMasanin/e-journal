import { createApi } from '@reduxjs/toolkit/query/react'
import { Teacher } from 'types'
import { baseQueryWithReauth } from './api-config'

export const teachersApi = createApi({
  reducerPath: 'teachers',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getTeachers: build.query<Teacher[], string>({
      query: () => 'teachers',
    }),
    getTeacher: build.query<Teacher, number>({
      query: (id) => `teachers/${id}`,
    }),
  }),
})

export const { useGetTeachersQuery, useGetTeacherQuery } = teachersApi
