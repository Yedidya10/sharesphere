import { IAddItemFormValues } from '@/utils/types/formValues'
import { Control, UseFormWatch } from 'react-hook-form'
import { IMainCategoryInput } from './MainCategoryInput'

const base: IMainCategoryInput = {
  label: '',
  control: {} as Control<IAddItemFormValues>,
  watch: {} as UseFormWatch<IAddItemFormValues>,
}

export const mockMainCategoryInputProps = {
  base,
}
