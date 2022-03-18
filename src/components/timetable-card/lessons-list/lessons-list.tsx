import { List } from '@chakra-ui/react'
import React, { VFC } from 'react'
import { Lesson } from 'types/timetable.types'
import { LessonItem } from '../lesson-item'
import { TimetableCardPlaceholder } from '../timetable-card-placeholder'

export interface LessonsListProps {
  lessons: Lesson[]
}

export const LessonsList: VFC<LessonsListProps> = ({ lessons }) => {
  return lessons.length === 0 ? (
    <TimetableCardPlaceholder />
  ) : (
    <List h="100%" overflow="hidden">
      {lessons.map(({ id, name, number }) => (
        <LessonItem key={id} lessonName={name} lessonNumber={number} />
      ))}
    </List>
  )
}
