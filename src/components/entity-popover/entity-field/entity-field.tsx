import { Text } from '@chakra-ui/react'
import { VFC } from 'react'

export interface EntityFieldProps {
  entityFieldName: string
  entityFieldValue: string | number
}

export const EntityField: VFC<EntityFieldProps> = ({ entityFieldName, entityFieldValue }) => {
  return (
    <Text>
      <Text as="span" fontWeight="medium">
        {entityFieldName}:{' '}
      </Text>
      <Text as="span" fontSize="sm" fontWeight="normal">
        {String(entityFieldValue)}
      </Text>
    </Text>
  )
}
