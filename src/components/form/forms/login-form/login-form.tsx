import {
  Box,
  Button,
  Center,
  chakra,
  Heading,
  HTMLChakraProps,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { PasswordField } from '../../form-components/controls/password-field'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from 'api/auth.api'
import { Logo } from 'components/layout/logo'
import { InputField } from '../../form-components/controls/input-field'
import { useAuthFormSchemaResolver } from '../schemes'
import { VFC } from 'react'

export interface LoginFormFields {
  email: string
  password: string
}

export const LoginForm: VFC<HTMLChakraProps<'form'>> = (props) => {
  const resolver = useAuthFormSchemaResolver()

  const [login, { isLoading }] = useLoginMutation()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<LoginFormFields>({ resolver })

  const toast = useToast()

  const onSubmit = async (fields: LoginFormFields) => {
    try {
      await login(fields).unwrap()
      reset()
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error', error)
      toast({
        title: 'Неверный логин или пароль',
        status: 'error',
        variant: 'subtle',
        isClosable: true,
      })
    }
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
              // forgotPasswordLabel="Забыли пароль?"
              // onForgotPassword={handleForgotPassword}
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
