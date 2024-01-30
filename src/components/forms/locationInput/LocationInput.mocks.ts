import { AddItemFormValues } from '@/utils/types/FormValues'
import { ILocationInput } from './LocationInput'

const base: ILocationInput = {
  label: '',
  control: {} as any,
  watch: {} as any,
  setValue: function (
    name: keyof AddItemFormValues,
    value: any,
    options?:
      | Partial<{ shouldValidate: boolean; shouldDirty: boolean }>
      | undefined
  ): void {
    throw new Error('Function not implemented.')
  },
}

export const mockLocationInputProps = {
  base,
}
