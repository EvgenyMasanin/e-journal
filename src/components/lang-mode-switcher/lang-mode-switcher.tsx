import {
  AspectRatio,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { GbFlagIcon, RuFlagIcon } from 'components/flag-icon'
import { useHoverColor } from 'hooks/useHoverColor'
import { VFC } from 'react'
import { useTranslation } from 'react-i18next'

import { MdLanguage } from 'react-icons/md'

import capitalizeFirst from 'utils/capitalizeFirst'

export interface LangModeSwitcherProps {}

const langs = [
  { lang: 'ru', Icon: RuFlagIcon },
  { lang: 'en', Icon: GbFlagIcon },
] as const

export const LangModeSwitcher: VFC<LangModeSwitcherProps> = ({}) => {
  const { t, i18n } = useTranslation()

  const handleClick = (lang: 'en' | 'ru') => () => {
    i18n.changeLanguage(lang)

    document.querySelector('html')?.setAttribute('lang', lang)
  }

  const hoverColor = useHoverColor()

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<MdLanguage />}
        variant="ghost"
        fontSize="xl"
      />
      <MenuList>
        {langs.map(({ lang, Icon }) => (
          <MenuItem
            key={lang}
            onClick={handleClick(lang)}
            display="flex"
            alignItems="center"
            gap={2}
            {...(i18n.language === lang ? hoverColor : {})}
          >
            <Icon />
            {capitalizeFirst(t(lang))}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
