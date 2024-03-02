export const regexEnglishWordsPattern = /^[A-Za-z\s:,"'.()-]+$/u // English text, hyphens, colons, commas, quotes, periods, parentheses
export const regexHebrewWordsPattern = /^[\u0590-\u05FF\s:,"'.()-]+$/u // Hebrew text, hyphens, colons, commas, quotes, periods, parentheses
export const regexItemEnglishTitlePattern = /^[A-Za-z\s0-9:-]+$/u // English text, numbers, hyphens, colons
export const regexItemHebrewTitlePattern = /^[\u0590-\u05FF\s0-9:-]+$/u // Hebrew text, numbers, hyphens, colons
export const regexAuthorHebrewNamePattern = /^[\u0590-\u05FF\s-]+$/u // Hebrew text, hyphens
export const regexAuthorEnglishNamePattern = /^[A-Za-z\s-]+$/u // English text, hyphens
export const regexBrandEnglishNamePattern = /^[A-Za-z\s-]+$/u // English text, hyphens
export const regexBrandHebrewNamePattern = /^[\u0590-\u05FF\s-]+$/u // Hebrew text, hyphens
export const regexImageUrlPattern =
  /https?:\/\/[^\s\/$.?#].[^\s]*\.(?:jpg|jpeg|png|gif|bmp|svg|webp|ico|tiff?)/m // image url
export const regexGoogleProfileImageUrlPattern =
  /https?:\/\/[^\s\/$.?#]*googleusercontent[^\s]*/m
// Google image url
export const regexDanacodePattern = /^\d{12}$/ // 12 digits
export const regexIsbnPattern = /^(\d{10}|\d{13})$/ // 10 or 13 digits
export const regexBarcodePattern = /^\d{12,13}$/ // 12-13 digits
export const regexMaxLoanPeriodPattern = /^(?:[3-9]|1[0-4])$/ // 3-14 days
export const regexAddressNumberPattern = /^[0-9]{1,3}$/ // 1-3 digits
export const regexAddressNamePattern = /^[\u0590-\u05FF\s"']+$/u // hebrew text
export const regexSevenZipCodePattern = /^[0-9]{7}$/ // 7 digits
export const regexPhoneNumberPattern = /^\d{10}$/ // 10 digits
export const firstAndLastEnglishNamePattern = /^[A-Za-z\s-]+$/u // English text, hyphens
export const firstAndLastHebrewNamePattern = /^[\u0590-\u05FF\s-]+$/u // Hebrew text, hyphens

