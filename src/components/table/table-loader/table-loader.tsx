import { Td, Tr } from '@chakra-ui/react'
import { Loader } from 'components/loader'
import { VFC } from 'react'
import useTableContext from '../hooks/useTableContext'

export interface TableLoaderProps {}

export const TableLoader: VFC<TableLoaderProps> = ({}) => {
  const { columnNames } = useTableContext()
  return (
    <Tr>
      <Td colSpan={columnNames.length}>
        <Loader />
      </Td>
    </Tr>
  )
}
