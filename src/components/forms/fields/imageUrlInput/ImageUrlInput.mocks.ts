import { ErrorOption } from 'react-hook-form'
import { IImageUrlInput } from './ImageUrlInput'

const base: IImageUrlInput = {
  label: '',
  control: {} as any,
  watch: {} as any,
  setError: function (name: 'root' | `root.${string}` | 'imageUrl' | 'mainCategory' | 'secondaryCategory' | 'isbn' | 'danacode' | 'barcode' | 'itemName' | 'author' | 'brand' | 'description' | 'itemCondition' | 'maxLoanPeriod' | 'city' | 'streetName' | 'streetNumber' | 'zipCode' | 'country' | 'coordinates' | 'coordinates.lat' | 'coordinates.lng', error: ErrorOption, options?: { shouldFocus: boolean } | undefined): void {
    throw new Error('Function not implemented.')
  },
  clearErrors: function (name?: 'root' | `root.${string}` | 'imageUrl' | 'mainCategory' | 'secondaryCategory' | 'isbn' | 'danacode' | 'barcode' | 'itemName' | 'author' | 'brand' | 'description' | 'itemCondition' | 'maxLoanPeriod' | 'city' | 'streetName' | 'streetNumber' | 'zipCode' | 'country' | 'coordinates' | 'coordinates.lat' | 'coordinates.lng' | ('imageUrl' | 'mainCategory' | 'secondaryCategory' | 'isbn' | 'danacode' | 'barcode' | 'itemName' | 'author' | 'brand' | 'description' | 'itemCondition' | 'maxLoanPeriod' | 'city' | 'streetName' | 'streetNumber' | 'zipCode' | 'country' | 'coordinates' | 'coordinates.lat' | 'coordinates.lng')[] | readonly ('imageUrl' | 'mainCategory' | 'secondaryCategory' | 'isbn' | 'danacode' | 'barcode' | 'itemName' | 'author' | 'brand' | 'description' | 'itemCondition' | 'maxLoanPeriod' | 'city' | 'streetName' | 'streetNumber' | 'zipCode' | 'country' | 'coordinates' | 'coordinates.lat' | 'coordinates.lng')[] | undefined): void {
    throw new Error('Function not implemented.')
  }
}

export const mockImageUrlInputProps = {
  base,
}
