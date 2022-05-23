import { useTimetableSchemaResolver } from 'components/form/forms/schemes/timetable-form-schema'
import { Table } from 'components/table'
import { TablePageContainer } from 'components/table-page-container'
import { useTableForm } from 'hooks/useTableForm'
import { useCallback, useRef, VFC } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useGetGroupsQuery } from 'api/group.api'
import { useGetTeacherToSubjectsQuery } from 'api/teacher-to-subject.api'
import {
  useDeleteTimetableMutation,
  useGetTimetablesQuery,
  useUpdateTimetableMutation,
} from 'api/timetable.api'
import { Timetable } from 'types'
import { getRenderCell, getRenderInputCell } from './render-cells'

export interface TimetablesPageProps {}

export const TimetablesPage: VFC<TimetablesPageProps> = ({}) => {
  const { data: timetables, isLoading: isTimetablesLoading, isError } = useGetTimetablesQuery()

  const { data: teacherToSubjects, isLoading: isTeacherToSubjectsLoading } =
    useGetTeacherToSubjectsQuery()

  const { data: groups, isLoading: isGroupsLoading } = useGetGroupsQuery()

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

  const mapper = (data: Timetable): Timetable => {
    console.log('🚀 ~ mapper ~ data', data)
    return {
      ...data,
      hoursPerWeek: data.hoursPerWeek || undefined,
    }
  }

  const { form, onDelete, onSubmit, onInValid } = useTableForm({
    resolver: useTimetableSchemaResolver(mapper),
    handleSubmit,
    handleDelete,
  })

  const { t } = useTranslation()

  return (
    <TablePageContainer
      headerText={t('timetable')}
      FormComponent={null}
      TableComponent={
        <Table
          data={timetables}
          isLoading={isTimetablesLoading || isTeacherToSubjectsLoading || isGroupsLoading}
          isUpdating={isUpdating || isDeleting}
          size="sm"
          columnNames={columnNames.current}
          editable
          form={form}
          onValid={onSubmit}
          onInValid={onInValid}
          onRowDelete={onDelete}
          renderCell={getRenderCell({ teacherToSubjects, groups })}
          renderEditableCell={getRenderInputCell({ groups, teacherToSubjects, form })}
        />
      }
    />
  )
}
