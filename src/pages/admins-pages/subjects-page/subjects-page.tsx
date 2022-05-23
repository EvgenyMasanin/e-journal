import { AddSubjectForm } from 'components/form/forms/add-subject-form'
import { useSubjectSchemaResolver } from 'components/form/forms/schemes/subject-form-schema'
import { Table } from 'components/table'
import { TablePageContainer } from 'components/table-page-container'
import { useCallback, useRef, VFC } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import {
  useDeleteSubjectMutation,
  useUpdateSubjectMutation,
  useGetSubjectsQuery,
} from 'api/subjects.api'
import { Subject } from 'types'

export const SubjectsPage: VFC = () => {
  const { data, isLoading } = useGetSubjectsQuery()

  const [updateTeacher, { isLoading: isUpdateLoading }] = useUpdateSubjectMutation()
  const [deleteTeacher, { isLoading: isDeleteLoading }] = useDeleteSubjectMutation()

  const columnNames = useRef(['Название предмета'])

  const resolver = useSubjectSchemaResolver()

  const form = useForm<Subject>({ resolver })

  const onSubmit: SubmitHandler<Subject> = useCallback(
    (subject) => {
      const dirtyFieldsCount = Object.keys(form.formState.dirtyFields).length

      if (dirtyFieldsCount) {
        updateTeacher(subject)
      }
    },
    [form.formState.dirtyFields, updateTeacher]
  )

  const onInValid: SubmitErrorHandler<Subject> = useCallback((e) => {
    console.log('on error', e)
  }, [])

  const onDelete = (dataId: number) => {
    deleteTeacher(dataId)
  }

  return (
    <TablePageContainer
      headerText="Предметы"
      FormComponent={<AddSubjectForm />}
      TableComponent={
        <Table
          data={data}
          columnNames={columnNames.current}
          isLoading={isLoading}
          editable
          form={form}
          onValid={onSubmit}
          onInValid={onInValid}
          onRowDelete={onDelete}
          isUpdating={isUpdateLoading || isDeleteLoading}
        />
      }
    />
  )
}
