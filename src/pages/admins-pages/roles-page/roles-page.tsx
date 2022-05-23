import { useCallback, useRef, VFC } from 'react'
import { TablePageContainer } from 'components/table-page-container'
import { Table } from 'components/table'
import { AddRoleForm } from 'components/form/forms/add-role-form'
import { useRoleFormSchemaResolver } from 'components/form/forms/schemes'
import { useTableForm } from 'hooks/useTableForm'
import { SubmitHandler } from 'react-hook-form'
import {
  useDeleteRoleMutation,
  useGetRolesQuery,
  useUpdateRoleMutation,
} from 'api/role.api'
import { Role } from 'types/user.types'

export interface RolesPageProps {}

export const RolesPage: VFC<RolesPageProps> = ({}) => {
  const { data, isLoading } = useGetRolesQuery()

  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation()
  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation()

  const columnNames = useRef(['Название роли', 'Описание'])

  const resolver = useRoleFormSchemaResolver()

  const handleSubmit: SubmitHandler<Role> = useCallback(
    (role) => {
      updateRole(role)
    },
    [updateRole]
  )

  const handleDelete = (dataId: number) => {
    deleteRole(dataId)
  }

  const { form, onDelete, onSubmit } = useTableForm({
    resolver,
    handleSubmit,
    handleDelete,
  })

  return (
    <TablePageContainer
      headerText="Роли"
      FormComponent={<AddRoleForm />}
      TableComponent={
        <Table
          data={data}
          isLoading={isLoading}
          columnNames={columnNames.current}
          editable
          form={form}
          onValid={onSubmit}
          onRowDelete={onDelete}
          isUpdating={isUpdating || isDeleting}
        />
      }
    />
  )
}
