import {
  Box,
  Center,
  Heading,
  Stack,
  useColorModeValue,
  chakra,
  Button,
  HTMLChakraProps,
  useToast,
} from '@chakra-ui/react'
import { useLazyIsAdminExistQuery, useSignupAdminMutation } from 'api/auth.api'
import { InputField, PasswordField } from 'components/form/form-components'
import { Logo } from 'components/layout/logo'
import { VFC } from 'react'
import { useForm } from 'react-hook-form'
import { useSignupAdminFormSchemaResolver } from '../schemes'

export interface SignupAdminFormFields {
  email: string
  password: string
  confirmPassword: string
}

export const SignupAdminForm: VFC<HTMLChakraProps<'form'>> = (props) => {
  const resolver = useSignupAdminFormSchemaResolver()

  const [refetch] = useLazyIsAdminExistQuery()

  const [signupAdmin, { isLoading }] = useSignupAdminMutation()

  const toast = useToast()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<SignupAdminFormFields>({ resolver })

  const onSubmit = async ({ email, password }: SignupAdminFormFields) => {
    try {
      await signupAdmin({ email, password }).unwrap()
      refetch()
      reset()
    } catch (error) {
      toast({
        title: 'Эта почта уже занята!',
        status: 'error',
        variant: 'subtle',
        isClosable: true,
      })
    }
  }

  return (
    <Center>
      <Box
        width="lg"
        p={8}
        rounded={'lg'}
        boxShadow={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
      >
        <Center mb="4">
          <Logo textFontSize="3xl" />
        </Center>
        <Heading textAlign="center" mb={4} fontSize="xl">
          Вы совершили первый вход в систему.
        </Heading>
        <Heading textAlign="center" mb={4} fontSize="xl">
          Для продолжения работы необходимо зарегистрироваться в качестве администратора.
        </Heading>
        <chakra.form onSubmit={handleSubmit(onSubmit)} {...props}>
          <Stack spacing="6">
            <InputField
              label="Адрес электронной почты"
              {...register('email')}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <PasswordField
              autoComplete="new-password"
              label="Пароль"
              {...register('password')}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
            <PasswordField
              autoComplete="new-password"
              label="Подтвердите пароль"
              {...register('confirmPassword')}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
            />
            <Button type="submit" colorScheme="teal" size="lg" fontSize="md" isLoading={isLoading}>
              Зарегистрироваться
            </Button>
          </Stack>
        </chakra.form>
      </Box>
    </Center>
  )
}
