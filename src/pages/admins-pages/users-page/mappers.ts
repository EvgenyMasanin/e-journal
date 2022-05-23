import { Option } from 'components/form'
import { Teacher, Role, User } from 'types'
import { UserFormFields, UserForTable } from './users-page'

export const mapUsers = (users: User[]): UserForTable[] => {
  return users.map(({ id, email, roles, teacher }) => ({
    id,
    email,
    teacher: teacher?.id,
    roles: roles.map((r) => r.id).join(),
  }))
}

export const mapRolesToOptions = (roles: Role[] = []): Option[] =>
  roles.map((role) => ({
    label: role.name,
    value: String(role.id),
  }))

export const mapTeachersToOptions = (teachers: Teacher[] = []): Option[] =>
  teachers.map((teacher) => ({
    label: teacher.fullName ?? teacher.name,
    value: String(teacher.id),
  }))

export const mapUserFormFieldsToUser = ({
  id,
  email,
  rolesId,
  teacherId,
}: {
  id: number
  email: string
  teacherId: Option
  rolesId: Option[]
}): UserFormFields => ({
  id,
  email,
  rolesId: rolesId?.map((r) => +r.value),
  teacherId: teacherId ? +teacherId?.value : undefined,
})
