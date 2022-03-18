import { Th, Thead, Tr } from '@chakra-ui/react'
import { TableContext } from 'components/table'
import React, { useContext, VFC } from 'react'

export const TableHead: VFC = () => {
  const { columnNames, printCounter } = useContext(TableContext)

  return (
    <Thead>
      <Tr>
        {printCounter && <Th>№</Th>}
        {columnNames.map((columnName) => {
          if (columnName === 'id') return
          return <Th key={columnName}>{columnName}</Th>
        })}
      </Tr>
    </Thead>
  )
}
