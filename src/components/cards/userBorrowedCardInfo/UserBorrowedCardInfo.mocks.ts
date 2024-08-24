import { IUserBorrowedCardInfo } from './UserBorrowedCardInfo'

const base: IUserBorrowedCardInfo = {
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
    ownerId: '',
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

export const mockUserBorrowedCardInfoProps = {
  base,
}
