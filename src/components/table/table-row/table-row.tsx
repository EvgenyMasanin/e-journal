import { createContext, memo, useContext, useState, VFC } from 'react'
import { Flex, Td, Tr, Input } from '@chakra-ui/react'
import { TableCell } from '../table-cell'
import useTableContext from '../hooks/useTableContext'
import { useRegisterContext } from '../hooks/useRegisterContext'
import { ActionButtons } from '../action-buttons'

export interface TimetableRowProps {
  data: object
  id: number
  rowNumber?: number
}

export const TableRowContext = createContext<{
  isEdited: boolean
}>(null)

export const useTableRowContext = () => {
  return useContext(TableRowContext)
}

export const TableRow: VFC<TimetableRowProps> = memo(({ data, id, rowNumber }) => {
  const context = useTableContext()
  const { printCounter, columnNames, editable } = context
  const register = useRegisterContext()
  const [isEdit, setIsEdit] = useState(false)

  return (
    <Tr>
      {printCounter && (
        <TableCell value={String(rowNumber + 1)} colName="№" rowData={{ ...data, id }} />
      )}
      {isEdit && (
        <Td display="none">
          <Input value={id} {...register('id')} />
        </Td>
      )}
      {Object.entries(data).map(([key, value], i) => {
        const colName = columnNames.length !== 0 ? columnNames[i] : key
        return (
          <TableCell
            key={key}
            rowData={{ ...data, id }}
            value={String(value ?? '')}
            colName={colName}
            fieldName={key}
            isEdit={isEdit}
          />
        )
      })}

      {editable && (
        <Td>
          <Flex gap={2} justify="center">
            <ActionButtons
              isEdit={isEdit}
              rowNumber={rowNumber}
              setIsEdit={setIsEdit}
              dataId={id}
            />
          </Flex>
        </Td>
      )}
    </Tr>
  )
})

TableRow.displayName = 'TableRow'
