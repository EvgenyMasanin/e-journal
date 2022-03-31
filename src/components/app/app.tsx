import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import Header from 'components/header/header'
import { Layout } from 'components/layout'
import { Router, Redirector } from 'routes'

const App = () => {
  return (
    <>
      <Redirector />
      <Flex direction="column" h="full" bgColor={useColorModeValue('gray.50', 'gray.800')}>
        {/* <Box padding="1rem" flex="0 0 12%">
          <Header />
        </Box> */}
        {/* <Box px={5} flex="0 1 88%" maxH="88%"> */}
        {/* <Layout> */}
        <Router />
        {/* </Layout> */}
        {/* </Box> */}
      </Flex>
    </>
  )
}

export default App
