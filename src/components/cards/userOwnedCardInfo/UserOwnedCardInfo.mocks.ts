import { IUserOwnedCardInfo } from './UserOwnedCardInfo'

const base: IUserOwnedCardInfo = {
  isAvailable: false,
  isOwner: false,
  card: {
    cardIds: {},
    condition: 0,
    maxLoanPeriod: 0,
    location: {
      city: '',
      streetName: '',
      streetNumber: '',
      zipCode: '',
    },
    imagesUrl: [],
    owner: '',
    status: '',
    details: {
      mainCategory: '',
      secondaryCategory: '',
      tertiaryCategory: '',
      name: '',
      author: '',
      brand: '',
      description: '',
    }

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
