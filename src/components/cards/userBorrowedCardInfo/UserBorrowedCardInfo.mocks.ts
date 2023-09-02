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
    details: {
      mainCategory: '',
      secondaryCategory: '',
      tertiaryCategory: '',
      name: '',
      author: '',
      brand: '',
      description: '',
      imageUrl: ''
    }
  },
  label: '',
}

export const mockUserBorrowedCardInfoProps = {
  base,
}
