import { IItemRequestForm } from './ItemRequestForm'

const base: IItemRequestForm = {
  label: '',
  openModal: false,
  handleClose: function (): void {
    throw new Error('Function not implemented.')
  },
}

export const mockItemRequestFormProps = {
  base,
}
