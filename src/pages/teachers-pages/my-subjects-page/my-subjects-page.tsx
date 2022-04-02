import { Center, Tag, Wrap } from '@chakra-ui/react'
import { Table } from 'components/table'
import { useRef, VFC } from 'react'
import { useTypedSelector } from 'redux-store/hooks'
import { selectTeacherId } from 'redux-store/reducers/user.slice'
import { useGetSubjectsQuery } from 'services/subjectsService'
import { SemesterMap, SubjectWithAdditionData, WeekTypeMap } from 'types'

export interface MySubjectsProps {}

const mapSubjects = (subjectWithAdditionData: SubjectWithAdditionData[]) =>
  subjectWithAdditionData?.map(({ id, name, groups, semesters, weekTypes }) => ({
    id,
    name,
    groups: groups.join(),
    semesters: semesters.map((s) => SemesterMap[s]).join(),
    weekTypes:
      weekTypes.length === 0
        ? ''
        : weekTypes.length === 1
        ? WeekTypeMap[weekTypes[0]]
        : WeekTypeMap['up/down'],
  }))

export const MySubjectsPage: VFC<MySubjectsProps> = ({}) => {
  const teacherId = useTypedSelector(selectTeacherId)

  const { data, isLoading } = useGetSubjectsQuery(teacherId)

  const columnNames = useRef(['Название предмета', 'Группы', 'Семестры', 'Типы недели'])

  const renderCell = (columnName: string, value: string | number) => {
    if (columnName === 'Название предмета') return
    if (!value) return
    if (typeof value !== 'string') return

    return (
      <Wrap justifyContent="space-around">
        {value.split(',').map((text) => (
          <Center key={text}>
            <Tag colorScheme="teal">{text}</Tag>
          </Center>
        ))}
      </Wrap>
    )
  }

  return (
    <Table
      data={mapSubjects(data)}
      isLoading={isLoading}
      columnNames={columnNames.current}
      printCounter
      renderCell={renderCell}
    />
  )
}
