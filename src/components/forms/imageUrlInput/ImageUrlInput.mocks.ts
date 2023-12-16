import { ErrorOption } from 'react-hook-form'
import { IImageUrlInput } from './ImageUrlInput'

const base: IImageUrlInput = {
  label: '',
  control: {} as any,
  watch: {} as any,
  setError: function (name: 'imageUrl' | 'maxLoanPeriod' | 'isbn' | 'danacode' | 'barcode' | 'mainCategory' | 'secondaryCategory' | 'tertiaryCategory' | 'author' | 'brand' | 'description' | 'city' | 'streetName' | 'streetNumber' | 'zipCode' | 'itemName' | 'root' | `root.${string}` | 'itemCondition', error: ErrorOption, options?: { shouldFocus: boolean } | undefined): void {
    throw new Error('Function not implemented.')
  },
  clearErrors: function (name?: 'imageUrl' | 'maxLoanPeriod' | 'isbn' | 'danacode' | 'barcode' | 'mainCategory' | 'secondaryCategory' | 'tertiaryCategory' | 'author' | 'brand' | 'description' | 'city' | 'streetName' | 'streetNumber' | 'zipCode' | 'itemName' | 'root' | `root.${string}` | 'itemCondition' | ('imageUrl' | 'maxLoanPeriod' | 'isbn' | 'danacode' | 'barcode' | 'mainCategory' | 'secondaryCategory' | 'tertiaryCategory' | 'author' | 'brand' | 'description' | 'city' | 'streetName' | 'streetNumber' | 'zipCode' | 'itemName' | 'itemCondition')[] | readonly ('imageUrl' | 'maxLoanPeriod' | 'isbn' | 'danacode' | 'barcode' | 'mainCategory' | 'secondaryCategory' | 'tertiaryCategory' | 'author' | 'brand' | 'description' | 'city' | 'streetName' | 'streetNumber' | 'zipCode' | 'itemName' | 'itemCondition')[] | undefined): void {
    throw new Error('Function not implemented.')
  }
}

export const mockImageUrlInputProps = {
  base,
}
