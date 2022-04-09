/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import { Box } from '@chakra-ui/react'
import { EntityPopover } from 'components/entity-popover'
import { SelectField } from 'components/form'
import { useRef } from 'react'
import { Control } from 'react-hook-form'
import { Role, Teacher, User } from 'types'
import { mapRolesToOptions, mapTeachersToOptions } from './mappers'
import { UserForTable } from './users-page'

export interface GetRenderCellProps {
  users: User[]
}

export const getRenderCell =
  ({ users }: GetRenderCellProps) =>
  (colName: string, value: string | number, rowData: UserForTable) => {
    const teacherFieldsNames = useRef(['Инициалы', 'Полное имя', 'Должность (сокр.)', 'Должность'])
    const roleFieldsNames = useRef(['Название роли', 'Описание'])

    const user = users?.find((user) => user.teacher.id === rowData.teacher)

    if (!user) return
    if (colName === 'преподаватель') {
      const { id, ...teacher } = user.teacher
      return (
        <EntityPopover
          triggerText={teacher.name}
          header="Преподаватель"
          entityFieldsNames={teacherFieldsNames.current}
          entityFieldsValues={Object.values(teacher)}
        />
      )
    }
    if (colName === 'роли') {
      return String(value)
        .split(',')
        .map((roleId) => {
          const { id, ...role } = user.roles?.find((role) => role.id === +roleId)
          return (
            <EntityPopover
              key={roleId}
              triggerText={role.name}
              header="Преподаватель"
              entityFieldsNames={roleFieldsNames.current}
              entityFieldsValues={Object.values(role)}
            />
          )
        })
    }
  }

export interface GetRenderEditableCellProps {
  control: Control<any>
  roles: Role[]
  teachers: Teacher[]
}

export const getRenderEditableCell =
  ({ control, roles, teachers }: GetRenderEditableCellProps) =>
  (colName: string) => {
    if (colName === 'роли') {
      const options = mapRolesToOptions(roles)

      return <SelectField control={control} id="rolesId" name="rolesId" isMulti options={options} />
    }

    if (colName === 'преподаватель') {
      const options = mapTeachersToOptions(teachers)
      return (
        <Box minW={200}>
          <SelectField control={control} id={'teacherId'} name={'teacherId'} options={options} />
        </Box>
      )
    }
  }
