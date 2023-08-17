import { ICardModal } from './CardModal'

const base: ICardModal = {
  openModal: false,
  handleClose: function (): void {
    throw new Error('Function not implemented.')
  },
  label: '',
  card: undefined!,
}

export const mockCardModalProps = {
  base,
}
