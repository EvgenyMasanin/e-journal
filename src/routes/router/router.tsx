import { Layout } from 'components/layout'
import { AdminPage } from 'pages/admin-page'
import { AuthPage } from 'pages/auth-page'
import { Main } from 'pages/main'
import { TimetableInfo } from 'pages/timetable-info'
import { VFC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useTypedSelector } from 'redux-store/hooks'
import { selectUserRoles } from 'redux-store/reducers/user.slice'
import { AdminPaths, Paths, TeacherPaths } from 'routes/paths'
import { isAdmin } from 'types/user.types'

export interface RouterProps {}

export const Router: VFC<RouterProps> = ({}) => {
  const userRoles = useTypedSelector(selectUserRoles)

  return (
    <Routes>
      <Route path={Paths.main}>
        {isAdmin(userRoles) ? (
          <Route path={AdminPaths.admin} element={<Layout />}>
            <Route path={AdminPaths.admin} element={<AdminPage />} />
            <Route path="*" element={<AdminPage />} />
          </Route>
        ) : (
          <Route path={TeacherPaths.teacher} element={<Layout />}>
            <Route path={TeacherPaths.myTimetable} element={<Main />} />
            <Route path={`${TeacherPaths.timetableInfo}/:teacher_id`} element={<TimetableInfo />} />
            <Route path="*" element={<Main />} />
          </Route>
        )}
      </Route>
      <Route path={Paths.auth} element={<AuthPage />} />
      <Route path="*" element={<div>404 Эта страница не существует</div>} />
    </Routes>
  )
}
