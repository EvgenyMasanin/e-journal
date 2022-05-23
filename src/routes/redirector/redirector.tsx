import { useEffect, VFC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTypedSelector } from 'redux-store/hooks'
import { selectUser, selectUserRoles } from 'redux-store/reducers/user.slice'
import { Paths } from 'routes'
import { AdminPaths, TeacherPaths } from 'routes/paths'
import { useAuthQuery, useIsAdminExistQuery } from 'api/auth.api'
import { isAdmin } from 'types/user.types'

export const Redirector: VFC = () => {
  useAuthQuery()

  const { data, isLoading } = useIsAdminExistQuery()

  const {
    isAuthorized,
    tokens: { refreshToken },
  } = useTypedSelector((state) => state.user)

  const user = useTypedSelector(selectUser)

  const roles = useTypedSelector(selectUserRoles)

  const navigator = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (isLoading) return
    if (!data?.isAdminExist && !isLoading) {
      return navigator(Paths.signupAdmin)
    }

    if (pathname === Paths.auth) return

    if (refreshToken) return

    navigator(Paths.auth)
  }, [pathname, refreshToken, navigator, data, isLoading])

  useEffect(() => {
    if (!data?.isAdminExist) return
    if (isAuthorized && (pathname === Paths.auth || pathname === Paths.signupAdmin)) {
      navigator(Paths.main)
    }
  }, [isAuthorized, navigator, pathname, data])

  useEffect(() => {
    if (!data?.isAdminExist) return
    if (isAuthorized && pathname === Paths.main && user) {
      navigator(isAdmin(roles) ? AdminPaths.admin : TeacherPaths.teacher)
    }
  }, [isAuthorized, navigator, pathname, roles, user, isLoading, data])

  return null
}
