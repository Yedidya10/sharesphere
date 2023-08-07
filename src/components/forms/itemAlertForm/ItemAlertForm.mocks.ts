import { IItemAlertForm } from './ItemAlertForm'

const base: IItemAlertForm = {
  label: '',
  openModal: false,
  handleClose: function (): void {
    throw new Error('Function not implemented.')
  },
}

export const mockItemAlertFormProps = {
  base,
}
