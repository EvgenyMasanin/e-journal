import { useYupValidationResolver } from 'hooks/useYupValidationResolver'
import { object, ref, string } from 'yup'
import { ErrorMessages } from './error-messages'

const signupAdminFormSchema = object().shape({
  email: string().email(ErrorMessages.email).required(ErrorMessages.required),
  password: string()
    .min(8, `${ErrorMessages.passwordMin} 8 символов`)
    .required(ErrorMessages.required),
  confirmPassword: string()
    .oneOf([ref('password'), null], ErrorMessages.passwordMatch)
    .required(ErrorMessages.required),
})

export const useSignupAdminFormSchemaResolver = () =>
  useYupValidationResolver(signupAdminFormSchema)
