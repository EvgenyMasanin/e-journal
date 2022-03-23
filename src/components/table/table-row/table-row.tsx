import { VFC } from 'react'
import { Tr } from '@chakra-ui/react'
import { TableCell } from '../table-cell'
import useTableContext from '../hooks/useTableContext'

export interface TimetableRowProps {
  data: unknown
  rowNumber?: number
}

export const TableRow: VFC<TimetableRowProps> = ({ data, rowNumber }) => {
  const { printCounter, columnNames } = useTableContext()

  return (
    <Tr>
      {printCounter && <TableCell value={rowNumber + 1} colName="№" />}
      {Object.entries(data).map(([key, value], i) => {
        const colName = columnNames.length !== 0 ? columnNames[i] : key
        return <TableCell key={key} value={value} colName={colName} />
      })}
    </Tr>
  )
}
