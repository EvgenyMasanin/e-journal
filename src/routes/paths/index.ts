export enum Paths {
  main = '/e-journal',
  auth = '/auth',
  signupAdmin = '/auth/signup-admin',
}

export enum AdminPaths {
  admin = '/e-journal/admin',
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
  teacher = '/e-journal/teacher',
  mySubjects = 'my-subjects',
  myTimetable = 'my-timetable',
  timetableInfo = 'timetable-info',
}

export type AllPaths = Paths | AdminPaths | TeacherPaths
