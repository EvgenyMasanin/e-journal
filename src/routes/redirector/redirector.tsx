import { useEffect, VFC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTypedSelector } from 'redux-store/hooks'
import { selectUser, selectUserRoles } from 'redux-store/reducers/user.slice'
import { Paths } from 'routes'
import { AdminPaths, TeacherPaths } from 'routes/paths'
import { useAuthQuery } from 'services/authService'
import { isAdmin } from 'types/user.types'

export const Redirector: VFC = () => {
  useAuthQuery(undefined)

  const {
    isAuthorized,
    tokens: { refreshToken },
  } = useTypedSelector((state) => state.user)

  const user = useTypedSelector(selectUser)

  const roles = useTypedSelector(selectUserRoles)

  const navigator = useNavigate()
  const { pathname } = useLocation()

  // useEffect(() => {
  //   if (isAuthorized && !user) navigator(Paths.main)
  // }, [isAuthorized, user, navigator])

  useEffect(() => {
    if (pathname === Paths.auth) return

    if (refreshToken) return

    navigator(Paths.auth)
  }, [pathname, refreshToken, navigator])

  useEffect(() => {
    if (isAuthorized && pathname === Paths.auth) navigator(Paths.main)
  }, [isAuthorized, navigator, pathname])

  useEffect(() => {
    if (isAuthorized && pathname === Paths.main && user)
      navigator(isAdmin(roles) ? AdminPaths.admin : TeacherPaths.teacher)
  }, [isAuthorized, navigator, pathname, roles, user])

  return null
}
