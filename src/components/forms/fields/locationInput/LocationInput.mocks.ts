import { IAddItemFormValues, ILocation } from '@/utils/types/FormValues'
import { ILocationInput } from './LocationInput'
import {
  UseFormResetField,
  UseFormSetValue,
  Control,
  UseFormWatch,
} from 'react-hook-form'

const base: ILocationInput = {
  label: '',
  control: {} as Control<IAddItemFormValues>,
  watch: {} as UseFormWatch<IAddItemFormValues>,
  setValue: {} as UseFormSetValue<Partial<IAddItemFormValues>>,
  resetField: {} as UseFormResetField<Partial<IAddItemFormValues>>,
  userAddress: {} as ILocation,
  trigger: function (name?: 'mainCategory' | 'secondaryCategory' | 'isbn' | 'danacode' | 'barcode' | 'itemName' | 'author' | 'brand' | 'imageUrl' | 'description' | 'itemCondition' | 'maxLoanPeriod' | 'city' | 'streetName' | 'streetNumber' | 'zipCode' | 'country' | 'coordinates' | 'coordinates.lat' | 'coordinates.lng' | ('mainCategory' | 'secondaryCategory' | 'isbn' | 'danacode' | 'barcode' | 'itemName' | 'author' | 'brand' | 'imageUrl' | 'description' | 'itemCondition' | 'maxLoanPeriod' | 'city' | 'streetName' | 'streetNumber' | 'zipCode' | 'country' | 'coordinates' | 'coordinates.lat' | 'coordinates.lng')[] | readonly ('mainCategory' | 'secondaryCategory' | 'isbn' | 'danacode' | 'barcode' | 'itemName' | 'author' | 'brand' | 'imageUrl' | 'description' | 'itemCondition' | 'maxLoanPeriod' | 'city' | 'streetName' | 'streetNumber' | 'zipCode' | 'country' | 'coordinates' | 'coordinates.lat' | 'coordinates.lng')[] | undefined, options?: Partial<{ shouldFocus: boolean }> | undefined): Promise<boolean> {
    throw new Error('Function not implemented.')
  }
}

export const mockLocationInputProps = {
  base,
}
