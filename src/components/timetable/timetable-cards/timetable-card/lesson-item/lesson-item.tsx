import { VFC } from 'react'
import { ListItem, Tag, Text } from '@chakra-ui/react'
import { SubjectTypes, SubjectTypesAbbreviationMap } from 'types/subject.types'

export interface TimetableCardItemProps {
  lessonNumber: number
  subjectName: string
  subjectType: SubjectTypes
}

export const LessonItem: VFC<TimetableCardItemProps> = ({
  lessonNumber,
  subjectName,
  subjectType,
}) => {
  return (
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
      <Text isTruncated fontSize="lg">
        {subjectName}
      </Text>
    </ListItem>
  )
}
