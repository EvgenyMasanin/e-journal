import { Box, chakra, Flex, Stack } from '@chakra-ui/react'
import Header from 'components/header/header'
import { lessons1 } from 'data'
import { Main } from 'pages/main'
import { TimetableInfo } from 'pages/timetable-info'
import React, { VFC } from 'react'

const App = () => {
  return (
    <Flex direction="column" h="100%">
      <Box padding="1rem" flex="0 0 12%">
        <Header />
      </Box>
      <Box px={5} flex="0 1 88%" maxH="88%" overflow="hidden">
        <Main />
        {/* <TimetableInfo lessons={lessons1} /> */}
      </Box>
    </Flex>
  )
}

export default App
