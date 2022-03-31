import { VFC } from 'react'
import { List } from '@chakra-ui/react'
import { TimetableCardPlaceholder } from '../timetable-card-placeholder'
import { LessonItem } from '../lesson-item'
import { WeekTimetable } from 'types'

export interface LessonsListProps {
  weekTimetables: WeekTimetable[]
}

export const LessonsList: VFC<LessonsListProps> = ({ weekTimetables }) => {
  const isLessonsEmpty = weekTimetables.length === 0

  return isLessonsEmpty ? (
    <TimetableCardPlaceholder />
  ) : (
    <List h="full" overflow="hidden">
      {weekTimetables.map(({ id, lessonNumber: number, subjectType, subject: { name } }) => (
        <LessonItem key={id} subjectName={name} subjectType={subjectType} lessonNumber={number} />
      ))}
    </List>
  )
}
