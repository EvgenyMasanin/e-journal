import { Flex, Tag, Text, Tooltip } from '@chakra-ui/react'
import { Card } from 'components/card'
import { NameValueText } from 'components/name-value-text'
import { VFC } from 'react'
import getEnumKeyByEnumValue, {
  SemesterMap,
  SubjectTypesAbbreviationMap,
  SubjectTypesMap,
  WeekDaysMap,
  WeekTypeMap,
} from 'types'
import { MissingCampusOrAuditoriumMistake } from 'types/timetable-mistakes.types'

export interface MissingCampusOrAuditoriumMistakeCardProps {
  mistake: MissingCampusOrAuditoriumMistake
}

export const MissingCampusOrAuditoriumMistakeCard: VFC<
  MissingCampusOrAuditoriumMistakeCardProps
> = ({ mistake }) => {
  const {
    teacherName,
    subjectName,
    groupName,
    subGroupNum,
    course,
    lessonNumber,
    semester,
    type,
    weekDay,
    weekType,
    auditorium,
    campus,
  } = mistake
  console.log('🚀 ~ campus', campus)
  return (
    <Card w="full" h="full" display="flex" flexDirection="column" gap={3}>
      <NameValueText name="Преподаватель:" value={teacherName} />
      <NameValueText name="Номер пары:" value={lessonNumber} />
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
          {SubjectTypesAbbreviationMap[type]}.
        </Tag>
        <Tooltip hasArrow label={subjectName}>
          <Text whiteSpace="nowrap" isTruncated>
            {subjectName}
          </Text>
        </Tooltip>
      </Flex>

      <NameValueText name="Группа:" value={`${groupName}/${subGroupNum}`} />
      <NameValueText name="Курс:" value={course} />
      <NameValueText name="Семестр:" value={SemesterMap[semester]} />
      <NameValueText name="Тип:" value={SubjectTypesMap[type]} />
      <NameValueText
        name="День недели:"
        value={getEnumKeyByEnumValue(WeekDaysMap, weekDay).toLowerCase()}
      />
      <NameValueText name="Тип недели:" value={WeekTypeMap[weekType]} />
      <NameValueText
        name="Аудитория:"
        value={auditorium ?? <Tag colorScheme="red">Не указана</Tag>}
      />
      <NameValueText name="Корпус:" value={campus ?? <Tag colorScheme="red">Не указан</Tag>} />
    </Card>
  )
}
