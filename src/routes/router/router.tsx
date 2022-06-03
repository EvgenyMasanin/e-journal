import { VFC } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Layout } from 'components/layout'
import { Loader } from 'components/loader'
import { AuthPage } from 'pages/auth-page'
import { GreetingPage } from 'pages/greeting-page'
import { UsersPage } from 'pages/admins-pages/users-page'
import { RolesPage } from 'pages/admins-pages/roles-page'
import { GroupsPage } from 'pages/admins-pages/groups-page'
import { SubjectsPage } from 'pages/admins-pages/subjects-page'
import { TeachersPage } from 'pages/admins-pages/teachers-page'
import { TimetablesPage } from 'pages/admins-pages/timetables-page'
import { MySubjectsPage } from 'pages/teachers-pages/my-subjects-page'
import { MyTimetablePage } from 'pages/teachers-pages/my-timetable-page'
import { UploadFilesPage } from 'pages/admins-pages/upload-files-page'
import { TimetableInfoPage } from 'pages/teachers-pages/timetable-info-page'
import { TimetablesMistakesPage } from 'pages/admins-pages/timetables-mistakes-page'
import { useTypedSelector } from 'redux-store/hooks'
import { selectUserRoles, selectUser } from 'redux-store/reducers/user.slice'
import { AdminPaths, Paths, TeacherPaths } from 'routes/paths'
import { useIsAdminExistQuery } from 'api/auth.api'
import { isAdmin } from 'types/user.types'

export const Router: VFC = () => {
  const userRoles = useTypedSelector(selectUserRoles)
  const user = useTypedSelector(selectUser)

  const { data, isLoading } = useIsAdminExistQuery()

  return (
    <Routes>
      <Route path={Paths.main}>
        {!user ? (
          <Route path="*" element={<Loader />} />
        ) : isAdmin(userRoles) ? (
          <Route path={AdminPaths.admin} element={<Layout />}>
            <Route index element={<GreetingPage userType="admin" />} />
            <Route path={AdminPaths.users} element={<UsersPage />} />
            <Route path={AdminPaths.roles} element={<RolesPage />} />
            <Route path={AdminPaths.teachers} element={<TeachersPage />} />
            <Route path={AdminPaths.subjects} element={<SubjectsPage />} />
            <Route path={AdminPaths.groups} element={<GroupsPage />} />
            <Route path={AdminPaths.timetables} element={<TimetablesPage />} />
            <Route path={AdminPaths.timetablesMistakes} element={<TimetablesMistakesPage />} />
            <Route path={AdminPaths.uploadFiles} element={<UploadFilesPage />} />
            <Route path={TeacherPaths.myTimetable} element={<MyTimetablePage />} />
            <Route
              path={`${TeacherPaths.timetableInfo}/:teacher_id`}
              element={<TimetableInfoPage />}
            />
            <Route path={TeacherPaths.mySubjects} element={<MySubjectsPage />} />
          </Route>
        ) : (
          <Route path={TeacherPaths.teacher} element={<Layout />}>
            <Route index element={<GreetingPage userType="teacher" />} />
            <Route path={TeacherPaths.myTimetable} element={<MyTimetablePage />} />
            <Route
              path={`${TeacherPaths.timetableInfo}/:teacher_id`}
              element={<TimetableInfoPage />}
            />
            <Route path={TeacherPaths.mySubjects} element={<MySubjectsPage />} />
          </Route>
        )}
      </Route>
      <Route path={Paths.auth} element={<AuthPage />} />

      {!data?.isAdminExist && !isLoading && (
        <Route path={Paths.signupAdmin} element={<AuthPage signup />} />
      )}
      <Route path="*" element={<Navigate to={Paths.main} />} />
    </Routes>
  )
}
