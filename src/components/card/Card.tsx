import React, { FC } from 'react'
import { Box, BoxProps, Center, useColorModeValue } from '@chakra-ui/react'

const Card: FC<BoxProps> = (props) => (
  <Center>
    <Box
      bg={useColorModeValue('white', 'gray.700')}
      py="6"
      px={{ base: '4', md: '6' }}
      shadow="base"
      rounded="lg"
      {...props}
    />
  </Center>
)
export default Card
