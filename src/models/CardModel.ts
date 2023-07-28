import { Schema, model, models } from 'mongoose'

const bookCardSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  brand: {
    type: String,
  },
  publisher: {
    type: String,
  },
  description: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  imageAlt: {
    type: String,
  },
  ISBN: {
    type: Number,
  },
  danacode: {
    type: Number,
  },
  barcode: {
    type: Number,
  },
  condition: {
    type: Schema.Types.Decimal128,
    require: true,
  },
  maxLoanPeriod: {
    type: Number,
    require: true,
  },
  currentLocation: {
    type: String,
    require: true,
  },
})

bookCardSchema.pre('validate', function (next) {
  const error = this.validateSync(); // Validate the document
  if (error) {
    const errorMessage = error.message; // Get the error message
    throw new Error(errorMessage); // Throw an error with the message
  }
  next();
});

const BookCard = model('BookCard', bookCardSchema);

export default BookCard;