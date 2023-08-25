import { IUserBorrowedCardInfo } from './UserBorrowedCardInfo'

const base: IUserBorrowedCardInfo = {
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
}

export const mockUserBorrowedCardInfoProps = {
  base,
}
