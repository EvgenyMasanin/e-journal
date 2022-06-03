export enum Paths {
  main = '/',
  auth = '/auth/signin',
  signupAdmin = '/auth/signup-admin',
}

export enum AdminPaths {
  admin = '/admin',
  users = 'users',
  teachers = 'teachers',
  subjects = 'subjects',
  groups = 'groups',
  timetables = 'timetables',
  roles = 'roles',
  timetablesMistakes = 'timetables-mistakes',
  uploadFiles = 'upload-files',
}

export enum TeacherPaths {
  teacher = 'teacher',
  mySubjects = 'my-subjects',
  myTimetable = 'my-timetable',
  timetableInfo = 'timetable-info',
}

export type AllPaths = Paths | AdminPaths | TeacherPaths
