import { Box, Flex } from '@chakra-ui/react'
import Header from 'components/header/header'
import { Table } from 'components/table'
import { lessons1 } from 'data'
import { Main } from 'pages/main'
import { TimetableInfo } from 'pages/timetable-info'
import { useGetTeacherQuery, useGetTeachersQuery } from 'services/teachersService'
import { useGetTeachersTimetablesQuery } from 'services/timetableService'
import { Teacher } from 'types/teacher'

const App = () => {
  const { data = [] } = useGetTeachersQuery('')
  const { data: teacher, isError } = useGetTeacherQuery(1)

  return (
    <Flex direction="column" h="100%">
      <Box padding="1rem" flex="0 0 12%">
        <Header />
      </Box>
      <Box px={5} flex="0 1 88%" maxH="88%">
        {/* {!isLoading && (
          <Table
            data={[teacher]}
            columnNames={['Имя сокр.', 'Полное имя', 'должность сокр.', 'должность']}
          />
        )} */}
        <Main />
        {/* <TimetableInfo lessons={lessons1} /> */}
      </Box>
    </Flex>
  )
}

export default App
