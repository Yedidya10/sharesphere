import { IGeneralSettingsButton } from './GeneralSettingsButton'

const base: IGeneralSettingsButton = {
  handleClick: () => {},
  open: false,
  buttonText: 'Settings',
  label: 'General Settings',
}

export const mockGeneralSettingsButtonProps = {
  base,
}
