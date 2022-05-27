import { useIsAdminExistQuery } from 'api/auth.api'
import { Layout } from 'components/layout'
import { Loader } from 'components/loader'
import { AdminPage } from 'pages/admins-pages/admin-page'
import { GroupsPage } from 'pages/admins-pages/groups-page'
import { RolesPage } from 'pages/admins-pages/roles-page'
import { SubjectsPage } from 'pages/admins-pages/subjects-page'
import { TeachersPage } from 'pages/admins-pages/teachers-page'
import { TimetablesMistakesPage } from 'pages/admins-pages/timetables-mistakes-page'
import { TimetablesPage } from 'pages/admins-pages/timetables-page'
import { UploadFilesPage } from 'pages/admins-pages/upload-files-page'
import { UsersPage } from 'pages/admins-pages/users-page'
import { AuthPage } from 'pages/auth-page'
import { MySubjectsPage } from 'pages/teachers-pages/my-subjects-page'
import { MyTimetablePage } from 'pages/teachers-pages/my-timetable-page'
import { TimetableInfoPage } from 'pages/teachers-pages/timetable-info-page'
import { VFC } from 'react'
import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { useTypedSelector } from 'redux-store/hooks'
import { selectUserRoles, selectUser } from 'redux-store/reducers/user.slice'
import { AdminPaths, Paths, TeacherPaths } from 'routes/paths'
import { isAdmin } from 'types/user.types'

export const Router: VFC = ({}) => {
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
            <Route index element={<AdminPage />} />
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
