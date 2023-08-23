import { IThemeModeMenuList } from './ThemeModeMenuList'

const base: IThemeModeMenuList = {
  handleCloseMenu: function (): void {
    throw new Error('Function not implemented.')
  },
  handleBackToSettings: function (): void {
    throw new Error('Function not implemented.')
  },
  label: ''
}

export const mockThemeModeMenuListProps = {
  base,
}
