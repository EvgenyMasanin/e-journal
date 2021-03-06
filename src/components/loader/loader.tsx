import { Center, HStack, Spinner } from '@chakra-ui/react'
import { usePrimaryColor } from 'hooks/usePrimaryColor'
import { VFC } from 'react'

export interface LoaderProps {}

export const Loader: VFC<LoaderProps> = ({}) => {
  const color = usePrimaryColor()

  return (
    <Center h="full">
      <HStack h="full">
        <Spinner thickness="6px" speed="0.75s" emptyColor="gray.200" color={color} size="xl" />
      </HStack>
    </Center>
  )
}
