import { createApi } from '@reduxjs/toolkit/query/react'
import { Subject, SubjectWithAdditionData } from 'types'
import { baseQueryWithReauth } from './api-config'

export enum SubjectApiTags {
  subject = 'Subject',
}

const URL = 'subjects'

export const subjectsApi = createApi({
  reducerPath: 'subjects',
  baseQuery: baseQueryWithReauth,
  tagTypes: [SubjectApiTags.subject],
  endpoints: (build) => ({
    getSubjectsByTeacherId: build.query<SubjectWithAdditionData[], number>({
      query: (teacherId) => `subjects/subjects-by-teacher/${teacherId}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: SubjectApiTags.subject, id } as const)),
              { type: SubjectApiTags.subject, id: 'LIST' },
            ]
          : [{ type: SubjectApiTags.subject, id: 'LIST' }],
    }),
    getSubjects: build.query<Subject[], void>({
      query: () => `subjects`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: SubjectApiTags.subject, id } as const)),
              { type: SubjectApiTags.subject, id: 'LIST' },
            ]
          : [{ type: SubjectApiTags.subject, id: 'LIST' }],
    }),
    getSubject: build.query<Subject, number>({
      query: (id) => `${URL}/${id}`,
      providesTags: (result, error, id) => [{ type: SubjectApiTags.subject, id }],
    }),
    // createRole: build.mutation<Subject, RoleFormFields>({
    createSubject: build.mutation<Subject, any>({
      query: (role) => ({
        url: URL,
        method: 'POST',
        body: role,
      }),
      invalidatesTags: [{ type: SubjectApiTags.subject, id: 'LIST' }],
    }),
    updateSubject: build.mutation<Subject, Subject>({
      query: (role) => ({
        url: `${URL}/${role.id}`,
        method: 'PATCH',
        body: role,
      }),
      invalidatesTags: [{ type: SubjectApiTags.subject, id: 'LIST' }],
    }),
    deleteSubject: build.mutation<boolean, number>({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: SubjectApiTags.subject, id: 'LIST' }],
    }),
  }),
})

export const {
  useGetSubjectsByTeacherIdQuery,
  useGetSubjectQuery,
  useGetSubjectsQuery,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectsApi
