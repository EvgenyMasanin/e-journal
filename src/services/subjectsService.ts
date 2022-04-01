import { createApi } from '@reduxjs/toolkit/query/react'
import { SubjectWithAdditionData } from 'types'
import { baseQueryWithReauth } from './api-config'

export const subjectsApi = createApi({
  reducerPath: 'subjects',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getSubjects: build.query<SubjectWithAdditionData[], number>({
      query: (teacherId) => `subjects/subjects-by-teacher/${teacherId}`,
    }),
  }),
})

export const { useGetSubjectsQuery } = subjectsApi
