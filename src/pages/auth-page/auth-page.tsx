import { Center } from '@chakra-ui/react'
import { LoginForm } from 'components/form/forms/login-form'
import { SignupAdminForm } from 'components/form/forms/signup-admin-form'
import { VFC } from 'react'

export interface AuthPageProps {
  signup?: boolean
}

export const AuthPage: VFC<AuthPageProps> = ({ signup }) => {
  return (
    <Center className="qwerty" h="full">
      {signup ? <SignupAdminForm /> : <LoginForm />}
    </Center>
  )
}
