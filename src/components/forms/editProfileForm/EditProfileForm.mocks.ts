import { IEditProfileForm } from './EditProfileForm'

const base: IEditProfileForm = {
  label: '',
  openModal: false,
  handleClose: function (): void {
    throw new Error('Function not implemented.')
  },
}

export const mockEditProfileFormProps = {
  base,
}
