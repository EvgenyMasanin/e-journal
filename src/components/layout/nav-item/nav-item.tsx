import { Flex, FlexProps, Icon, useColorModeValue } from '@chakra-ui/react'
import { useHoverColor } from 'hooks/useHoverColor'
import { FC } from 'react'
import { IconType } from 'react-icons'
import { Link } from 'react-router-dom'
import { AllPaths } from 'routes'

export interface NavItemProps extends FlexProps {
  path: AllPaths
  text?: string
  icon: IconType
}

export const NavItem: FC<NavItemProps> = ({ icon, path, text, children, ...rest }) => {
  const hoverEffect = useHoverColor()

  const iconHoverColor = useColorModeValue('gray.900', 'white')

  return (
    // <Link to={path}>
    <Link to={path}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        fontSize="20"
        _hover={hoverEffect}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            _groupHover={{
              color: iconHoverColor,
            }}
            as={icon}
          />
        )}
        {text || children}
      </Flex>
    </Link>
  )
}
