import { IItemCard } from './ItemCard'

const base: IItemCard = {
  label: '',
  imageWidth: 0,
  imageHeight: 0,
  item: {
    ids: {
      barcode: '',
    },
    name: '',
    description: '',
    imageUrl: '',
    maxLoanPeriod: 0,
    condition: 0,
    isAvailable: true,
    mainCategory: '',
    secondaryCategory: '',
    location: {
      city: '',
      streetName: '',
      streetNumber: '',
      zipCode: '',
      country: '',
    },
    ownerId: '',
    postingStatus: '',
  },
}

export const mockItemCardProps = {
  base,
}
