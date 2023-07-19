import { ISpringModal } from './SpringModal'

const base: ISpringModal = {
  label: '',
  children: undefined,
  onClose: function (): void {
    throw new Error('Function not implemented.')
  }
}

export const mockModalProps = {
  base,
}
