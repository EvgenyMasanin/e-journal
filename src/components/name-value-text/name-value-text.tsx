import { Text } from '@chakra-ui/react'
import { ReactNode, VFC } from 'react'

export interface NameValueTextProps {
  name: string
  value: string | number | ReactNode
}

export const NameValueText: VFC<NameValueTextProps> = ({ name: key, value }) => {
  return (
    <Text>
      <Text as="span">{key}</Text>{' '}
      <Text as="span" fontWeight="semibold">
        {value}
      </Text>
    </Text>
  )
}
