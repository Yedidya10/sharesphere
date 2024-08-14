import { IEditProfileForm } from './EditProfileForm'

const base: IEditProfileForm = {
  label: '',
  openModal: false,
  handleClose: function (): void {
    throw new Error('Function not implemented.')
  },
  address: {
    streetName: '',
    streetNumber: '',
    city: '',
    zipCode: '',
    country: ''
  },
  phone: undefined
}

export const mockEditProfileFormProps = {
  base,
}
