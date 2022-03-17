import React, { VFC } from 'react'
import { Flex, Button, Icon, useColorModeValue } from '@chakra-ui/react'
import { FaSignOutAlt } from 'react-icons/fa'
import { IoIosJournal } from 'react-icons/io'
import { Box, Center, HStack, Spacer, Text } from '@chakra-ui/layout'
import { ColorModeSwitcher } from 'components/color-mode-switcher'

const Header: VFC = () => {
  const color = useColorModeValue('black', 'teal.200')

  return (
    <Box padding="1rem" minH="12vh">
      <Flex>
        <Center>
          <Text as="span" display="flex" alignItems="center" fontSize="4xl">
            <Icon as={IoIosJournal} color={color} marginRight="10px" />
            Электронный журнал
          </Text>
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
    </Box>
  )
}

export default Header
