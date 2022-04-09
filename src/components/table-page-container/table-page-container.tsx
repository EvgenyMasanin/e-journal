import { Box, Flex, Heading } from '@chakra-ui/react'
import { ReactNode, VFC } from 'react'

export interface TablePageContainerProps {
  headerText: string
  FormComponent: ReactNode
  TableComponent: ReactNode
}

export const TablePageContainer: VFC<TablePageContainerProps> = ({
  FormComponent,
  TableComponent,
  headerText,
}) => {
  return (
    <Flex direction="column" h="full">
      <Flex justify="space-between" h="8%">
        <Heading fontSize="2xl">{headerText}</Heading>
        {FormComponent}
      </Flex>
      <Box h="92%">{TableComponent}</Box>
    </Flex>
  )
}
