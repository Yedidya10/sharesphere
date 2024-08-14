import { IUserProfileCompletionForm } from './UserProfileCompletionForm'

const base: IUserProfileCompletionForm = {
  label: '',
  openModal: false,
  handleClose: function (): void {
    throw new Error('Function not implemented.')
  },
}

export const mockEditProfileFormProps = {
  base,
}
