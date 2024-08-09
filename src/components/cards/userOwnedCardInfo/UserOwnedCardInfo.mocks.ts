import { IUserOwnedCardInfo } from './UserOwnedCardInfo'

const base: IUserOwnedCardInfo = {
  isOwner: false,
  card: {
    ids: {},
    condition: 0,
    maxLoanPeriod: 0,
    location: {
      city: '',
      streetName: '',
      streetNumber: '',
      zipCode: '',
    },
    owner: '',
    postingStatus: '',
    mainCategory: '',
    secondaryCategory: '',
    name: '',
    author: '',
    brand: '',
    description: '',
    imageUrl: '',
    isAvailable: true,
  },
  label: '',
}

export const mockUserOwnedCardInfoProps = {
  base,
}
