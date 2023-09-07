export const regexTextPattern = /^[A-Ta-t\s\u0590-\u05FF:-]+$/u // English and Hebrew text, hyphens, and colons
export const regexImageUrlPattern =
  /https?:\/\/[^\s\/$.?#].[^\s]*\.(?:jpg|jpeg|png|gif|bmp|svg|webp|ico|tiff?)/m // image url
export const regexDanacodePattern = /^\d{12}$/ // 12 digits
export const regexIsbnPattern =
  /^(?:\d{9}[\dXx]?|\d{3}-\d{3}-\d{3}-[Xx]?|\d{3}-\d{3}-\d{1}-[Xx]?|\d{10}(?:\d{3})|\d{10}(?:\d{3}?)|(?:\d{3}-?){3}\d{1,7}[Xx]|\d{3}-\d{3}-\d{3}-\d{3}-(\d|X|x)|\d{3}-\d{3}-\d{3}-\d{1})$/
export const regexBarcodePattern = /^\d{12,13}$/ // 12-13 digits
export const regexMaxLoanPeriodPattern = /^(?:[3-9]|1[0-4])$/ // 3-14 days
export const regexAddressNumberPattern = /^[0-9]{1,3}$/ // 1-3 digits
export const regexAddressNamePattern = /^[א-ת\s]+$/u // hebrew text
export const regexZipCodePattern = /^[0-9]{7}$/ // 7 digits
