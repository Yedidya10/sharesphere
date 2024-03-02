import { IMainCategoryInput } from './MainCategoryInput'
import { Control, UseFormWatch } from 'react-hook-form'
import { IAddItemFormValues } from '@/utils/types/FormValues'

const base: IMainCategoryInput = {
  label: '',
  control: {} as Control<IAddItemFormValues>,
  watch: {} as UseFormWatch<IAddItemFormValues>,
}

export const mockMainCategoryInputProps = {
  base,
}
