import { ISettingsMenuList } from './SettingsMenuList'

const base: ISettingsMenuList = {
  label: '',
  handleCloseMenu: function (): void {
    throw new Error('Function not implemented.')
  },
  handleOpenThemeModeMenu: function (): void {
    throw new Error('Function not implemented.')
  },
  handleLogout: function (): void {
    throw new Error('Function not implemented.')
  }
}

export const mockSettingsMenuListProps = {
  base,
}
