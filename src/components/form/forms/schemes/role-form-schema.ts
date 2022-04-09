import * as yup from 'yup'
import { useYupValidationResolver } from 'hooks/useYupValidationResolver'
import { ErrorMessages } from './error-messages'

const roleFormSchema = yup.object().shape({
  name: yup.string().required(ErrorMessages.required),
  description: yup.string().required(ErrorMessages.required),
})

export const useRoleFormSchemaResolver = () => useYupValidationResolver(roleFormSchema)
