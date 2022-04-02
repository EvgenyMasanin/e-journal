import { VFC } from 'react'
import { Td } from '@chakra-ui/react'
import { TableInputCell } from '../table-input-cell'
import useTableContext from '../hooks/useTableContext'

export interface TimetableCellProps {
  colName: string
  fieldName?: string
  value: string | number
  isEdit?: boolean
}

export const TableCell: VFC<TimetableCellProps> = ({ colName, fieldName, value, isEdit }) => {
  const { renderCell } = useTableContext()

  const Cell = renderCell?.(colName, value)

  return (
    <Td verticalAlign={isEdit && 'top'}>
      {isEdit ? <TableInputCell fieldName={fieldName} value={value} /> : Cell || value}
    </Td>
  )
}
