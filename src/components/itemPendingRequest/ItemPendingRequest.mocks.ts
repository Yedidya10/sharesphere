import { Request } from '@/utils/types/request'
import { SetStateAction } from 'react'
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
  pendingRequests: [],
  setPendingRequests: function (value: SetStateAction<Request[]>): void {
    throw new Error('Function not implemented.')
  },
  onAllRequestsProcessed: function (itemId: string): void {
    throw new Error('Function not implemented.')
  }
}

export const mockItemPendingRequestProps = {
  base,
}
