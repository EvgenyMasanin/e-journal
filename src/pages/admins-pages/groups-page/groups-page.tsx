import { useCallback, useRef, VFC } from 'react'
import { TablePageContainer } from 'components/table-page-container'
import { Table } from 'components/table'
import { AddGroupForm } from 'components/form/forms/add-group-form'
import { useGroupSchemaResolver } from 'components/form/forms/schemes'
import { SubmitHandler } from 'react-hook-form'
import { useTableForm } from 'hooks/useTableForm'
import {
  useDeleteGroupMutation,
  useGetGroupsQuery,
  useUpdateGroupMutation,
} from 'services/group.api'
import { Group } from 'types'
import { getRenderCell } from './render-cells'

export type GroupFormFields = Omit<Group, 'subGroupsCount'> & { subGroupsCount: '1' | '2' }

export const GroupsPage: VFC = ({}) => {
  const { data, isLoading } = useGetGroupsQuery()

  const [updateGroup, { isLoading: isUpdating }] = useUpdateGroupMutation()
  const [deleteGroup, { isLoading: isDeleting }] = useDeleteGroupMutation()

  const columnNames = useRef(['Название группы', 'Количество подгрупп'])

  const handleSubmit: SubmitHandler<GroupFormFields> = useCallback(
    (group) => {
      console.log('🚀 ~ submit', group)
      // updateGroup(group)
    },
    [updateGroup]
  )

  const handleDelete = (dataId: number) => {
    deleteGroup(dataId)
  }

  const { form, onDelete, onSubmit } = useTableForm({
    resolver: useGroupSchemaResolver(),
    handleSubmit,
    handleDelete,
  })

  return (
    <TablePageContainer
      headerText="Группы"
      FormComponent={<AddGroupForm />}
      TableComponent={
        <Table
          data={data}
          isLoading={isLoading}
          columnNames={columnNames.current}
          editable
          form={form}
          onValid={onSubmit}
          onInValid={console.log}
          onRowDelete={onDelete}
          isUpdating={isUpdating || isDeleting}
          renderEditableCell={getRenderCell(form)}
        />
      }
    />
  )
}
