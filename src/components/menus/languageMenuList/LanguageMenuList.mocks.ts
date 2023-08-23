import { ILanguageMenuList } from './LanguageMenuList'

const base: ILanguageMenuList = {
  handleCloseMenu: function (): void {
    throw new Error('Function not implemented.')
  },
  handleBackToSettings: function (): void {
    throw new Error('Function not implemented.')
  },
  label: '',
}

export const mockLanguageMenuListProps = {
  base,
}
