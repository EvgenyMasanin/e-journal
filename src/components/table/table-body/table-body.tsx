import { Tbody, Td, Tr } from '@chakra-ui/react'
import useTableContext from 'components/table/hooks/useTableContext'
import React, { VFC } from 'react'

export const TableBody: VFC = () => {
  const { data, columnNames, printCounter, renderCell } = useTableContext()

  return (
    <Tbody>
      {data.map(({ id, ...data }, i) => (
        <Tr key={id}>
          {printCounter && <Td>{i + 1}</Td>}
          {Object.entries(data).map(([objectKey, value], i) => {
            const key = `${objectKey} - ${id}`
            const colName = columnNames.length !== 0 ? columnNames[i] : objectKey
            const Cell = renderCell?.(colName, value)

            return <Td key={key}>{Cell ? Cell : value}</Td>
          })}
        </Tr>
      ))}
    </Tbody>
  )
}
