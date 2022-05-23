import { Table } from 'components/table'
import { VFC } from 'react'
import { useGetMistakesQuery } from 'api/mistake.api'

export interface MistakesTableProps {}

export const TimetablesMistakesPage: VFC<MistakesTableProps> = ({}) => {
  const { data, isLoading } = useGetMistakesQuery({})
  //FIXME: no id prop
  console.log(data)

  return !isLoading && <Table data={data.mistakesWithCountOfLessons} isLoading={isLoading} />
}
