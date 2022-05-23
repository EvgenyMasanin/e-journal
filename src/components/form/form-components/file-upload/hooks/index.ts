import {
  ChangeEventHandler,
  DragEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { UseFormWatch } from 'react-hook-form'
import { fileListToArray } from 'utils/fileListToArray'

export interface UseDropZoneFileInput {
  handleDrop: DragEventHandler<HTMLDivElement>
  onChange: ChangeEventHandler<HTMLInputElement>
  onDropValidators?: Array<(files: File[]) => boolean>
  isSubmitSuccessful: boolean
  watch: UseFormWatch<Record<string, unknown>>
  name: string
  onFileDelete?: (fileToDelete: File) => void
}

export const useDropZoneFileInput = ({
  handleDrop,
  onChange,
  onFileDelete,
  isSubmitSuccessful,
  watch,
  name,
  onDropValidators: onDropValidate,
}: UseDropZoneFileInput) => {
  const [highlight, setHighlight] = useState(false)

  const [files, setFiles] = useState<File[]>([])

  const filesState = watch(name)

  useEffect(() => {
    setFiles(fileListToArray(filesState as FileList))
  }, [filesState])

  useEffect(() => {
    if (!isSubmitSuccessful) return
    setFiles([])
  }, [isSubmitSuccessful])

  const fileInputRef = useRef<HTMLInputElement>(null)

  const openFileDialog: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    e.stopPropagation()
    fileInputRef.current.click()
  }, [])

  const onDragOver: DragEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault()
    setHighlight(true)
  }, [])

  const onDragLeave: DragEventHandler<HTMLDivElement> = useCallback((e) => {
    e.preventDefault()
    setHighlight(false)
  }, [])

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault()
      setHighlight(false)

      const fileList = e.dataTransfer.files
      const filesArray = fileListToArray(fileList)
      if (!filesArray) return

      const isAccept = onDropValidate.every((validator) => validator(filesArray))

      if (!isAccept) return

      handleDrop(e)
    },
    [handleDrop, onDropValidate]
  )

  const handleFileDelete = useCallback(
    (file: File) => () => {
      onFileDelete(file)
    },
    [onFileDelete]
  )

  return useMemo(
    () => ({
      fileInputRef,
      highlight,
      files,
      handleChange: onChange,
      onDrop,
      onDragLeave,
      openFileDialog,
      onDragOver,
      handleFileDelete,
    }),
    [
      fileInputRef,
      highlight,
      files,
      onChange,
      onDrop,
      onDragLeave,
      openFileDialog,
      onDragOver,
      handleFileDelete,
    ]
  )
}
