import { IUserOwnedCardInfo } from './UserOwnedCardInfo'

const base: IUserOwnedCardInfo = {
  isAvailable: false,
  isOwner: false,
  card: {
    cardIds: {},
    details: {
      category: '',
      name: '',
      author: '',
      brand: '',
      description: '',
      imageUrl: '',
    },
    condition: 0,
    maxLoanPeriod: 0,
    location: {
      city: '',
      streetName: '',
      streetNumber: '',
      zipCode: '',
    },
    owner: '',
    status: '',
  },
  label: '',
  activeButton: false,
  deleteButton: false,
  editButton: false,
  restoreButton: false,
}

export const mockUserOwnedCardInfoProps = {
  base,
}
