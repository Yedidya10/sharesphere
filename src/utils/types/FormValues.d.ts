export interface AddItemFormValues {
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
  city: string
  streetName: string
  streetNumber: string
  zipCode?: string
}

export interface ItemEditFormValues {
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
  maxLoanPeriod: string
  city: string
  streetName: string
  streetNumber: string
  zipCode: string
}

export interface ItemRequestFormValues {
  message: string
  startDate: string
  endDate: string
}

export interface ItemAlertFormValues {
  startDate: string
  endDate: string
}

export interface EditProfileFormValues {
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

export interface RegisterFormValues {}

export interface LoginFormValues {}

export interface ResetPasswordFormValues {}

export interface ForgotPasswordFormValues {}

export interface ChangePasswordFormValues {}
