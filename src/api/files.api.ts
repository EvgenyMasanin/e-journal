import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth, BASE_URL } from './api-config'

import { saveAs } from 'file-saver'

const URL = 'excel'

export const filesApi = createApi({
  reducerPath: 'files',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    sendFiles: build.mutation<any, any>({
      query: (body) => ({
        url: `${URL}/upload-files`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useSendFilesMutation } = filesApi

export const downloadFileWithTimetable = async () => {
  try {
    const resp = await fetch(`${BASE_URL}excel/file-with-timetable`)
    const fileName = resp.headers.get('content-disposition')
    resp.blob().then(async (blob) => {
      saveAs(blob, fileName)
    })
  } catch (error) {
    console.log('🚀 ~ downloadFileWithTimetable ~ error', error)
  }
}

export const downloadDesignGuidFile = async () => {
  try {
    const resp = await fetch(`${BASE_URL}excel/design-guide`)
    const fileName = resp.headers.get('content-disposition')
    resp.blob().then(async (blob) => {
      saveAs(blob, fileName)
    })
  } catch (error) {
    console.log('🚀 ~ downloadDesignGuidFile ~ error', error)
  }
}
