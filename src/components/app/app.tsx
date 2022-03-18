import { Box, Flex, Stack } from '@chakra-ui/react'
import Header from 'components/header/header'
import { Main } from 'pages/main'
import React from 'react'

const App = () => {
  return (
    <Flex direction="column" h="100%">
      <Box padding="1rem" flex="0 0 12%">
        <Header />
      </Box>
      <Box flex="0 1 88%" maxH="88%" overflow="hidden">
        <Main />
      </Box>
    </Flex>
  )
}

export default App
