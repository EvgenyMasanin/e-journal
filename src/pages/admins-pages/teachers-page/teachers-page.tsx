import { useCallback, useRef, VFC } from 'react'
import { Table } from 'components/table'
import { AddTeacherForm } from 'components/form/forms/add-teacher-form'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useTeachersFormSchemaResolver } from 'components/form/forms/schemes'
import {
  useDeleteTeacherMutation,
  useGetTeachersQuery,
  useUpdateTeacherMutation,
} from 'services/teachersService'
import { Teacher } from 'types'
import { Flex, Heading } from '@chakra-ui/react'

export interface TeachersPageProps {}

export const TeachersPage: VFC<TeachersPageProps> = ({}) => {
  const { data, isLoading } = useGetTeachersQuery()

  const [updateTeacher, { isLoading: isUpdateLoading }] = useUpdateTeacherMutation()
  const [deleteTeacher, { isLoading: isDeleteLoading }] = useDeleteTeacherMutation()

  const columnNames = useRef(['Инициалы', 'Полное имя', 'Должность (сокр.)', 'Должность'])

  const resolver = useTeachersFormSchemaResolver()

  const form = useForm<Teacher>({ resolver })

  const onSubmit: SubmitHandler<Teacher> = useCallback(
    (teacher) => {
      const touchedFieldsCount = Object.keys(form.formState.touchedFields).length

      if (touchedFieldsCount) {
        updateTeacher(teacher)
      }
    },
    [form.formState.touchedFields, updateTeacher]
  )

  const onInValid: SubmitErrorHandler<Teacher> = useCallback((e) => {
    console.log('on error', e)
  }, [])

  const onDelete = (dataId: number) => {
    deleteTeacher(dataId)
  }

  return (
    <>
      <Flex justify="space-between">
        <Heading fontSize="2xl">Преподаватели</Heading>
        <AddTeacherForm />
      </Flex>
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
    </>
  )
}
