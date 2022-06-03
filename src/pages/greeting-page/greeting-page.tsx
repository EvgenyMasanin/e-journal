import { Heading, Spacer, VStack } from '@chakra-ui/react'
import { VFC } from 'react'

export interface GreetingPageProps {
  userType: 'admin' | 'teacher'
}

export const GreetingPage: VFC<GreetingPageProps> = ({ userType }) => {
  return (
    <VStack>
      <Heading>
        Вы вошли в систему в качестве {userType === 'admin' ? 'администратора' : 'преподавателя'}
      </Heading>
      <Spacer />
      <Spacer />
      <Spacer />
      <Heading fontSize="2xl">
        Для продолжения работы воспользуйтесь панелью навигации слева
      </Heading>
    </VStack>
  )
}
