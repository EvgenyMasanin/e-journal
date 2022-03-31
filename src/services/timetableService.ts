import { Week } from './../types'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './api-config'

export const timetableApi = createApi({
  reducerPath: 'timetable',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getTeachersTimetables: build.query<Week, number>({
      query: (teacherId) => `timetable?teacher_id=${teacherId}`,
    }),
  }),
})

export const { useGetTeachersTimetablesQuery } = timetableApi
