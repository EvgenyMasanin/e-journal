import { Flex, useColorModeValue } from '@chakra-ui/react'
import { Router, Redirector } from 'routes'

const App = () => (
  <>
    <Redirector />
    <Flex direction="column" h="full" bgColor={useColorModeValue('gray.50', 'gray.800')}>
      <Router />
    </Flex>
  </>
)

export default App
