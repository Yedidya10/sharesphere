import { IItemEditForm } from './ItemEditForm'

const base: IItemEditForm = {
  label: '',
  openModal: false,
  handleClose: function (): void {
    throw new Error('Function not implemented.')
  },
  formProps: undefined
}

export const mockItemEditFormProps = {
  base,
}
