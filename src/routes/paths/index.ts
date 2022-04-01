export enum Paths {
  main = '/',
  auth = '/auth',
}

export enum AdminPaths {
  admin = 'admin',
  users = 'users',
  teachers = 'teachers',
  subjects = 'subjects',
  groups = 'groups',
  timetables = 'timetables',
  roles = 'roles',
  timetablesMistakes = 'timetables-mistakes',
}

export enum TeacherPaths {
  teacher = 'teacher',
  mySubjects = 'my-subjects',
  myTimetable = 'my-timetable',
  timetableInfo = 'timetable-info',
}

export type AllPaths = Paths | AdminPaths | TeacherPaths