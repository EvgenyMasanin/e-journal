import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tag,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { ColorModeSwitcher } from 'components/color-mode-switcher'
import { usePrimaryColor } from 'hooks/usePrimaryColor'
import { VFC } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { FiBell, FiChevronDown, FiMenu } from 'react-icons/fi'
import { useActions } from 'redux-store/hooks'
import { Logo } from '../logo'
import { User } from '../user'

export interface MobileNavProps extends FlexProps {
  onOpen: () => void
}

export const MobileNav: VFC<MobileNavProps> = ({ onOpen, ...rest }) => {
  const color = usePrimaryColor()

  const { logOut } = useActions()

  const handleClick = () => {
    logOut()
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="10%"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Box display={{ base: 'flex', md: 'none' }} fontSize="2xl">
        <Logo />
      </Box>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'} gap={2}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <User />
            </MenuButton>
            <MenuList borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Профиль</MenuItem>
              <MenuDivider />
              <MenuItem fontSize={18} color={color} gap={2} onClick={handleClick}>
                <FaSignOutAlt />
                <Text>Выйти</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
