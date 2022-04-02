import { ReactNode } from 'react'
import { Box, Table as TableUI } from '@chakra-ui/react'
import { TableBody } from 'components/table/table-body'
import { TableHead } from 'components/table/table-head'
import { FormWrapper } from './table-form-wrapper'
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
  editable?: boolean
  form?: UseFormReturn<K>
  onValid?: SubmitHandler<K>
  onInValid?: SubmitErrorHandler<K>
  onRowDelete?: (id: number) => void
  renderCell?: (columnName: string, value: string | number) => ReactNode
}

export const Table = <T extends ObjectWithId, S extends string[], K>({
  editable,
  form,
  onValid,
  onInValid,
  ...props
}: TableProps<T, S, K>) => {
  return (
    <Box overflowX="auto">
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
