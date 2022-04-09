import { useCallback, useRef, VFC } from 'react'
import { TablePageContainer } from 'components/table-page-container'
import { Table } from 'components/table'
import { AddUserForm } from 'components/form/forms/add-user-form'
import { useUserFormSchemaResolver } from 'components/form/forms/schemes'
import { useTableForm } from 'hooks/useTableForm'
import { SubmitHandler } from 'react-hook-form'
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from 'services/usersService'
import { useGetRolesQuery } from 'services/roleService'
import { useGetTeachersQuery } from 'services/teachersService'
import { mapUserFormFieldsToUser, mapUsers } from './mappers'
import { getRenderCell, getRenderEditableCell } from './render-cells'

export interface UserForTable {
  id: number
  email: string
  teacher: number
  roles: string
}

export interface UserFormFields {
  id: number
  email: string
  teacherId: number
  rolesId: number[]
}

export const UsersPage: VFC = ({}) => {
  const { data, isLoading } = useGetUsersQuery()
  const { data: roles, isLoading: isRolesLoading } = useGetRolesQuery()
  const { data: teachers, isLoading: isTeachersLoading } = useGetTeachersQuery()

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()

  const columnNames = useRef(['почта', 'преподаватель', 'роли'])

  const handleSubmit: SubmitHandler<UserFormFields> = useCallback(
    (user) => {
      console.log('🚀 ~ submit', user)
      // updateUser(user)
    },
    [updateUser]
  )

  const handleDelete = useCallback(
    (dataId: number) => {
      deleteUser(dataId)
    },
    [deleteUser]
  )

  const { form, onDelete, onSubmit } = useTableForm({
    resolver: useUserFormSchemaResolver(mapUserFormFieldsToUser),
    handleSubmit,
    handleDelete,
  })

  return (
    <TablePageContainer
      headerText="Пользователи"
      FormComponent={<AddUserForm />}
      TableComponent={
        <Table
          data={mapUsers(data ?? [])}
          columnNames={columnNames.current}
          isLoading={isLoading || isRolesLoading || isTeachersLoading}
          renderCell={getRenderCell({ users: data })}
          renderEditableCell={getRenderEditableCell({ control: form.control, roles, teachers })}
          editable
          form={form}
          onValid={onSubmit}
          onInValid={console.log}
          onRowDelete={onDelete}
          isUpdating={isUpdating || isDeleting}
        />
      }
    />
  )
}
