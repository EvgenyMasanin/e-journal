import { FC } from 'react'
import { Flex, FlexProps, Icon, useColorModeValue } from '@chakra-ui/react'
import { Link, useMatch } from 'react-router-dom'
import { IconType } from 'react-icons'
import { useHoverColor } from 'hooks/useHoverColor'
import { AdminPaths, AllPaths, TeacherPaths } from 'routes'
import { useTypedSelector } from 'redux-store/hooks'
import { selectUserRoles } from 'redux-store/reducers/user.slice'
import { isAdmin } from 'types/user.types'

export interface NavItemProps extends FlexProps {
  path: AllPaths
  text?: string
  icon?: IconType
}

export const NavItem: FC<NavItemProps> = ({ icon, path, text, children, ...rest }) => {
  const hoverEffect = useHoverColor()

  const iconHoverColor = useColorModeValue('gray.900', 'white')

  const userRoles = useTypedSelector(selectUserRoles)

  const parentPath = isAdmin(userRoles) ? AdminPaths.admin : TeacherPaths.teacher

  const match = useMatch(`${parentPath}/${path}`)

  return (
    <Link to={path}>
      <Flex
        align="center"
        p="4"
        mx="4"
        my="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        fontSize="18"
        {...(match && hoverEffect)}
        _hover={hoverEffect}
        {...rest}
      >
        {icon && <Icon mr="4" color={iconHoverColor} as={icon} />}
        {text || children}
      </Flex>
    </Link>
  )
}
