import { VFC } from 'react'
import { Flex, IconButton, List, ListIcon, ListItem } from '@chakra-ui/react'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { IoIosClose } from 'react-icons/io'

export interface FileListProps {
  files: File[]
  onFileDelete: (file: File) => () => void
}

export const FileList: VFC<FileListProps> = ({ files, onFileDelete }) => {
  return (
    <List px={4} w="fit-content" maxH={150} overflowY="auto">
      {files.map((file) => (
        <ListItem
          key={file.name}
          fontSize="lg"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={4}
        >
          <Flex alignItems="center">
            <ListIcon as={RiFileExcel2Fill} color="green.500" />
            {file.name}
          </Flex>
          <IconButton
            size="sm"
            fontSize="xx-large"
            variant="ghost"
            // as={IoIosClose}
            icon={<IoIosClose />}
            aria-label="delete file"
            onClick={onFileDelete(file)}
          />
        </ListItem>
      ))}
    </List>
  )
}
