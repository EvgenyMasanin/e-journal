import { DragEventHandler, FC, MouseEventHandler } from 'react'
import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import { useHoverColor } from 'hooks/useHoverColor'

export interface DropZoneProps {
  isInvalid: boolean
  highlight: boolean
  placeholder: string
  onDragOver: DragEventHandler<HTMLDivElement>
  onDragLeave: DragEventHandler<HTMLDivElement>
  onDrop: DragEventHandler<HTMLDivElement>
  openFileDialog: MouseEventHandler<HTMLDivElement>
}

export const DropZone: FC<DropZoneProps> = ({
  isInvalid,
  highlight,
  placeholder,
  onDrop,
  onDragOver,
  onDragLeave,
  openFileDialog,
  children,
}) => {
  const hoverColor = useHoverColor()

  const errorBrColor = useColorModeValue('red.500', 'red.300')
  const defaultBrColor = useColorModeValue('black', 'whiteAlpha.900')

  const borderColor = isInvalid ? errorBrColor : defaultBrColor

  return (
    <Box
      p={4}
      borderWidth={2}
      borderStyle="dashed"
      borderRadius="lg"
      cursor="pointer"
      fontSize="x-large"
      fontWeight="bold"
      borderColor={borderColor}
      color={highlight && hoverColor.color}
      bgColor={highlight && hoverColor.bgColor}
      _hover={hoverColor}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      {...{ onDrop }}
      onClick={openFileDialog}
    >
      <Text textAlign="center">{placeholder}</Text>

      {children}
    </Box>
  )
}
