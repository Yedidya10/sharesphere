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
    owner: '',
    postingStatus: '',

    mainCategory: '',
    secondaryCategory: '',
    name: '',
    author: '',
    brand: '',
    description: '',
    imageUrl: '',
    allBorrowers: {
      currentBorrower: null,
      previousBorrowers: [],
    },
    requests: [],
    alertSubscribers: [],
  },
  label: '',
}

export const mockUserBorrowedCardInfoProps = {
  base,
}
