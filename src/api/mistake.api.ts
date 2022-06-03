import { createApi } from '@reduxjs/toolkit/query/react'
import { Mistakes } from 'types/timetable-mistakes.types'
import { baseQueryWithReauth } from './api-config'

export const mistakesApi = createApi({
  reducerPath: 'mistakes',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getMistakes: build.query<Mistakes, void>({
      query: () => 'mistake-finder',
    }),
  }),
})

export const { useGetMistakesQuery } = mistakesApi
