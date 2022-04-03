import { ReactNode } from 'react'
import { Flex, Box, Table as TableUI } from '@chakra-ui/react'
import { TableBody } from 'components/table/table-body'
import { TableHead } from 'components/table/table-head'
import { FormWrapper } from './table-form-wrapper'
import { Loader } from 'components/loader'
import { SubmitErrorHandler, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { TableContextProvider } from './table-context-provider'

export interface ObjectWithId {
  id: number
}

export interface TableProps<T extends ObjectWithId, S extends string[], K> {
  data: Array<T>
  columnNames?: S
  printCounter?: boolean
  printIds?: boolean
  isLoading?: boolean
  isUpdating?: boolean
  editable?: boolean
  form?: UseFormReturn<K>
  onValid?: SubmitHandler<K>
  onInValid?: SubmitErrorHandler<K>
  onRowDelete?: (id: number) => void
  renderCell?: (columnName: string, value: string | number) => ReactNode
}

export const Table = <T extends ObjectWithId, S extends string[], K>({
  isUpdating,
  editable,
  form,
  onValid,
  onInValid,
  ...props
}: TableProps<T, S, K>) => {
  return (
    <Box overflowX="auto" position="relative">
      {isUpdating && (
        <Flex
          backdropFilter="blur(10px) "
          h="full"
          w="full"
          position="absolute"
          zIndex="1"
          justify="center"
          alignItems="top"
          pt="15%"
        >
          <Box w="100" h="100">
            <Loader />
          </Box>
        </Flex>
      )}

      <FormWrapper editable={editable} useFormReturn={form} onValid={onValid} onInValid={onInValid}>
        <TableUI variant="simple">
          <TableContextProvider {...props} editable={editable}>
            <TableHead />
            <TableBody />
          </TableContextProvider>
        </TableUI>
      </FormWrapper>
    </Box>
  )
}
