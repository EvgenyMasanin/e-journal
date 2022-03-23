import { Week } from './../types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { apiConfig } from './api-config'

export const timetableApi = createApi({
  reducerPath: 'timetable',
  baseQuery: fetchBaseQuery({ baseUrl: apiConfig.baseUrl }),
  endpoints: (build) => ({
    getTeachersTimetables: build.query<Week, number>({
      query: (teacherId) => `timetable?teacher_id=${teacherId}`,
    }),
  }),
})

export const { useGetTeachersTimetablesQuery } = timetableApi
