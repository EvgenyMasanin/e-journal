import { VFC } from 'react'
import { HStack } from '@chakra-ui/react'
import { TimetableCards } from '../timetable-cards'
import { useHScroll } from 'hooks/useHScroll'

export interface TableCardSliderProps {}

export const TimetableCardSlider: VFC<TableCardSliderProps> = () => {
  const { parentRef, childRef } = useHScroll<HTMLDivElement, HTMLDivElement>()

  return (
    <HStack ref={parentRef} w="100%" alignItems="stretch" overflowX="auto">
      <TimetableCards ref={childRef} />
    </HStack>
  )
}
