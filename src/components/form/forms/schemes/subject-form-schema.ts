import { object, string } from 'yup'
import { useYupValidationResolver } from 'hooks/useYupValidationResolver'
import { ErrorMessages } from './error-messages'

const subjectSchema = object().shape({
  name: string().required(ErrorMessages.required),
})

export const useSubjectSchemaResolver = () => useYupValidationResolver(subjectSchema)
