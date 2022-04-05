/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext, useMemo, useState } from 'react'
import { ObjectWithId, TableProps } from '../table'

export type TableContextProviderProps<T extends ObjectWithId, S extends string[], K> = Omit<
  TableProps<T, S, K>,
  'form' | 'onValid' | 'onInValid'
> & { children: ReactNode }

interface ITableContext {
  data: Array<ObjectWithId>
  columnNames?: string[]
  printCounter?: boolean
  printIds?: boolean
  isLoading?: boolean
  editable?: boolean
  renderCell?: (columnName: string, value: string | number) => ReactNode
}

export const TableContext = createContext<ITableContext>(null)

export const TableActionButtonsContext = createContext<{
  editingRow: number | null
  setEditingRow: (editingRow: number | null) => void
  onRowDelete: (id: number) => void
}>(null)

export const TableContextProvider = <T extends ObjectWithId, S extends string[], K>({
  children,
  isLoading,
  data,
  columnNames,
  printCounter,
  printIds,
  editable,
  renderCell,
  onRowDelete = () => {},
}: TableContextProviderProps<T, S, K>) => {
  const [editingRow, setEditingRow] = useState<number | null>(null)
  const tableContextValue: ITableContext = useMemo(
    () => ({
      isLoading,
      data,
      columnNames: columnNames || Object.keys(data[0]),
      printCounter,
      printIds,
      editable,
      renderCell,
    }),
    [isLoading, data, columnNames, printCounter, printIds, editable, renderCell]
  )

  const tableActionButtonsContextValue = useMemo(
    () => ({ editingRow, setEditingRow, onRowDelete }),
    [editingRow, setEditingRow, onRowDelete]
  )

  return (
    <TableContext.Provider value={tableContextValue}>
      <TableActionButtonsContext.Provider value={tableActionButtonsContextValue}>
        {children}
      </TableActionButtonsContext.Provider>
    </TableContext.Provider>
  )
}
