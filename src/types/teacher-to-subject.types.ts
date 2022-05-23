import { Subject } from './subject.types'
import { Teacher } from './teacher'

export interface TeacherToSubject {
  id: number
  teacher: Teacher
  subject: Subject
}
