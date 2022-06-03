import { Divider, Text, VStack } from '@chakra-ui/react'
import { Card } from 'components/card'
import { FC } from 'react'

export interface MistakeCardProps {
  title: string
}

export const MistakeCard: FC<MistakeCardProps> = ({ title, children }) => {
  return (
    <Card w="full" h="full" cursor="pointer">
      <Text>{title}</Text>
      <Divider />
      <VStack alignItems="flex-start" spacing={2}>
        {children}
      </VStack>
    </Card>
  )
}
