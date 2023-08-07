import { ICardInfo } from './CardInfo'

const base: ICardInfo = {
  label: '',
  heading: '',
  description: '',
  author: '',
  imageSrc: '',
  alt: '',
  openModal: false,
  handleClose: function (): void {
    throw new Error('Function not implemented.')
  },
  isAvailable: false,
  ownerId: '',
  itemCondition: '',
  maxLoanPeriod: '',
  itemLocation: {
    city: '',
    streetName: '',
    streetNumber: '',
    zipCode: ''
  }
}

export const mockCardInfoProps = {
  base,
}
