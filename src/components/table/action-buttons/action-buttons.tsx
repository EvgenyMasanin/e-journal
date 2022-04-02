import { Button } from '@chakra-ui/react'
import { MouseEventHandler, useCallback, useEffect, useState, VFC } from 'react'
import { useFormReset } from '../hooks/useFormReset'
import { useTableActionButtonsContext } from '../hooks/useTableActionButtonsContext'
import { useValidationErrors } from '../hooks/useValidationErrors'
import { TablePopover } from '../table-popover'

export interface ActionButtonsProps {
  rowNumber: number
  isEdit: boolean
  dataId: number
  setIsEdit: (isEdit: boolean) => void
}

export const ActionButtons: VFC<ActionButtonsProps> = ({
  isEdit,
  setIsEdit,
  dataId,
  rowNumber,
}) => {
  const { editingRow, setEditingRow, onRowDelete } = useTableActionButtonsContext()

  const { errors } = useValidationErrors()

  const reset = useFormReset()

  const toggleEditMode = useCallback(() => {
    setIsEdit(!isEdit)
    setEditingRow(isEdit ? null : rowNumber)
  }, [isEdit, rowNumber, setIsEdit, setEditingRow])

  const [isSubmitted, setIsSubmitted] = useState(false)

  const onSubmit = () => {
    setIsSubmitted(true)
  }

  useEffect(() => {
    if (!isSubmitted) return
    setIsSubmitted(false)
    if (Object.keys(errors).length !== 0) return
    if (!isEdit) return

    toggleEditMode()
    setTimeout(() => reset())
  }, [isSubmitted, errors, isEdit, toggleEditMode, reset])

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    reset()
    toggleEditMode()
  }

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    onRowDelete(dataId)
  }

  const isDisabledButtons = editingRow !== null && rowNumber !== editingRow

  return (
    <>
      {isEdit ? (
        <>
          <Button type={'submit'} variant="ghost" colorScheme="green" onClick={onSubmit}>
            подтвердить
          </Button>
          <Button type="button" variant="ghost" colorScheme="red" onClick={handleCancel}>
            отмена
          </Button>
        </>
      ) : (
        <>
          <Button
            type="button"
            variant="ghost"
            colorScheme="green"
            onClick={toggleEditMode}
            disabled={isDisabledButtons}
          >
            изменить
          </Button>
          <TablePopover
            message="Вы действительно хотите удалить текущую запись?"
            onOk={handleDelete}
          >
            <Button type="button" variant="ghost" colorScheme="red" disabled={isDisabledButtons}>
              удалить
            </Button>
          </TablePopover>
        </>
      )}
    </>
  )
}
