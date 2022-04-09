import { memo, VFC } from 'react'
import { Tbody } from '@chakra-ui/react'
import { TableRow } from '../table-row'
import useTableContext from 'components/table/hooks/useTableContext'
import { TableLoader } from '../table-loader'

export const TableBody: VFC = memo(() => {
  const { data, isLoading, printIds } = useTableContext()

  return (
    <Tbody>
      {isLoading ? (
        <TableLoader />
      ) : (
        data.map(({ id, ...data }, i) => (
          <TableRow key={id} rowNumber={i} id={id} data={printIds ? { id, ...data } : data} />
        ))
      )}
    </Tbody>
  )
})

TableBody.displayName = 'TableBody'
