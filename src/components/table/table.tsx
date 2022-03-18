import React, { createContext, ReactNode, VFC } from 'react'
import { Table as TableUI } from '@chakra-ui/react'
import { TableBody } from 'components/table-body'
import { TableHead } from 'components/table-head'

export interface ObjectWithId {
  id: number
  [key: string]: unknown
}

export interface TableProps<T extends ObjectWithId, S extends string[]> {
  data: Array<T>
  columnNames?: S
  printCounter?: boolean
  renderCell?: (columnName: string, value: unknown) => ReactNode
}

export const TableContext = createContext<{
  data: Array<ObjectWithId>
  columnNames?: string[]
  printCounter?: boolean
  renderCell?: (columnName: string, value: unknown) => ReactNode
}>(null)

export const Table = <T extends ObjectWithId, S extends string[]>({
  data,
  columnNames,
  printCounter,
  renderCell,
}: TableProps<T, S>) => {
  return (
    <TableUI variant="simple">
      <TableContext.Provider
        value={{ data, columnNames: columnNames || Object.keys(data[0]), printCounter, renderCell }}
      >
        <TableHead />
        <TableBody />
      </TableContext.Provider>
    </TableUI>
  )
}
