import { SetStateAction } from 'react'
import { IItemRequestForm } from './ItemRequestForm'

const base: IItemRequestForm = {
  label: '',
  open: false,
  maxLoanPeriod: 0,
  cardId: '',
  requests: [],
  handleRequestFormClose: function (): void {
    throw new Error('Function not implemented.')
  },
  setIsUserAlreadyRequest: function (value: SetStateAction<boolean>): void {
    throw new Error('Function not implemented.')
  }
}

export const mockItemRequestFormProps = {
  base,
}
