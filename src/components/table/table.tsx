import { createContext, ReactNode } from 'react'
import { Box, Table as TableUI } from '@chakra-ui/react'
import { TableBody } from 'components/table/table-body'
import { TableHead } from 'components/table/table-head'

export interface ObjectWithId {
  id: number
}

export interface TableProps<T extends ObjectWithId, S extends string[]> {
  data: Array<T>
  columnNames?: S
  printCounter?: boolean
  printIds?: boolean
  isLoading?: boolean
  renderCell?: (columnName: string, value: unknown) => ReactNode
}

export const TableContext = createContext<{
  data: Array<ObjectWithId>
  columnNames?: string[]
  printCounter?: boolean
  printIds?: boolean
  isLoading?: boolean
  renderCell?: (columnName: string, value: unknown) => ReactNode
}>(null)

export const Table = <T extends ObjectWithId, S extends string[]>({
  isLoading,
  data,
  columnNames,
  printCounter,
  printIds,
  renderCell,
}: TableProps<T, S>) => {
  return (
    <Box overflowX="auto">
      <TableUI variant="simple">
        <TableContext.Provider
          value={{
            isLoading,
            data,
            columnNames: columnNames || Object.keys(data[0]),
            printCounter,
            printIds,
            renderCell,
          }}
        >
          <TableHead />
          <TableBody />
        </TableContext.Provider>
      </TableUI>
    </Box>
  )
}
