import { Layout } from 'components/layout'
import { Loader } from 'components/loader'
import { AdminPage } from 'pages/admins-pages/admin-page'
import { AuthPage } from 'pages/auth-page'
import { MySubjects } from 'pages/teachers-pages/my-subjects'
import { MyTimetable } from 'pages/teachers-pages/my-timetable'
import { TimetableInfo } from 'pages/teachers-pages/timetable-info'
import { VFC } from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import { useTypedSelector } from 'redux-store/hooks'
import { selectUserRoles, selectUser } from 'redux-store/reducers/user.slice'
import { AdminPaths, Paths, TeacherPaths } from 'routes/paths'
import { isAdmin } from 'types/user.types'

export interface RouterProps {}

export const Router: VFC<RouterProps> = ({}) => {
  const userRoles = useTypedSelector(selectUserRoles)
  const user = useTypedSelector(selectUser)

  return (
    <Routes>
      <Route path={Paths.main} element={<Outlet />}>
        {!user ? (
          <Route path="*" element={<Loader />} />
        ) : isAdmin(userRoles) ? (
          <Route path={AdminPaths.admin} element={<Layout />}>
            <Route path={AdminPaths.admin} element={<AdminPage />} />
            <Route path="*" element={<AdminPage />} />
          </Route>
        ) : (
          <Route path={TeacherPaths.teacher} element={<Layout />}>
            <Route path={TeacherPaths.myTimetable} element={<MyTimetable />} />
            <Route path={`${TeacherPaths.timetableInfo}/:teacher_id`} element={<TimetableInfo />} />
            <Route path={TeacherPaths.mySubjects} element={<MySubjects />} />
            <Route path="*" element={<MyTimetable />} />
          </Route>
        )}
      </Route>
      <Route path={Paths.auth} element={<AuthPage />} />
      <Route path="*" element={<div>404 Эта страница не существует</div>} />
    </Routes>
  )
}
