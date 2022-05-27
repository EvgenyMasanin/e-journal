import { Text, VStack } from '@chakra-ui/react'
import { Card } from 'components/card'
import { FC } from 'react'

export interface MistakeCardProps {
  title: string
}

export const MistakeCard: FC<MistakeCardProps> = ({ title, children }) => {
  return (
    <Card>
      <Text>{title}</Text>
      <VStack alignItems="flex-start" spacing={2}>
        {children}
      </VStack>
    </Card>
  )
}
