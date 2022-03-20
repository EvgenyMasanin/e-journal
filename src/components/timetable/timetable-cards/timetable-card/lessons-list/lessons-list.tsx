import { VFC } from 'react'
import { List } from '@chakra-ui/react'
import { TimetableCardPlaceholder } from '../timetable-card-placeholder'
import { LessonItem } from '../lesson-item'
import { Lesson } from 'types/timetable.types'

export interface LessonsListProps {
  lessons: Pick<Lesson, 'id' | 'subjectName' | 'lessonNumber'>[]
}

export const LessonsList: VFC<LessonsListProps> = ({ lessons }) => {
  const isLessonsEmpty = lessons.length === 0

  return isLessonsEmpty ? (
    <TimetableCardPlaceholder />
  ) : (
    <List h="100%" overflow="hidden">
      {lessons.map(({ id, subjectName: name, lessonNumber: number }) => (
        <LessonItem key={id} lessonName={name} lessonNumber={number} />
      ))}
    </List>
  )
}
