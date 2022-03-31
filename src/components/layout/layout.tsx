import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { MobileNav } from './mobile-nav'
import { Sidebar } from './sidebar'

export interface LayoutProps {}

export const Layout: FC<LayoutProps> = ({ children }) => {
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
      <Box h="90%" ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
        {/* {children} */}
      </Box>
    </Box>
  )
}
