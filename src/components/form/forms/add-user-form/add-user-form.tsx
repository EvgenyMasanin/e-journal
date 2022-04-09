import { InputField, ModalForm } from 'components/form/form-components'
import { Option, SelectField } from 'components/form/form-components/controls/select-field'
import { VFC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useGetRolesQuery } from 'services/roleService'
import { useGetTeachersQuery } from 'services/teachersService'
import { Teacher } from 'types'
import { Role } from 'types/user.types'
import { useUserFormSchemaResolver } from '../schemes/user-form-schema'

export interface UserFormFields {
  email: string
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
}: {
  email: string
  teacherId: Option
  rolesId: Option[]
}): UserFormFields => ({
  email,
  rolesId: rolesId?.map((r) => +r.value),
  teacherId: teacherId ? +teacherId?.value : undefined,
})

export const AddUserForm: VFC = ({}) => {
  const resolver = useUserFormSchemaResolver(mapUserFormFieldsToUser)

  const { data: teachers } = useGetTeachersQuery()
  const { data: roles } = useGetRolesQuery()

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<UserFormFields>({ resolver })

  const onSubmit: SubmitHandler<UserFormFields> = (data) => {
    console.log('submit', data)
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
