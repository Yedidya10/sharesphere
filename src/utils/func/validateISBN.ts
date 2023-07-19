export default function validateISBN(isbn: number | string): boolean {
    // Convert the input to a string and remove any non-digit characters
    const isbnString: string = String(isbn).replace(/[-\s]/g, '');
  
    // Check if the length is either 10 or 13
    if (isbnString.length !== 10 && isbnString.length !== 13) {
      return false;
    }
  
    // Calculate and validate ISBN-13 check digit
    if (isbnString.length === 13) {
      const checkDigit: number = Number(isbnString[12]);
      const sum: number = isbnString
        .slice(0, 12)
        .split('')
        .map((digit, index) => Number(digit) * (index % 2 === 0 ? 1 : 3))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
      const calculatedCheckDigit: number = (10 - (sum % 10)) % 10;
      return checkDigit === calculatedCheckDigit;
    }
  
    // Calculate and validate ISBN-10 check digit
    if (isbnString.length === 10) {
      const checkDigit: string = isbnString[9];
      const sum: number = isbnString
        .slice(0, 9)
        .split('')
        .map((digit, index) => Number(digit) * (index + 1))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
      const calculatedCheckDigit: number = sum % 11 === 0 ? 0 : (11 - (sum % 11));
      return String(calculatedCheckDigit) === checkDigit;
    }
  
    return false;
  }
  