import { IAddItemFormValues, ILocation } from '@/utils/types/formValues'
import {
  Control,
  UseFormResetField,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { ILocationInput } from './LocationInput'

const base: ILocationInput = {
  label: '',
  control: {} as Control<IAddItemFormValues>,
  watch: {} as UseFormWatch<IAddItemFormValues>,
  setValue: {} as UseFormSetValue<Partial<IAddItemFormValues>>,
  resetField: {} as UseFormResetField<Partial<IAddItemFormValues>>,
  userAddress: {} as ILocation,
}

export const mockLocationInputProps = {
  base,
}
