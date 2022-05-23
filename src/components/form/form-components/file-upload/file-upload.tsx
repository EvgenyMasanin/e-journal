import { DragEventHandler, forwardRef, MouseEventHandler } from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  useMergeRefs,
} from '@chakra-ui/react'
import { useDropZoneFileInput } from './hooks'
import { FileList } from './file-list'
import { DropZone } from './drop-zone'
import { UseFormWatch } from 'react-hook-form'

export interface FileUploadProps extends InputProps {
  handleDrop: DragEventHandler<HTMLDivElement>
  label: string
  errorMessage?: string
  onDropValidators?: Array<(files: File[]) => boolean>
  isSubmitSuccessful: boolean
  watch: UseFormWatch<Record<string, unknown>>
  onFileDelete?: (fileToDelete: File) => void
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      handleDrop,
      placeholder,
      label,
      isInvalid,
      errorMessage,
      onDropValidators: onDropValidate,
      onFileDelete,
      multiple,
      watch,
      isSubmitSuccessful,
      name,
      ...props
    },
    ref
  ) => {
    const { fileInputRef, files, handleChange, handleFileDelete, ...dropZoneProps } =
      useDropZoneFileInput({
        handleDrop,
        onDropValidators: onDropValidate,
        onFileDelete,
        onChange: props.onChange,
        isSubmitSuccessful,
        watch,
        name,
      })

    const mergedRef = useMergeRefs(fileInputRef, ref)

    const preventFormLabelClick: MouseEventHandler<HTMLLabelElement> = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }

    return (
      <>
        <FormControl isInvalid={isInvalid}>
          <FormLabel onClick={preventFormLabelClick} fontSize="xl">
            {label}
          </FormLabel>
          <DropZone isInvalid={isInvalid} placeholder={placeholder} {...dropZoneProps}>
            <Input
              ref={mergedRef}
              type="file"
              display="none"
              accept=".xlsx, .xls, .xlsm"
              multiple={multiple}
              name={name}
              {...props}
              onChange={handleChange}
            />
          </DropZone>
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
        <FileList files={files} onFileDelete={handleFileDelete} />
      </>
    )
  }
)

FileUpload.displayName = 'FileUpload'
