import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './api-config'

export const mistakesApi = createApi({
  reducerPath: 'mistakes',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getMistakes: build.query({
      query: () => 'mistake-finder',
    }),
  }),
})

export const { useGetMistakesQuery } = mistakesApi
