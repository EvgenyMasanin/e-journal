import { VFC } from 'react'
import { Box, BoxProps, CloseButton, Flex, useColorModeValue, VStack } from '@chakra-ui/react'
import { LinkLogo } from '../logo'
import { NavItem } from '../nav-item'
import { adminLinks, teacherLinks } from './link-items'
import { useTypedSelector } from 'redux-store/hooks'
import { selectUserRoles } from 'redux-store/reducers/user.slice'
import { isAdmin } from 'types/user.types'

export interface SidebarProps extends BoxProps {
  onClose: () => void
}

export const Sidebar: VFC<SidebarProps> = ({ onClose, ...rest }) => {
  const roles = useTypedSelector(selectUserRoles)

  const links = isAdmin(roles) ? [...adminLinks, ...teacherLinks] : teacherLinks

  return (
    <Box
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: '60' }}
      overflow="auto"
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <LinkLogo />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Flex direction="column" gap={2} px={4} mb={2} onClick={onClose}>
        {links.map(({ icon, name, path }) => (
          <NavItem key={name} icon={icon} path={path} text={name} />
        ))}
      </Flex>
    </Box>
  )
}
