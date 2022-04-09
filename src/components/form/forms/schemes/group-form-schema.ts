import { useYupValidationResolver } from 'hooks/useYupValidationResolver'
import { number, object, string } from 'yup'
import { ErrorMessages } from './error-messages'

const groupSchema = object().shape({
  name: string().required(ErrorMessages.required),
  subGroupsCount: string().required(ErrorMessages.required),
})

export const useGroupSchemaResolver = (mapper?: (data: any) => any) =>
  useYupValidationResolver(groupSchema, mapper)
