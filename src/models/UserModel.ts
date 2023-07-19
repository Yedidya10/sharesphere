import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  image: {
    type: String,
  },
  address: {
    type: String,
  },
  ownedItems: {
    type: Array,
    default: []
  },
  borrowedItems: {
    type: Array,
    default: []
  }
})

userSchema.pre('validate', function (next) {
  const error = this.validateSync(); // Validate the document
  if (error) {
    const errorMessage = error.message; // Get the error message
    throw new Error(errorMessage); // Throw an error with the message
  }
  next();
});

const User = model('User', userSchema);

export default User;