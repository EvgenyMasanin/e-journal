import { ModalForm } from 'components/form/form-components'
import { VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreateRoleMutation } from 'api/role.api'
import { useRoleFormSchemaResolver } from '../schemes/role-form-schema'

export interface RoleFormFields {
  name: string
  description: string
}

export const AddRoleForm: VFC = () => {
  const [createRole, { isLoading, isError }] = useCreateRoleMutation()

  const resolver = useRoleFormSchemaResolver()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<RoleFormFields>({ resolver })

  const onSubmit: SubmitHandler<RoleFormFields> = async (role) => {
    console.log('submit', role)
    const data = await createRole(role).unwrap()
    console.log('🚀 ~ SubmitHandler<RoleFormFields>= ~ data', data)
    if (data) reset()
  }

  const fields: Array<keyof RoleFormFields> = ['name', 'description']

  return (
    <ModalForm
      openBtnTitle="Добавить пользователя"
      headerTitle="Введите данные пользователя"
      fields={fields}
      register={register}
      errors={errors}
      reset={reset}
      onValid={onSubmit}
      handleSubmit={handleSubmit}
    />
  )
}
