import { VFC } from 'react'
import { Td } from '@chakra-ui/react'
import { TableInputCell } from '../table-input-cell'
import useTableContext from '../hooks/useTableContext'

export interface TimetableCellProps {
  colName: string
  fieldName?: string
  value: string
  rowData: unknown
  isEdit?: boolean
}

export const TableCell: VFC<TimetableCellProps> = ({
  colName,
  fieldName,
  value,
  rowData,
  isEdit,
}) => {
  const { renderCell, renderEditableCell } = useTableContext()

  const Cell = renderCell?.(colName, value, rowData)

  const EditableSell = isEdit ? renderEditableCell?.(colName, value, rowData) : null

  return (
    <Td verticalAlign={isEdit && 'top'}>
      {isEdit
        ? EditableSell ?? <TableInputCell fieldName={fieldName} value={value} />
        : Cell ?? value}
    </Td>
  )
}
