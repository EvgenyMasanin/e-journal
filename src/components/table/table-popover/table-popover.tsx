/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, MouseEventHandler } from 'react'
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react'

export interface TablePopoverProps {
  message: string
  okText?: string
  cancelText?: string
  onOk?: MouseEventHandler<HTMLButtonElement>
  onCancel?: MouseEventHandler<HTMLButtonElement>
}

export const TablePopover: FC<TablePopoverProps> = ({
  message,
  okText = 'подтвердить',
  cancelText = 'отмена',
  onOk = () => {},
  onCancel = () => {},
  children,
}) => {
  const { onOpen, isOpen, onClose } = useDisclosure()

  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    onCancel(e)
    onClose()
  }

  return (
    <Popover
      returnFocusOnClose={false}
      placement="right"
      isLazy
      lazyBehavior="unmount"
      onOpen={onOpen}
      onClose={onClose}
      isOpen={isOpen}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Подтвердите действие</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>{message}</PopoverBody>
        <PopoverFooter d="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button onClick={handleCancel} variant="outline">
              {cancelText}
            </Button>
            <Button onClick={onOk} colorScheme="red">
              {okText}
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
