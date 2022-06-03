import { Flex, Tag, Text, Tooltip } from '@chakra-ui/react'
import { Card } from 'components/card'
import { NameValueText } from 'components/name-value-text'
import { MistakeCard } from 'components/mistake-card'
import { VFC } from 'react'
import { SubjectTypesAbbreviationMap, SubjectTypesMap } from 'types'
import { CountOfLessonsMistake } from 'types/timetable-mistakes.types'

export interface CountOfLessonMistakeCardProps {
  mistake: CountOfLessonsMistake
}

export const CountOfLessonMistakeCard: VFC<CountOfLessonMistakeCardProps> = ({
  mistake: countOfLessonsMistake,
}) => {
  const {
    teacherName,
    subjectName,
    groupName,
    subgroupNum,
    subjectType,
    expectedHoursPerWeek,
    realHoursPerWeek,
  } = countOfLessonsMistake
  return (
    <Card w="full" h="full" display="flex" flexDirection="column" gap={3}>
      <NameValueText name="Преподаватель:" value={teacherName} />
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
          <Text whiteSpace="nowrap" isTruncated>
            {subjectName}
          </Text>
        </Tooltip>
      </Flex>
      <NameValueText name="Тип занятия:" value={SubjectTypesMap[subjectType]} />
      <NameValueText name="Группа:" value={`${groupName}/${subgroupNum}`} />
      <NameValueText name="Ожидалось часов:" value={expectedHoursPerWeek} />
      <NameValueText name="По факту часов:" value={realHoursPerWeek} />
    </Card>
  )
}
