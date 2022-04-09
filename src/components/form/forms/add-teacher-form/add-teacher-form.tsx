import { VFC } from 'react'
import { ModalForm } from '../../form-components/modal-form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Teacher } from 'types'
import { useTeacherFormSchemaResolver } from '../schemes'

export interface AddTeacherFormProps {}

export type TeacherFormFields = Omit<Teacher, 'id'>

export const AddTeacherForm: VFC<AddTeacherFormProps> = ({}) => {
  const resolver = useTeacherFormSchemaResolver()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<TeacherFormFields>({ resolver })

  const onSubmit: SubmitHandler<TeacherFormFields> = (data) => {
    console.log('submit', data)
    reset()
  }

  const fields: Array<keyof TeacherFormFields> = ['name', 'fullName', 'fullPosition', 'position']

  return (
    <ModalForm
      openBtnTitle="Добавить преподавателя"
      headerTitle="Введите данные преподавателя"
      reset={reset}
      onValid={onSubmit}
      handleSubmit={handleSubmit}
      fields={fields}
      register={register}
      errors={errors}
    />
  )
}
