import {
  ChangeEventHandler,
  DragEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { fileListToArray } from 'utils/fileListToArray'

export interface UseDropZoneFileInput {
  handleDrop: DragEventHandler<HTMLDivElement>
  onChange: ChangeEventHandler<HTMLInputElement>
  onDropValidators?: Array<(files: File[]) => boolean>
  onFileDelete?: (fileToDelete: File) => void
}

export const useDropZoneFileInput = ({
  handleDrop,
  onChange,
  onDropValidators: onDropValidate,
  onFileDelete,
}: UseDropZoneFileInput) => {
  const [highlight, setHighlight] = useState(false)

  const [files, setFiles] = useState<File[]>([])

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

      setFiles(fileListToArray(fileList))
      handleDrop(e)
    },
    [handleDrop, onDropValidate]
  )

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const fileList = e.target.files
    if (!fileList) return

    setFiles(fileListToArray(fileList))
    onChange(e)
  }

  const handleFileDelete = (file: File) => () => {
    onFileDelete(file)

    setFiles((files) => files.filter((f) => f.name !== file.name))
  }

  return useMemo(
    () => ({
      fileInputRef,
      highlight,
      files,
      handleChange,
      onDrop,
      onDragLeave,
      openFileDialog,
      onDragOver,
      handleFileDelete,
    }),
    [fileInputRef, highlight, files]
  )
}
