import { VFC } from 'react'
import { ListItem, Tag, Text, Tooltip } from '@chakra-ui/react'
import { SubjectTypes, SubjectTypesAbbreviationMap } from 'types'

export interface TimetableCardItemProps {
  lessonNumber: number
  subjectName: string
  subjectType: SubjectTypes
  auditorium: string
}

export const LessonItem: VFC<TimetableCardItemProps> = ({
  lessonNumber,
  subjectName,
  subjectType,
  auditorium,
}) => {
  return (
    <Tooltip hasArrow label={subjectName}>
      <ListItem p={2} display="flex" alignItems="center" gap={3}>
        <Tag
          flexShrink={0}
          fontWeight="bold"
          fontSize="lg"
          size="md"
          variant="subtle"
          colorScheme="teal"
        >
          {`${lessonNumber}. ${SubjectTypesAbbreviationMap[subjectType]}`}
        </Tag>
        <Text>{auditorium}</Text>
        <Text isTruncated fontSize="lg">
          {subjectName}
        </Text>
      </ListItem>
    </Tooltip>
  )
}
