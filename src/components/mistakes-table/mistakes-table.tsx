import { Table } from 'components/table'
import { VFC } from 'react'
import { useGetMistakesQuery } from 'services/mistakeService'

export interface MistakesTableProps {}

export const MistakesTable: VFC<MistakesTableProps> = ({}) => {
  const { data, isLoading } = useGetMistakesQuery({})
  console.log(data)

  return !isLoading && <Table data={data.mistakesWithCountOfLessons} isLoading={isLoading} />
}
