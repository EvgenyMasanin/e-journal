import { Flex, Tag, Text, Tooltip, VStack } from '@chakra-ui/react'
import { NameValueText } from 'components/name-value-text'
import { VFC } from 'react'
import { SemesterMap, SubjectTypesAbbreviationMap } from 'types'
import { SameAuditoriumMistakeTimetableData } from 'types/timetable-mistakes.types'
import { getAbbreviation } from 'utils/getAbbreviation'

export interface SameAuditoriumMistakeCardPartProps {
  timetable: SameAuditoriumMistakeTimetableData
}

export const SameAuditoriumMistakeCardPart: VFC<SameAuditoriumMistakeCardPartProps> = ({
  timetable,
}) => {
  const { teacherName, groupName, subGroupNumber, course, subjectName, subjectType, semester } =
    timetable

  return (
    <VStack alignItems="flex-start">
      <NameValueText name="Преподаватель" value={teacherName} />
      <Flex gap={2}>
        <Text>Предмет:</Text>
        <Tag
          flexShrink={0}
          fontWeight="bold"
          fontSize="lg"
          size="md"
          variant="subtle"
          colorScheme="teal"
        >
          {SubjectTypesAbbreviationMap[subjectType]}.
        </Tag>
        <Tooltip hasArrow label={subjectName}>
          <Text>{getAbbreviation(subjectName)}</Text>
        </Tooltip>
      </Flex>
      <NameValueText name="Группа" value={`${groupName}/${subGroupNumber}`} />
      <NameValueText name="Курс" value={course} />
      <NameValueText name="Семестр:" value={SemesterMap[semester]} />
    </VStack>
  )
}
