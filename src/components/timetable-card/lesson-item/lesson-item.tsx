import React, { VFC } from 'react'
import { ListItem, Text } from '@chakra-ui/react'

export interface TimetableCardItemProps {
  lessonNumber: number
  lessonName: string
}

export const LessonItem: VFC<TimetableCardItemProps> = ({ lessonNumber, lessonName }) => {
  return (
    <ListItem p={2} textAlign="start" display="flex" gap={5}>
      <Text>{lessonNumber}</Text>
      <Text isTruncated>{lessonName}</Text>
    </ListItem>
  )
}
