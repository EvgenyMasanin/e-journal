import { Heading, Text } from '@chakra-ui/react'
import { useHoverColor } from 'hooks/useHoverColor'
import { usePrimaryColor } from 'hooks/usePrimaryColor'
import { VFC } from 'react'
import { useActions } from 'redux-store/hooks'
import useTimetableContext from '../hooks/useTimetableContest'

export interface TimetableHeadingProps {}

export const TimetableHeading: VFC<TimetableHeadingProps> = ({}) => {
  const { selectWeekDay, selectSemester } = useActions()

  const { semester, weekType } = useTimetableContext()

  const toggleWeekType = () => {
    selectWeekDay(weekType === 'up' ? 'down' : 'up')
  }

  const toggleSemester = () => {
    selectSemester(semester === 'first' ? 'second' : 'first')
  }

  const primaryColor = usePrimaryColor()
  const { bgColor, color } = useHoverColor()

  return (
    <Heading fontSize="xx-large" alignSelf="self-start">
      Расписание на{' '}
      <Text
        as="button"
        color={primaryColor}
        onClick={toggleSemester}
        transition=".5s"
        borderRadius="md"
        _hover={{
          bgColor,
          color,
        }}
      >
        {semester === 'first' ? 'первый' : 'второй'}
      </Text>
      {' семестр '}
      <Text
        as="button"
        color={primaryColor}
        onClick={toggleWeekType}
        transition=".5s"
        borderRadius="md"
        _hover={{
          bgColor,
          color,
        }}
      >
        {weekType === 'up' ? 'верхнюю' : 'нижнюю'}
      </Text>{' '}
      неделю
    </Heading>
  )
}
