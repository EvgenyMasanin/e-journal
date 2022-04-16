import { useYupValidationResolver } from 'hooks/useYupValidationResolver'
import { mixed, object } from 'yup'
import { ErrorMessages } from './error-messages'

const fileUploadSchema = object().shape({
  fileWithPayload: mixed().test(
    'required',
    ErrorMessages.fileRequired,
    (value: FileList) => value && value.length === 1
  ),
  filesWithTimetables: mixed().test(
    'required',
    ErrorMessages.fileRequired,
    (value: FileList) => value && value.length > 0
  ),
})

export const useFileUploadSchemaResolver = () => useYupValidationResolver(fileUploadSchema)
