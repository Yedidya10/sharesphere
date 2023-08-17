import { IItemRequestForm } from './ItemRequestForm'

const base: IItemRequestForm = {
  label: '',
  open: false,
  maxLoanPeriod: 0,
  cardId: ''
}

export const mockItemRequestFormProps = {
  base,
}
