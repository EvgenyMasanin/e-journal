import { Text } from '@chakra-ui/react'
import { EntityPopover } from 'components/entity-popover'
import { Table } from 'components/table'
import { useCallback, useRef, VFC } from 'react'
import { useForm } from 'react-hook-form'
import { useGetUsersQuery } from 'services/usersService'
import { User } from 'types/user.types'

export interface UsersPageProps {}

const mapUsers = (users: User[]) => {
  return users.map(({ id, email, roles, teacher }) => ({
    id,
    email,
    teacher: teacher.id,
    roles: roles.map((r) => r.name),
  }))
}

export const UsersPage: VFC<UsersPageProps> = ({}) => {
  const { data, isLoading } = useGetUsersQuery()
  console.log('🚀 ~ data', data)

  const columnNames = useRef(['почта', 'преподаватель', 'роли'])
  const teacherFieldsNames = useRef(['Инициалы', 'Полное имя', 'Должность (сокр.)', 'Должность'])

  const renderCell = useCallback(
    (colName: string, value: string | number) => {
      if (colName === 'преподаватель') {
        const { name, position, fullName, fullPosition } = data?.find(
          (user) => user.teacher.id === value
        ).teacher
        return (
          <>
            <Text as="span">{name} </Text>
            <EntityPopover
              header="Преподаватель"
              entityFieldsNames={teacherFieldsNames.current}
              entityFieldsValues={Object.values({ name, fullName, position, fullPosition })}
            />
          </>
        )
      }
    },
    [data]
  )

  const form = useForm()

  return (
    <Table
      data={mapUsers(data ?? [])}
      columnNames={columnNames.current}
      isLoading={isLoading}
      renderCell={renderCell}
      editable
      form={form}
      // onValid={onSubmit}
      // onInValid={onInValid}
      // onRowDelete={onDelete}
      // isUpdating={isUpdateLoading || isDeleteLoading}
    />
  )
}
