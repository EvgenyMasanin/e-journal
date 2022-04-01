import { Box, Center } from '@chakra-ui/react'
import { LoginForm } from 'components/form'
import { VFC } from 'react'

export interface AuthPageProps {}

export const AuthPage: VFC<AuthPageProps> = ({}) => {
  return (
    <Center className="qwerty" h="full">
      <LoginForm />
    </Center>
  )
}