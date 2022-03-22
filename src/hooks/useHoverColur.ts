import { useColorMode } from '@chakra-ui/react'

export const useHoverColor = () => {
  const { colorMode } = useColorMode()

  const darkHoverBgColor = '#81e6d929'
  const darkHoverColor = 'teal.200'

  const lightHoverBgColor = 'teal.100'
  const lightHoverColor = 'gray.800'

  const isDark = colorMode === 'dark'

  return {
    bgColor: isDark ? darkHoverBgColor : lightHoverBgColor,
    color: isDark ? darkHoverColor : lightHoverColor,
  }
}
