import { Table } from 'components/table'
import { VFC } from 'react'
import { useGetMistakesQuery } from 'api/mistake.api'
import { Flex } from '@chakra-ui/react'
import { MistakeCard } from 'components/mistake-card'

export const TimetablesMistakesPage: VFC = ({}) => {
  const { data, isLoading } = useGetMistakesQuery({})
  //FIXME: no id prop
  console.log(data)

  // return !isLoading && <Table data={data.mistakesWithCountOfLessons} isLoading={isLoading} />
  return (
    !isLoading && (
      <Flex wrap="wrap" gap={5}>
        {data.mistakesWithCountOfLessons.map((mistake: any, i: number) => (
          <MistakeCard key={i} title="Не соответствуют запланированные часы и реальные">
            <pre>{JSON.stringify(mistake, null, 2)}</pre>
          </MistakeCard>
        ))}
      </Flex>
    )
  )
}
