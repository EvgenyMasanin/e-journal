import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import Header from 'components/header/header'
import { Layout } from 'components/layout'
import { Router, Redirector } from 'routes'

const App = () => {
  return (
    <>
      <Redirector />
      <Flex direction="column" h="full" bgColor={useColorModeValue('gray.50', 'gray.800')}>
        <Router />
      </Flex>
    </>
  )
}

export default App
