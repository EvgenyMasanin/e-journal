import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Teacher } from 'types/teacher'

const baseUrl = 'http://localhost:7000/'

export const teachersApi = createApi({
  reducerPath: 'teachers',
  baseQuery: fetchBaseQuery({ baseUrl }),
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
