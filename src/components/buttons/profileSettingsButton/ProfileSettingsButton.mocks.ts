import { IProfileSettingsButton } from './ProfileSettingsButton'

const base: IProfileSettingsButton = {
  handleClick: () => {},
  open: false,
  buttonText: 'Settings',
  label: 'Profile Settings',
}

export const mockProfileSettingsButtonProps = {
  base,
}
