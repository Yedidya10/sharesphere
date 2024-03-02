import { ISecondaryCategoryInput } from './SecondaryCategoryInput'
import { Control, UseFormWatch } from 'react-hook-form'
import { IAddItemFormValues } from '@/utils/types/FormValues'

const base: ISecondaryCategoryInput = {
  label: '',
  control: {} as Control<IAddItemFormValues>,
  watch: {} as UseFormWatch<IAddItemFormValues>,
}

export const mockSecondaryCategoryInputProps = {
  base,
}
