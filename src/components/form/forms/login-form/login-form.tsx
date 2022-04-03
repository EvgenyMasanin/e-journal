import {
  Box,
  Button,
  Center,
  chakra,
  Heading,
  HTMLChakraProps,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { PasswordField } from '../../form-components/controls/password-field'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from 'services/authService'
import { Logo } from 'components/layout/logo'
import { InputField } from '../../form-components/controls/input-field'
import { useAuthFormSchemaResolver } from '../schemes'

export interface LoginFormFields {
  email: string
  password: string
}

export const LoginForm = (props: HTMLChakraProps<'form'>) => {
  const resolver = useAuthFormSchemaResolver()

  const [login, { isLoading }] = useLoginMutation()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<LoginFormFields>({ resolver })

  const onSubmit = async (fields: LoginFormFields) => {
    console.log('🚀 ~ onSubmit ~ fields', fields)
    login(fields)
      .unwrap()
      .then((data) => {
        console.log('logged in ', data)
        reset()
      })
      .catch((error) => {
        console.log('error ', error)
      })
  }

  const handleForgotPassword = () => {
    console.log('forgot password')
  }

  return (
    <Center>
      <Box
        width="md"
        p={8}
        rounded={'lg'}
        boxShadow={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
      >
        <Center mb="4">
          <Logo textFontSize="3xl" />
        </Center>
        <Heading textAlign="center" mb={4} fontSize="3xl">
          Войти в аккаунт
        </Heading>
        <chakra.form onSubmit={handleSubmit(onSubmit)} {...props}>
          <Stack spacing="6">
            <InputField
              label="Адрес электронной почты"
              autoComplete="email"
              {...register('email')}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <PasswordField
              label="Пароль"
              forgotPasswordLabel="Забыли пароль?"
              onForgotPassword={handleForgotPassword}
              {...register('password')}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
            <Button type="submit" colorScheme="teal" size="lg" fontSize="md" isLoading={isLoading}>
              Войти
            </Button>
          </Stack>
        </chakra.form>
      </Box>
    </Center>
  )
}
