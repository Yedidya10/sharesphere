import { IMainCategoryInput } from './MainCategoryInput'
import { Control, UseFormWatch } from 'react-hook-form'
import { AddItemFormValues } from '@/utils/types/FormValues'

const base: IMainCategoryInput = {
  label: '',
  control: {} as Control<AddItemFormValues>,
  watch: {} as UseFormWatch<AddItemFormValues>,
}

export const mockMainCategoryInputProps = {
  base,
}
