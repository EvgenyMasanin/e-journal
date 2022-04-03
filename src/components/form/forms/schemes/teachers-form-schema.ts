import { useYupValidationResolver } from 'hooks/useYupValidationResolver'
import * as yup from 'yup'
import { ErrorMessages } from './error-messages'

const teachersFormSchema = yup.object().shape({
  name: yup.string().required(ErrorMessages.required),
  fullName: yup.string().required(ErrorMessages.required),
  position: yup.string().required(ErrorMessages.required),
  fullPosition: yup.string().required(ErrorMessages.required),
})

export const useTeachersFormSchemaResolver = () => useYupValidationResolver(teachersFormSchema)
