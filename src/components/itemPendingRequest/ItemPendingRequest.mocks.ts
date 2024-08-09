import { IItemPendingRequest } from './ItemPendingRequest'

const base: IItemPendingRequest = {
  sampleTextProp: 'Hello world!',
  label: '',
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
}

export const mockItemPendingRequestProps = {
  base,
}
