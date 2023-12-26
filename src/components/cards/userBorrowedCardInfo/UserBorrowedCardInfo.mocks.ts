import { IUserBorrowedCardInfo } from './UserBorrowedCardInfo'

const base: IUserBorrowedCardInfo = {
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
    owner: '',
    status: '',
    imageUrl: '',
    details: {
      mainCategory: '',
      secondaryCategory: '',
      name: '',
      author: '',
      brand: '',
      description: '',
    }
  },
  label: '',
}

export const mockUserBorrowedCardInfoProps = {
  base,
}
