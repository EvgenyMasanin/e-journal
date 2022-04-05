import {
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import { VFC } from 'react'
import { HiEye } from 'react-icons/hi'
import { EntityField } from './entity-field'

export interface EntityPopoverProps {
  header: string
  entityFieldsNames: string[]
  entityFieldsValues: Array<string | number>
}

export const EntityPopover: VFC<EntityPopoverProps> = ({
  header,
  entityFieldsNames,
  entityFieldsValues,
}) => {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <IconButton size="sm" icon={<HiEye />} aria-label="Show teacher info" />
      </PopoverTrigger>
      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverHeader>{header}</PopoverHeader>
        <PopoverBody>
          <Flex direction="column" pt={2} gap={2}>
            {entityFieldsNames.map((fieldName, i) => (
              <EntityField
                key={fieldName}
                entityFieldName={fieldName}
                entityFieldValue={entityFieldsValues[i]}
              />
            ))}
          </Flex>
        </PopoverBody>
        <PopoverCloseButton />
      </PopoverContent>
    </Popover>
  )
}
