import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from './api-config'
import { TeacherToSubject } from 'types'

export enum TeacherToSubjectApiTags {
  teacherToSubject = 'TeacherToSubject',
}

const URL = 'teachers/teacher-to-subject'

export const teacherToSubjectApi = createApi({
  reducerPath: 'teacherToSubject',
  baseQuery: baseQueryWithReauth,
  tagTypes: [TeacherToSubjectApiTags.teacherToSubject],
  endpoints: (build) => ({
    getTeacherToSubjects: build.query<TeacherToSubject[], void>({
      query: () => URL,
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                ({ id }) => ({ type: TeacherToSubjectApiTags.teacherToSubject, id } as const)
              ),
              { type: TeacherToSubjectApiTags.teacherToSubject, id: 'LIST' },
            ]
          : [{ type: TeacherToSubjectApiTags.teacherToSubject, id: 'LIST' }],
    }),
    getTeacherToSubject: build.query<TeacherToSubject, number>({
      query: (id) => `${URL}/${id}`,
      providesTags: (result, error, id) => [{ type: TeacherToSubjectApiTags.teacherToSubject, id }],
    }),
    // createGroup: build.mutation<Group, RoleFormFields>({
    createTeacherToSubject: build.mutation<TeacherToSubject, Omit<TeacherToSubject, 'id'>>({
      query: (body) => ({
        url: URL,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: TeacherToSubjectApiTags.teacherToSubject, id: 'LIST' }],
    }),
    updateTeacherToSubject: build.mutation<TeacherToSubject, TeacherToSubject>({
      query: (body) => ({
        url: `${URL}/${body.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: TeacherToSubjectApiTags.teacherToSubject, id: 'LIST' }],
    }),
    deleteTeacherToSubject: build.mutation<boolean, number>({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: TeacherToSubjectApiTags.teacherToSubject, id: 'LIST' }],
    }),
  }),
})

export const {
  useGetTeacherToSubjectQuery,
  useGetTeacherToSubjectsQuery,
  useCreateTeacherToSubjectMutation,
  useUpdateTeacherToSubjectMutation,
  useDeleteTeacherToSubjectMutation,
} = teacherToSubjectApi

export const refetchAction = teacherToSubjectApi.util.invalidateTags([
  TeacherToSubjectApiTags.teacherToSubject,
])
