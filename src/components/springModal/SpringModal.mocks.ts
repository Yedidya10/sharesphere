import { ISpringModal } from './SpringModal'

const base: ISpringModal = {
  label: '',
  children: undefined,
  openModal: false,
  handleClose: function (): void {
    throw new Error('Function not implemented.')
  }
}

export const mockModalProps = {
  base,
}
