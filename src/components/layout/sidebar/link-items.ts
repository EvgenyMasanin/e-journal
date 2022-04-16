import { IconType } from 'react-icons'
import {
  FaBook,
  FaCalendarAlt,
  FaFileUpload,
  FaHome,
  FaIdCardAlt,
  FaUser,
  FaUserGraduate,
  FaUsers,
} from 'react-icons/fa'
import { IoIosWarning } from 'react-icons/io'
import { AdminPaths, TeacherPaths, AllPaths } from 'routes/paths'

export interface LinkItemProps {
  name: string
  icon: IconType
  path: AllPaths
}

export const adminLinks: Array<LinkItemProps> = [
  { name: 'Пользователи', icon: FaUser, path: AdminPaths.users },
  { name: 'Роли', icon: FaIdCardAlt, path: AdminPaths.roles },
  { name: 'Преподаватели', icon: FaUserGraduate, path: AdminPaths.teachers },
  { name: 'Предметы', icon: FaBook, path: AdminPaths.subjects },
  { name: 'Группы', icon: FaUsers, path: AdminPaths.groups },
  { name: 'Расписание', icon: FaCalendarAlt, path: AdminPaths.timetables },
  { name: 'Ошибки в расписании', icon: IoIosWarning, path: AdminPaths.timetablesMistakes },
  { name: 'Загрузить расписание', icon: FaFileUpload, path: AdminPaths.uploadFiles },
]
export const teacherLinks: Array<LinkItemProps> = [
  { name: 'Моё Расписание', icon: FaCalendarAlt, path: TeacherPaths.myTimetable },
  { name: 'Мои предметы', icon: FaBook, path: TeacherPaths.mySubjects },
]
