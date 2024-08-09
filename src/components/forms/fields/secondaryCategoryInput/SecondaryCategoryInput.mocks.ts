import { IAddItemFormValues } from '@/utils/types/formValues'
import { Control, UseFormWatch } from 'react-hook-form'
import { ISecondaryCategoryInput } from './SecondaryCategoryInput'

const base: ISecondaryCategoryInput = {
  label: '',
  control: {} as Control<IAddItemFormValues>,
  watch: {} as UseFormWatch<IAddItemFormValues>,
}

export const mockSecondaryCategoryInputProps = {
  base,
}
