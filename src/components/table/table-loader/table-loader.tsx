import { Td, Tr } from '@chakra-ui/react'
import { Loader } from 'components/loader'
import { VFC } from 'react'
import useTableContext from '../hooks/useTableContext'

export interface TableLoaderProps {}

export const TableLoader: VFC<TableLoaderProps> = ({}) => {
  const { columnNames, editable } = useTableContext()

  const colSpan = columnNames.length
  const extraColSpan = editable ? 2 : 0

  return (
    <Tr>
      <Td colSpan={colSpan + extraColSpan}>
        <Loader />
      </Td>
    </Tr>
  )
}
