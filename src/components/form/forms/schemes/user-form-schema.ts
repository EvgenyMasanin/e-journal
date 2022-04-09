import { useYupValidationResolver } from 'hooks/useYupValidationResolver'
import { array, number, object, string } from 'yup'
import { ErrorMessages } from './error-messages'

const userFormSchema = object().shape({
  email: string().email(ErrorMessages.email).required(ErrorMessages.required),
  teacherId: number().required(ErrorMessages.required),
  rolesId: array().min(1).required(ErrorMessages.required).of(number()),
})

export const useUserFormSchemaResolver = (mapper?: (data: any) => any) =>
  useYupValidationResolver(userFormSchema, mapper)
