export interface ILocation {
  city: string
  streetName: string
  streetNumber: string
  zipCode?: string
  country: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface IAddItemFormValues extends ILocation {
  mainCategory: string
  secondaryCategory: string
  isbn: string
  danacode: string
  barcode: string
  itemName: string
  author: string
  brand: string
  imageUrl: string
  description: string
  itemCondition: string
  maxLoanPeriod: string
}

export interface IItemEditFormValues extends IAddItemFormValues {}

export type ItemRequestFormValues = {
  pickupDate: string
  returnDate: string
  message: string
}

export type ItemAlertFormValues = {
  pickupDate: string
  returnDate: string
}

export type EditProfileFormValues = {
  firstName: string
  lastName: string
  email: string
  imageUrl: string
  phone: string
  city: string
  streetName: string
  streetNumber: string
  zipCode: string
  country: string
}

export type RegisterFormValues = {}

export type LoginFormValues = {}

export type ResetPasswordFormValues = {}

export type ForgotPasswordFormValues = {}

export type ChangePasswordFormValues = {}
