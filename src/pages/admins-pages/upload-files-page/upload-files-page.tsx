import { VFC } from 'react'
import { Box, Button, chakra, Flex, Heading, Stack } from '@chakra-ui/react'
import { SubmitHandler } from 'react-hook-form'
import { FileUpload } from 'components/form'
import { FileUploadFormFields, useFileUploadForm } from 'hooks/useFileUploadForm'

export const UploadFilesPage: VFC = () => {
  const {
    register,
    errors,
    handleSubmit,
    deleteFile,
    fileWithPayloadValidators,
    filesWithTimetablesValidators,
    handleDrop,
  } = useFileUploadForm()

  const onSubmit: SubmitHandler<FileUploadFormFields> = (e) => {
    // e.preventDefault()
    console.log('🚀 ~ e', e)
  }

  return (
    <Box maxW={800} mx="auto">
      <Heading fontSize="3xl" mb={10} textAlign="center">
        Загрузка файлов для формирования расписания
      </Heading>
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <FileUpload
            {...register('filesWithTimetables')}
            handleDrop={handleDrop('fileWithPayload')}
            onFileDelete={deleteFile('fileWithPayload')}
            isInvalid={!!errors.fileWithPayload}
            onDropValidators={fileWithPayloadValidators}
            errorMessage={errors.fileWithPayload?.message}
            label="Загрузите файл с нагрузкой"
            placeholder="Перетащите файл сюда или нажмите для выбора"
          />
          <FileUpload
            {...register('fileWithPayload')}
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
            <Button type="submit" colorScheme="teal" variant="solid" flexBasis="60%">
              Отправить
            </Button>
          </Flex>
        </Stack>
      </chakra.form>
    </Box>
  )
}
