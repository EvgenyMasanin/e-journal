import { createContext, useState, VFC } from 'react'
import { Heading, Text, useBreakpointValue, VStack } from '@chakra-ui/react'
import { TimetableCardSlider } from 'components/timetable/timetable-card-slider'
import { TimetableCardsGrid } from './timetable-cards-grid'
import { Week, WeekType } from 'types'
import { usePrimaryColor } from 'hooks/usePrimaryColor'
import { useHoverColor } from 'hooks/useHoverColor'

export interface TimetableProps {
  week: Week
}

export const TimetableContext = createContext<{ week: Week; weekType: WeekType }>({
  week: null,
  weekType: 'up',
})

export const Timetable: VFC<TimetableProps> = ({ week }) => {
  const isMd = useBreakpointValue({ base: true, md: false })
  const primaryColor = usePrimaryColor()

  const [weekType, setWeekType] = useState<WeekType>('up')

  const toggleWeekType = () => {
    setWeekType((weekTYpe) => (weekTYpe === 'up' ? 'down' : 'up'))
  }

  const { bgColor, color } = useHoverColor()

  return (
    <TimetableContext.Provider value={{ week: week, weekType: weekType }}>
      <VStack h="100%" overflow="auto">
        <Heading fontSize="xx-large" alignSelf="self-start">
          Расписание на{' '}
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
        {!isMd ? <TimetableCardsGrid /> : <TimetableCardSlider />}
      </VStack>
    </TimetableContext.Provider>
  )
}
