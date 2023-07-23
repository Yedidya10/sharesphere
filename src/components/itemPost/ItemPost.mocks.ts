import { IItemPost } from './ItemPost'

const base: IItemPost = {
  label: '',
  openModal: false,
  handleClose: function (): void {
    throw new Error('Function not implemented.')
  }
}

export const mockItemPostProps = {
  base,
}
