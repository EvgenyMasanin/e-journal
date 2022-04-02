import { useCallback, useEffect, useRef, VFC } from 'react'
import { Table } from 'components/table'
import { Loader } from 'components/loader'
import { useYupValidationResolver } from 'hooks/useYupValidationResolver'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import {
  useDeleteTeacherMutation,
  useGetTeachersQuery,
  useUpdateTeacherMutation,
} from 'services/teachersService'
import { Teacher } from 'types'
import * as yup from 'yup'

export interface TeachersPageProps {}

const teachersFormSchema = yup.object().shape({
  name: yup.string().min(3).required('Обязательное поле'),
  fullName: yup.string().required('Обязательное поле'),
  position: yup.string().required('Обязательное поле'),
  fullPosition: yup.string().required('Обязательное поле'),
})

export const TeachersPage: VFC<TeachersPageProps> = ({}) => {
  const { data, isLoading } = useGetTeachersQuery()
  console.log('🚀 ~ data', data)

  const columnNames = useRef(['Инициалы', 'Полное имя', 'Должность (сокр.)', 'Должность'])

  const resolver = useYupValidationResolver(teachersFormSchema)

  const form = useForm<Teacher>({ resolver })

  const [updateTeacher, { isLoading: isUpdateLoading }] = useUpdateTeacherMutation()
  const [deleteTeacher] = useDeleteTeacherMutation()

  const onSubmit: SubmitHandler<Teacher> = useCallback((teacher) => {
    const touchedFieldsCount = Object.keys(form.formState.touchedFields).length
    console.log('🚀  ~ formState.touchedFields', form.formState.touchedFields)
    if (touchedFieldsCount) {
      console.log('on submit -----', teacher)
      updateTeacher(teacher)
    }
  }, [])

  const onInValid: SubmitErrorHandler<Teacher> = useCallback((e) => {
    console.log('on error', e)
  }, [])

  const onDelete = (dataId: number) => {
    console.log('🚀 ~ onDelete ~ onDelete', dataId)
    deleteTeacher(dataId)
  }

  useEffect(() => {
    console.log('page rerender')
  }, [isUpdateLoading])

  return (
    <Table
      data={data}
      columnNames={columnNames.current}
      isLoading={isLoading}
      editable
      form={form}
      onValid={onSubmit}
      onInValid={onInValid}
      onRowDelete={onDelete}
    />
  )
}
