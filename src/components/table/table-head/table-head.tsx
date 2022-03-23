import { useContext, VFC } from 'react'
import { Th, Thead, Tr } from '@chakra-ui/react'
import { TableContext } from 'components/table'

export const TableHead: VFC = () => {
  const { columnNames, printCounter, printIds } = useContext(TableContext)

  return (
    <Thead>
      <Tr>
        {printCounter && <Th>№</Th>}
        {columnNames.map((columnName) => {
          if (!printIds && columnName === 'id') return
          return <Th key={columnName}>{columnName}</Th>
        })}
      </Tr>
    </Thead>
  )
}
