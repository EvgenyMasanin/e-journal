import { Heading, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { useHoverColor } from 'hooks/useHoverColor'
import { VFC } from 'react'
import { IoIosJournal } from 'react-icons/io'
import { Link as RouterLink } from 'react-router-dom'

export interface LogoProps {
  iconFontSize?: string
  textFontSize?: string
}

export const Logo: VFC<LogoProps> = ({ iconFontSize = '4xl', textFontSize = 'xl' }) => {
  const color = useColorModeValue('black', 'teal.200')

  return (
    <Heading fontSize={iconFontSize} display="flex" alignItems="center">
      <Icon as={IoIosJournal} color={color} marginRight="10px" />
      <Text fontSize={['md', 'lg', textFontSize]}>Электронный журнал</Text>
    </Heading>
  )
}

export const LinkLogo: VFC<LogoProps> = (props) => {
  const { color } = useHoverColor()

  return (
    <Link as={RouterLink} to="/" _hover={{ color }} _focus={{}}>
      <Logo {...props} />
    </Link>
  )
}
