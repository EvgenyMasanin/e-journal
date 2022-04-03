import { VFC } from 'react'
import { ModalForm } from '../../form-components/modal-form'
import { useForm } from 'react-hook-form'
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
  } = useForm<TeacherFormFields>({ resolver })

  const onSubmit = (data: any) => {
    console.log('submit', data)
  }

  const fields: Array<keyof TeacherFormFields> = ['name', 'fullName', 'fullPosition', 'position']

  return (
    <ModalForm
      openBtnTitle="Добавить преподавателя"
      headerTitle="Введите данные преподавателя"
      handleSubmit={handleSubmit(onSubmit)}
      fields={fields}
      register={register}
      errors={errors}
    />
  )
}
