import { useYupValidationResolver } from 'hooks/useYupValidationResolver'
import { array, number, object, string } from 'yup'
import { ErrorMessages } from './error-messages'

const addUserFormSchema = object().shape({
  email: string().email(ErrorMessages.email).required(ErrorMessages.required),
  password: string()
    .min(8, `${ErrorMessages.passwordMin} 8 символов`)
    .required(ErrorMessages.required),
  teacherId: number(),
  rolesId: array().min(1).required(ErrorMessages.required).of(number()),
})

const userFormSchema = object().shape({
  email: string().email(ErrorMessages.email).required(ErrorMessages.required),
  password: string()
    .min(8, `${ErrorMessages.passwordMin} 8 символов`),
  teacherId: number(),
  rolesId: array().min(1).required(ErrorMessages.required).of(number()),
})

export const useAddUserFormSchemaResolver = (mapper?: (data: any) => any) =>
  useYupValidationResolver(addUserFormSchema, mapper)

  export const useUserFormSchemaResolver = (mapper?: (data: any) => any) =>
  useYupValidationResolver(userFormSchema, mapper)
