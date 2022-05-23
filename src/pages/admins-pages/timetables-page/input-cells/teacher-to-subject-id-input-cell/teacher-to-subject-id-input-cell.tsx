import { Box, Flex, Tag, Tooltip } from '@chakra-ui/react'
import { Option, SelectField } from 'components/form'
import { VFC } from 'react'
import { Control, UseFormSetValue } from 'react-hook-form'
import { TeacherToSubject, Timetable } from 'types'
import { findOptionByValue } from 'utils/find-option-by-value'
import { getAbbreviation } from 'utils/getAbbreviation'

export const mapTeacherToSubjectsToOptions = (
  teacherToSubjects: TeacherToSubject[] = []
): Option[] =>
  teacherToSubjects.map((teacherToSubject) => {
    const { name: teacherName, fullName: teacherFullName } = teacherToSubject?.teacher
    const subjectName = teacherToSubject?.subject?.name
    return {
      label: (
        <Flex gap={1}>
          <Tooltip hasArrow label={teacherFullName}>
            <Tag colorScheme="teal" variant="subtle" maxW={150}>
              {teacherName}
            </Tag>
          </Tooltip>
          <Tooltip hasArrow label={subjectName}>
            <Tag colorScheme="teal" variant="subtle" cursor="help" maxW={150}>
              {getAbbreviation(subjectName)}
            </Tag>
          </Tooltip>
        </Flex>
      ) as any,
      value: String(teacherToSubject.id),
    }
  })

export interface TeacherToSubjectIdInputCellProps {
  control: Control<Timetable>
  setValue: UseFormSetValue<Timetable>
  teacherToSubjects: TeacherToSubject[]
  value: number
}

export const TeacherToSubjectIdInputCell: VFC<TeacherToSubjectIdInputCellProps> = ({
  control,
  setValue,
  teacherToSubjects,
  value,
}) => {
  const teacherToSubjectOptions = mapTeacherToSubjectsToOptions(teacherToSubjects)

  return (
    <Box minW={300}>
      <SelectField
        id="teacherToSubjectId"
        name="teacherToSubjectId"
        control={control}
        options={teacherToSubjectOptions}
        getOnlyValueOnChange
        defaultValue={findOptionByValue(teacherToSubjectOptions, String(value))}
        setDefaultValueFunction={() => setValue('teacherToSubjectId', value)}
      />
    </Box>
  )
}
