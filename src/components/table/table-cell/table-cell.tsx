import { Td } from '@chakra-ui/react'
import { VFC } from 'react'
import useTableContext from '../hooks/useTableContext'

export interface TimetableCellProps {
  colName: string
  value: string | number
}

export const TableCell: VFC<TimetableCellProps> = ({ colName, value }) => {
  const { renderCell } = useTableContext()

  const Cell = renderCell?.(colName, value)

  return <Td>{Cell ? Cell : value}</Td>
}
