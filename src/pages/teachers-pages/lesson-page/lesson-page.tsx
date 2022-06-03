import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Table } from 'components/table'
import { VFC } from 'react'

export interface LessonPageProps {}

export const LessonPage: VFC<LessonPageProps> = ({}) => {
  return (
    <VStack alignItems="flex-start" spacing={5} h="full">
      <Heading>
        Предмет:{' '}
        <Text as="span" fontWeight="normal">
          Современные системы программирования (лабораторная)
        </Text>
      </Heading>
      <Text fontSize="2xl" fontWeight="semibold">
        Время занятия: 10:25 - 12:00
      </Text>
      <FormControl w="xl">
        <FormLabel fontSize="2xl">Введите тему занятия на 02.11.2022:</FormLabel>
        <Input />
      </FormControl>
      <Heading fontSize="2xl">Студенты:</Heading>
      <Box maxH="60%" overflowY="auto" w="full">
        <Table
          data={students}
          columnNames={['студент', 'группа', 'присутствие', 'оценка']}
          printCounter
          renderCell={renderCell}
        />
      </Box>
      <Center w="full">
        <Button colorScheme="teal" w="40%">
          Отметить пару
        </Button>
      </Center>
    </VStack>
  )
}

const renderCell = (columnName: string, value: string, row: Student) => {
  switch (columnName) {
    case 'присутствие':
      return <Checkbox />
    case 'оценка':
      return <Input type="string" w={20} />
    default:
      return null
  }
}

interface Student {
  id: number
  name: string
  group: string
  isAbsent: boolean
  mark: string
}

const students: Student[] = [
  {
    name: 'Алешков Денис',
    group: 'АСОИ-181',
  },
  { name: 'Батан Александр', group: 'АСОИ-181' },
  {
    name: 'Бобкова Ирина',
    group: 'АСОИ-181',
  },
  {
    name: 'Данилов Михаил',
    group: 'АСОИ-181',
  },
  {
    name: 'Дрягин Даниил',
    group: 'АСОИ-181',
  },
  {
    name: 'Колеснёв Роман',
    group: 'АСОИ-181',
  },
].map((stud, i) => ({ id: i, ...stud, isAbsent: false, mark: '10' }))
