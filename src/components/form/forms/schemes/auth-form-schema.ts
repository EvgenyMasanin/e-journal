import { useYupValidationResolver } from 'hooks/useYupValidationResolver'
import * as yup from 'yup'
import { ErrorMessages } from './error-messages'

const authFormSchema = yup.object().shape({
  email: yup.string().email(ErrorMessages.email).required(ErrorMessages.required),
  password: yup
    .string()
    .min(8, `${ErrorMessages.passwordMin} 8 символов`)
    .required(ErrorMessages.required),
})

export const useAuthFormSchemaResolver = () => useYupValidationResolver(authFormSchema)
