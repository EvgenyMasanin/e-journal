import { NumberInputField } from 'components/form/form-components/controls/number-input-field'
import { useTimetableSchemaResolver } from 'components/form/forms/schemes/timetable-form-schema'
import { Table } from 'components/table'
import { TablePageContainer } from 'components/table-page-container'
import { useTableForm } from 'hooks/useTableForm'
import { useCallback, useRef, VFC } from 'react'
import { SubmitHandler } from 'react-hook-form'
import {
  useDeleteTimetableMutation,
  useGetTimetablesQuery,
  useUpdateTimetableMutation,
} from 'services/timetableService'
import { Timetable } from 'types'

export interface TimetablesPageProps {}

export const TimetablesPage: VFC<TimetablesPageProps> = ({}) => {
  const { data, isLoading, isError } = useGetTimetablesQuery()

  const [updateTimetable, { isLoading: isUpdating }] = useUpdateTimetableMutation()
  const [deleteTimetable, { isLoading: isDeleting }] = useDeleteTimetableMutation()

  const handleSubmit: SubmitHandler<Timetable> = useCallback(
    (timetable) => {
      console.log('🚀 ~ submit', timetable)
      // updateRole(role)
    },
    [updateTimetable]
  )

  const handleDelete = (dataId: number) => {
    deleteTimetable(dataId)
  }

  const columnNames = useRef([
    'преподаватель & предмет',
    'группа',
    'номер подгруппы',
    'день недели',
    'тип занятия',
    'часы в семестр',
    'часы в неделю',
    'семестр',
    'курс',
    'номер пары',
    'тип недели',
    'аудитория',
    'корпус',
  ])

  const mapper = (data: Timetable): Timetable => ({
    ...data,
    hoursPerWeek: data.hoursPerWeek || undefined,
  })

  const { form, onDelete, onSubmit } = useTableForm({
    resolver: useTimetableSchemaResolver(mapper),
    handleSubmit,
    handleDelete,
  })

  const {
    register,
    formState: { errors },
  } = form

  const renderEditableCell = (columnName: string, value: string, row: Timetable) => {
    if (columnName === 'часы в неделю')
      return (
        <NumberInputField
          minW={78}
          defaultValue={0}
          {...register('hoursPerWeek')}
          isInvalid={!!errors.hoursPerWeek}
          errorMessage={errors.hoursPerWeek?.message}
        />
      )
  }

  return (
    <TablePageContainer
      headerText="Расписания"
      FormComponent={null}
      TableComponent={
        <Table
          data={data}
          isLoading={isLoading}
          size="sm"
          columnNames={columnNames.current}
          editable
          form={form}
          onValid={onSubmit}
          onRowDelete={onDelete}
          renderEditableCell={renderEditableCell}
        />
      }
    />
  )
}
