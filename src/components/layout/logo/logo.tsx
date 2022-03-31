import { Heading, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { useHoverColor } from 'hooks/useHoverColor'
import { VFC } from 'react'
import { IoIosJournal } from 'react-icons/io'
import { Link } from 'react-router-dom'

export interface LogoProps {
  iconFontSize?: string
  textFontSize?: string
}

export const Logo: VFC<LogoProps> = ({ iconFontSize = '4xl', textFontSize = 'xl' }) => {
  const color = useColorModeValue('black', 'teal.200')
  const { color: hoverColor } = useHoverColor()

  return (
    <Heading fontSize={iconFontSize} _hover={{ color: hoverColor }}>
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Icon as={IoIosJournal} color={color} marginRight="10px" />
        <Text fontSize={textFontSize}>Электронный журнал</Text>
      </Link>
    </Heading>
  )
}
