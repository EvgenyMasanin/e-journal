import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react'
import { FC } from 'react'

export const Grid: FC<SimpleGridProps> = ({ children, ...props }) => {
  return (
    <SimpleGrid
      columns={[1, null, null, 2, 3]}
      justifyContent="space-around"
      px={10}
      py={5}
      w="full"
      spacingX="30px"
      spacingY={5}
      overflowY="auto"
      {...props}
    >
      {children}
    </SimpleGrid>
  )
}
