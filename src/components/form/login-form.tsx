import {
  Box,
  Button,
  Center,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HTMLChakraProps,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { PasswordField } from './controls/password-field'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useYupValidationResolver } from 'hooks/useYupValidationResolver'
import { useLoginMutation } from 'services/authService'
import { useTypedSelector } from 'redux-store/hooks'
import { useEffect } from 'react'
import { Logo } from 'components/layout/logo'

const authFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Введите корректный адрес электронной почты')
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(1, 'Пароль должен содержать хотя бы 8 символов')
    .required('Обязательное поле'),
})

export interface FormInputs {
  email: string
  password: string
}

export const LoginForm = (props: HTMLChakraProps<'form'>) => {
  const resolver = useYupValidationResolver(authFormSchema)

  const [login, { isLoading }] = useLoginMutation()

  const {
    handleSubmit,
    register,
    formState: { errors },
    setFocus,
    reset,
  } = useForm<FormInputs>({ resolver })

  const onSubmit = async (fields: FormInputs) => {
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
            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel>Адрес электронной почты</FormLabel>
              <Input id="email" autoComplete="email" {...register('email')} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <PasswordField
              {...register('password')}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
            <Button type="submit" colorScheme="teal" size="lg" fontSize="md">
              Войти
            </Button>
          </Stack>
        </chakra.form>
      </Box>
    </Center>
  )
}
