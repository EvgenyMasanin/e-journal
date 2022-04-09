import { ReactNode, useRef } from 'react'
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
  size?: 'sm' | 'md' | 'lg'
  printCounter?: boolean
  printIds?: boolean
  isLoading?: boolean
  isUpdating?: boolean
  editable?: boolean
  form?: UseFormReturn<K>
  onValid?: SubmitHandler<K>
  onInValid?: SubmitErrorHandler<K>
  onRowDelete?: (id: number) => void
  renderCell?: (columnName: string, value: string | number, row: T) => ReactNode
  renderEditableCell?: (columnName: string, value: string, row: T) => ReactNode
}

export const Table = <T extends ObjectWithId, S extends string[], K>({
  size = 'lg',
  isUpdating,
  editable,
  form,
  onValid,
  onInValid,
  ...props
}: TableProps<T, S, K>) => {
  const refTable = useRef<HTMLTableElement>()

  return (
    <Box
      className="table-container"
      h="full"
      overflow="auto"
      position={isUpdating ? 'relative' : 'initial'}
    >
      {isUpdating && (
        <Box
          backdropFilter="blur(10px)"
          inset="0"
          position="absolute"
          zIndex="1"
          h={refTable.current?.offsetHeight}
        />
      )}

      <FormWrapper editable={editable} useFormReturn={form} onValid={onValid} onInValid={onInValid}>
        <TableUI ref={refTable} variant="simple" fontWeight="bold" size={size}>
          <TableContextProvider {...props} editable={editable}>
            <TableHead />
            <TableBody />
          </TableContextProvider>
        </TableUI>
      </FormWrapper>
    </Box>
  )
}
