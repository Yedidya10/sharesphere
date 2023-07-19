export default function validateBarcode(barcode: number | string): boolean {
    // Convert the input to a string and remove any non-digit characters
    const barcodeString: string = String(barcode).replace(/[-\s]/g, '');
  
    // Check if the length is either 12 or 13
    if (barcodeString.length !== 12 && barcodeString.length !== 13) {
      return false;
    }
  
    // Calculate and validate EAN-13 check digit
    if (barcodeString.length === 13) {
      const checkDigit: number = Number(barcodeString[12]);
      const sum: number = barcodeString
        .slice(0, 12)
        .split('')
        .map((digit, index) => Number(digit) * (index % 2 === 0 ? 1 : 3))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
      const calculatedCheckDigit: number = (10 - (sum % 10)) % 10;
      return checkDigit === calculatedCheckDigit;
    }
  
    // Calculate and validate UPC-A check digit
    if (barcodeString.length === 12) {
      const checkDigit: number = Number(barcodeString[11]);
      const sum: number = barcodeString
        .slice(0, 11)
        .split('')
        .map((digit, index) => Number(digit) * (index % 2 === 0 ? 3 : 1))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
      const calculatedCheckDigit: number = (10 - (sum % 10)) % 10;
      return checkDigit === calculatedCheckDigit;
    }
  
    return false;
  }
  