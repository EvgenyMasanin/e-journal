import { Box, Flex } from '@chakra-ui/react'
import Header from 'components/header/header'
import { Main } from 'pages/main'
import { TimetableInfo } from 'pages/timetable-info'
import { useGetTeachersTimetablesQuery } from 'services/timetableService'

const App = () => {
  const { data: timetables, isLoading, isError } = useGetTeachersTimetablesQuery(10)

  return (
    <Flex direction="column" h="100%">
      <Box padding="1rem" flex="0 0 12%">
        <Header />
      </Box>
      <Box px={5} flex="0 1 88%" maxH="88%">
        {/* {true && <Main />} */}
        {isError ? (
          <Box>ERROR</Box>
        ) : (
          <TimetableInfo
            isLoading={isLoading}
            week={timetables}
            weekDay={'tuesday'}
            weekType="down"
          />
        )}
      </Box>
    </Flex>
  )
}

export default App
