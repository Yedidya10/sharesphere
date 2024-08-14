import { IEditProfileButton } from './EditProfileButton'

const base: IEditProfileButton = {
  label: '',
  userData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      streetName: '',
      streetNumber: '',
      city: '',
      country: '',
      zipCode: '',
    },
    name: '',
    image: '',
    role: '',
  },
}

export const mockEditProfileButtonProps = {
  base,
}
