import { Timetable, Week } from 'types'
import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './api-config'

export enum TimetableApiTags {
  timetable = 'Timetable',
}

const URL = 'timetable'

export const timetableApi = createApi({
  reducerPath: 'timetable',
  baseQuery: baseQueryWithReauth,
  tagTypes: [TimetableApiTags.timetable],
  endpoints: (build) => ({
    getTimetablesByTeacherId: build.query<Week, number>({
      query: (teacherId) => `timetable/by-teacher/?teacher_id=${teacherId}`,
    }),

    getTimetables: build.query<Timetable[], void>({
      query: () => URL,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: TimetableApiTags.timetable, id } as const)),
              { type: TimetableApiTags.timetable, id: 'LIST' },
            ]
          : [{ type: TimetableApiTags.timetable, id: 'LIST' }],
    }),
    getTimetable: build.query<Timetable, number>({
      query: (id) => `${URL}/${id}`,
      providesTags: (result, error, id) => [{ type: TimetableApiTags.timetable, id }],
    }),
    // createGroup: build.mutation<Group, RoleFormFields>({
    createTimetable: build.mutation<Timetable, Omit<Timetable, 'id'>>({
      query: (body) => ({
        url: URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: TimetableApiTags.timetable, id: 'LIST' }],
    }),
    updateTimetable: build.mutation<Timetable, Timetable>({
      query: (body) => ({
        url: `${URL}/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: TimetableApiTags.timetable, id: 'LIST' }],
    }),
    deleteTimetable: build.mutation<boolean, number>({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: TimetableApiTags.timetable, id: 'LIST' }],
    }),
  }),
})

export const {
  useGetTimetablesByTeacherIdQuery,
  useGetTimetableQuery,
  useGetTimetablesQuery,
  useCreateTimetableMutation,
  useUpdateTimetableMutation,
  useDeleteTimetableMutation,
} = timetableApi
