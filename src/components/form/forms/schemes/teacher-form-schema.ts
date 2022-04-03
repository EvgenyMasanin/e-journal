import { useYupValidationResolver } from 'hooks/useYupValidationResolver'
import * as yup from 'yup'
import { ErrorMessages } from './error-messages'

const teacherFormSchema = yup.object().shape({
  name: yup.string().min(3, `${ErrorMessages.min} 3 символа`).required(ErrorMessages.required),
  fullName: yup.string().min(3, `${ErrorMessages.min} 3 символа`).required(ErrorMessages.required),
  position: yup.string().required(ErrorMessages.required),
  fullPosition: yup.string().required(ErrorMessages.required),
})

export const useTeacherFormSchemaResolver = () => useYupValidationResolver(teacherFormSchema)
