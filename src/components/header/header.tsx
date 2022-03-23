import React, { VFC } from 'react'
import {
  Flex,
  Button,
  Icon,
  useColorModeValue,
  Box,
  Center,
  HStack,
  Spacer,
  Text,
  Heading,
} from '@chakra-ui/react'
import { FaSignOutAlt } from 'react-icons/fa'
import { IoIosJournal } from 'react-icons/io'
import { ColorModeSwitcher } from 'components/color-mode-switcher'
import { Link } from 'react-router-dom'
import { useHoverColor } from 'hooks/useHoverColor'

const Header: VFC = () => {
  const color = useColorModeValue('black', 'teal.200')

  const { color: hoverColor, bgColor } = useHoverColor()

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
        <Center w="100px">
          <Button colorScheme="teal" size="md" leftIcon={<FaSignOutAlt />}>
            Выйти
          </Button>
        </Center>
      </HStack>
    </Flex>
  )
}

export default Header
