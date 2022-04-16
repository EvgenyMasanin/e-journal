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

export interface FileUploadProps extends InputProps {
  handleDrop: DragEventHandler<HTMLDivElement>
  label: string
  errorMessage?: string
  onDropValidators?: Array<(files: File[]) => boolean>
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
