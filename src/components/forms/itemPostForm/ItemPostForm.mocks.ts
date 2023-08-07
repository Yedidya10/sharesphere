import { IItemPostForm } from './ItemPostForm'

const base: IItemPostForm = {
  label: '',
  openModal: false,
  handleClose: function (): void {
    throw new Error('Function not implemented.')
  },
}

export const mockItemPostFormProps = {
  base,
}
