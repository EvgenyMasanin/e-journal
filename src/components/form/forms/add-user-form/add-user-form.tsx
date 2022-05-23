import { InputField, ModalForm, PasswordField } from 'components/form/form-components'
import { Option, SelectField } from 'components/form/form-components/controls/select-field'
import { VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useGetRolesQuery } from 'api/role.api'
import { useGetTeachersQuery } from 'api/teachers.api'
import { Teacher } from 'types'
import { Role } from 'types/user.types'
import { useAddUserFormSchemaResolver } from '../schemes/user-form-schema'
import { useCreateUserMutation } from 'api/users.api'

export interface UserFormFields {
  email: string
  password: string
  teacherId: number
  rolesId: number[]
}

const mapTeachersToOptions = (teachers: Teacher[] = []): Option[] =>
  teachers.map<Option>((teacher) => ({
    value: String(teacher.id),
    label: teacher.fullName ?? teacher.name,
  }))

const mapRolesToOptions = (roles: Role[] = []): Option[] =>
  roles.map<Option>((role) => ({
    value: String(role.id),
    label: role.name,
  }))

const mapUserFormFieldsToUser = ({
  email,
  rolesId,
  teacherId,
  password,
}: {
  email: string
  teacherId: Option
  rolesId: Option[]
  password: string
}): UserFormFields => ({
  email,
  password,
  rolesId: rolesId?.map((r) => +r.value),
  teacherId: teacherId ? +teacherId?.value : undefined,
})

export const AddUserForm: VFC = () => {
  const resolver = useAddUserFormSchemaResolver(mapUserFormFieldsToUser)

  const { data: teachers } = useGetTeachersQuery()
  const { data: roles } = useGetRolesQuery()

  const [createUser, { isLoading }] = useCreateUserMutation()

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<UserFormFields>({ resolver })

  const onSubmit: SubmitHandler<UserFormFields> = (data) => {
    console.log('submit', data)
    createUser(data)
    reset()
  }

  return (
    <ModalForm
      openBtnTitle="Добавить пользователя"
      headerTitle="Введите данные пользователя"
      reset={reset}
      onValid={onSubmit}
      handleSubmit={handleSubmit}
    >
      <InputField
        label="Адрес электронной почты"
        {...register('email')}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
      />
      <PasswordField
        autoComplete="new-password"
        label="Пароль"
        {...register('password')}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
      />
      <SelectField
        control={control}
        id="teacherId"
        name="teacherId"
        label="Преподаватель"
        options={mapTeachersToOptions(teachers)}
      />
      <SelectField
        control={control}
        id="rolesId"
        name="rolesId"
        label="Роль"
        isMulti
        options={mapRolesToOptions(roles)}
      />
    </ModalForm>
  )
}
