import { Center, Divider, Flex, Spacer, Tag, Text, Tooltip, VStack } from '@chakra-ui/react'
import { Card } from 'components/card'
import { NameValueText } from 'components/name-value-text'
import { VFC } from 'react'
import getEnumKeyByEnumValue, {
  semester,
  SubjectTypesAbbreviationMap,
  WeekDaysMap,
  WeekTypeMap,
} from 'types'
import { SameAuditoriumMistake } from 'types/timetable-mistakes.types'
import { getAbbreviation } from 'utils/getAbbreviation'
import { SameAuditoriumMistakeCardPart } from './same-auditorium-mistake-card-part'

export interface SameAuditoriumMistakeCardProps {
  mistake: SameAuditoriumMistake
}

export const SameAuditoriumMistakeCard: VFC<SameAuditoriumMistakeCardProps> = ({ mistake }) => {
  const { timetable1, timetable2 } = mistake

  const { auditorium, campus, lessonNumber, weekDay, weekType } = timetable1

  return (
    <Card w="full" h="full" display="flex" flexDirection="column" gap={3}>
      <Center>Претендуют</Center>
      <Flex gap={5}>
        <SameAuditoriumMistakeCardPart timetable={timetable1} />
        <Divider orientation="vertical" />
        <SameAuditoriumMistakeCardPart timetable={timetable2} />
      </Flex>
      <Divider />
      <NameValueText name="Аудитория:" value={`${auditorium}/${campus}`} />
      <NameValueText
        name="День недели:"
        value={getEnumKeyByEnumValue(WeekDaysMap, weekDay).toLowerCase()}
      />
      <NameValueText name="Тип недели:" value={WeekTypeMap[weekType]} />
      <NameValueText name="Номер пары:" value={lessonNumber} />
    </Card>
  )
}
