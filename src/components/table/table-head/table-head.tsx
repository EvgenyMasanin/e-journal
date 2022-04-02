import { memo, VFC } from 'react'
import { Th, Thead, Tr } from '@chakra-ui/react'
import useTableContext from '../hooks/useTableContext'

export const TableHead: VFC = memo(() => {
  const { columnNames, printCounter, printIds, editable } = useTableContext()

  return (
    <Thead>
      <Tr>
        {printCounter && <Th>№</Th>}
        {columnNames.map((columnName) => {
          if (!printIds && columnName === 'id') return
          return <Th key={columnName}>{columnName}</Th>
        })}
        {editable && <Th textAlign="center">Действия</Th>}
      </Tr>
    </Thead>
  )
})

TableHead.displayName = 'TableHead'
