import { DragEventHandler, useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useFileUploadSchemaResolver } from 'components/form/forms/schemes/file-upload-form-schema'
import { excelFormatFilter } from 'utils/excel-format-filter'

export type HandleDrop = (field: keyof FileUploadFormFields) => DragEventHandler<HTMLDivElement>

export interface FileUploadFormFields {
  fileWithPayload: FileList
  filesWithTimetables: FileList
}

const validateFileType = (files: File[]) => files.filter(excelFormatFilter).length === files.length

const validateFileCount = (files: File[]) => files.length === 1

export const useFileUploadForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitSuccessful },
    watch,
    reset,
  } = useForm<FileUploadFormFields>({ resolver: useFileUploadSchemaResolver() })

  const handleDrop: HandleDrop = useCallback(
    (field) => (event) => {
      const files = event.dataTransfer.files
      setValue(field, files)
    },
    [setValue]
  )

  const onDropValidate = useCallback(
    (field: keyof FileUploadFormFields, validator: (files: File[]) => boolean, message: string) =>
      (files: File[]) => {
        const isAccept = validator(files)

        if (!isAccept) {
          if (getValues(field).length === 0) {
            setError(field, { message })
          }
          return false
        }
        clearErrors(field)
        return true
      },
    [getValues, setError, clearErrors]
  )

  const fileWithPayloadValidators = useMemo(
    () => [
      onDropValidate(
        'fileWithPayload',
        validateFileType,
        'Загрузите файл с расширением xlsx или xls!'
      ),
      onDropValidate('fileWithPayload', validateFileCount, 'Загрузите только один файл!'),
    ],
    [onDropValidate]
  )

  const filesWithTimetablesValidators = useMemo(
    () => [
      onDropValidate(
        'filesWithTimetables',
        validateFileType,
        'Загрузите файлы с расширением xlsx или xls!'
      ),
    ],
    [onDropValidate]
  )

  const deleteFile = useCallback(
    (field: keyof FileUploadFormFields) => (fileToDelete: File) => {
      const files = getValues(field)

      const filteredFiles = new DataTransfer()
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i)
        if (file.name !== fileToDelete.name) {
          filteredFiles.items.add(file)
        }
      }
      setValue(field, filteredFiles.files)
    },
    [getValues, setValue]
  )

  return useMemo(
    () => ({
      register,
      handleSubmit,
      isSubmitSuccessful,
      errors,
      handleDrop,
      fileWithPayloadValidators,
      filesWithTimetablesValidators,
      deleteFile,
      reset,
      watch,
    }),
    [
      errors,
      fileWithPayloadValidators,
      filesWithTimetablesValidators,
      deleteFile,
      isSubmitSuccessful,
      watch,
      handleDrop,
      handleSubmit,
      register,
      reset,
    ]
  )
}
