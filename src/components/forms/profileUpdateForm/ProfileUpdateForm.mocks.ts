import { IProfileUpdateForm } from './ProfileUpdateForm'

const base: IProfileUpdateForm = {
  label: '',
  openModal: false,
  handleClose: function (): void {
    throw new Error('Function not implemented.')
  },
}

export const mockProfileUpdateFormProps = {
  base,
}
