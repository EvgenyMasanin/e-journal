import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react'
import { LessonPage } from 'pages/teachers-pages/lesson-page'
import { VFC } from 'react'
import { Outlet } from 'react-router-dom'
import { MobileNav } from './mobile-nav'
import { Sidebar } from './sidebar'

export const Layout: VFC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh">
      <Sidebar onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box h="90%" ml={{ base: 0, md: 60 }} p="4" overflow="auto">
        <Outlet />
        {/* <LessonPage /> */}
      </Box>
    </Box>
  )
}
