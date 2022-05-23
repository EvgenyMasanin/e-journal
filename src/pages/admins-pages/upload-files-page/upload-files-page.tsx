import { useRef, VFC } from 'react'
import { Box, Button, chakra, Flex, Heading, Stack } from '@chakra-ui/react'
import { SubmitHandler } from 'react-hook-form'
import { FileUpload } from 'components/form'
import { FileUploadFormFields, useFileUploadForm } from 'hooks/useFileUploadForm'
import { useSendFilesMutation } from 'api/files.api'

export const UploadFilesPage: VFC = () => {
  const {
    register,
    isSubmitSuccessful,
    errors,
    handleSubmit,
    deleteFile,
    fileWithPayloadValidators,
    filesWithTimetablesValidators,
    handleDrop,
    reset,
    watch,
  } = useFileUploadForm()

  const [sendFiles, { isLoading, error }] = useSendFilesMutation()
  console.log('🚀 ~ error', error)

  const onSubmit: SubmitHandler<FileUploadFormFields> = async (e) => {
    // e.preventDefault()

    const formData = new FormData()
    formData.append('fileWithPayload', e.fileWithPayload[0])
    Array.from(e.filesWithTimetables).forEach((file) => {
      formData.append(file.name, file)
    })

    try {
      const res = await sendFiles(formData).unwrap()
      console.log('🚀 ~ res', res)
      reset()
      return true
    } catch (error) {
      console.log('🚀 ~ err', error)
      return false
    }
  }

  const formRef = useRef<HTMLFormElement>(null)
  return (
    <Box maxW={800} mx="auto">
      <Heading fontSize="3xl" mb={10} textAlign="center">
        Загрузка файлов для формирования расписания
      </Heading>
      <chakra.form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <FileUpload
            {...register('fileWithPayload')}
            watch={watch}
            isSubmitSuccessful={isSubmitSuccessful}
            handleDrop={handleDrop('fileWithPayload')}
            onFileDelete={deleteFile('fileWithPayload')}
            isInvalid={!!errors.fileWithPayload}
            onDropValidators={fileWithPayloadValidators}
            errorMessage={errors.fileWithPayload?.message}
            label="Загрузите файл с нагрузкой"
            placeholder="Перетащите файл сюда или нажмите для выбора"
          />
          <FileUpload
            {...register('filesWithTimetables')}
            watch={watch}
            isSubmitSuccessful={isSubmitSuccessful}
            handleDrop={handleDrop('filesWithTimetables')}
            onFileDelete={deleteFile('filesWithTimetables')}
            isInvalid={!!errors.filesWithTimetables}
            onDropValidators={filesWithTimetablesValidators}
            errorMessage={errors.filesWithTimetables?.message}
            multiple
            label="Загрузите файлы с расписанием"
            placeholder="Перетащите файлы сюда или нажмите для выбора"
          />
          <Flex justifyContent="center">
            <Button
              type="submit"
              colorScheme="teal"
              variant="solid"
              flexBasis="60%"
              isLoading={isLoading}
            >
              Отправить
            </Button>
          </Flex>
        </Stack>
      </chakra.form>
    </Box>
  )
}
