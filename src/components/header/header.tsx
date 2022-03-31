import { VFC } from 'react'
import {
  Flex,
  Button,
  Icon,
  useColorModeValue,
  Center,
  HStack,
  Spacer,
  Text,
  Heading,
} from '@chakra-ui/react'
import { FaSignOutAlt } from 'react-icons/fa'
import { IoIosJournal } from 'react-icons/io'
import { ColorModeSwitcher } from 'components/color-mode-switcher'
import { Link, useLocation } from 'react-router-dom'
import { useHoverColor } from 'hooks/useHoverColor'
import { useActions } from 'redux-store/hooks'

const Header: VFC = () => {
  const color = useColorModeValue('black', 'teal.200')

  const { color: hoverColor } = useHoverColor()
  const location = useLocation()

  const isAuthPAge = location.pathname === '/auth'

  const { logOut } = useActions()

  const handleClick = () => {
    logOut()
  }

  return (
    <Flex>
      <Center>
        <Heading display="flex" alignItems="center" fontSize="4xl">
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Icon as={IoIosJournal} color={color} marginRight="10px" />
            <Text _hover={{ textDecoration: 'none', color: hoverColor }}>Электронный журнал</Text>
          </Link>
        </Heading>
      </Center>
      <Spacer />

      <HStack spacing="3">
        <Center>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Center>
        {!isAuthPAge && (
          <Center w="100px">
            <Button colorScheme="teal" size="md" leftIcon={<FaSignOutAlt />} onClick={handleClick}>
              Выйти
            </Button>
          </Center>
        )}
      </HStack>
    </Flex>
  )
}

export default Header
