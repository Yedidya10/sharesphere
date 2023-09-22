import { ISecondaryCategoryInput } from './SecondaryCategoryInput'
import { Control, UseFormWatch } from 'react-hook-form'
import { AddItemFormValues } from '@/utils/types/FormValues'

const base: ISecondaryCategoryInput = {
  label: '',
  control: {} as Control<AddItemFormValues>,
  watch: {} as UseFormWatch<AddItemFormValues>,
}

export const mockSecondaryCategoryInputProps = {
  base,
}
