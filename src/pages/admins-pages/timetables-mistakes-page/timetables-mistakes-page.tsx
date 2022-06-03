import { VFC } from 'react'
import { useGetMistakesQuery } from 'api/mistake.api'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { Mistakes } from 'types/timetable-mistakes.types'
import { MistakesGrid } from 'components/mistakes-grid'

const mistakeTypes: Array<keyof Mistakes> = [
  'mistakesWithCountOfLessons',
  'sameAuditorium',
  'missingCampusOrAuditorium',
]

export const TimetablesMistakesPage: VFC = () => {
  const { data, isLoading } = useGetMistakesQuery()

  return (
    !isLoading && (
      <Tabs isFitted variant="enclosed" colorScheme="teal" h="full">
        <TabList mb="1em">
          <Tab fontSize="xl" fontWeight="semibold">
            Ошибки с количеством занятий
          </Tab>
          <Tab fontSize="xl" fontWeight="semibold">
            Разные занятия в одной аудитории
          </Tab>
          <Tab fontSize="xl" fontWeight="semibold">
            Не указаны аудитория или корпус
          </Tab>
        </TabList>
        <TabPanels overflowY="auto" h="90%">
          {mistakeTypes.map((mistakeType, i) => (
            <TabPanel key={i}>
              <MistakesGrid mistakeType={mistakeType} mistakes={data} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    )
  )
}
