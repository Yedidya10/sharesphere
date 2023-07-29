// Import the mongoose library to interact with MongoDB
import mongoose from 'mongoose';

// Define the structure of a User document using TypeScript interfaces
interface User {
  name: string;
  email: string;
  image: string;
  emailVerified: Date | null;
}

// Define the Mongoose schema for the User model
const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
  emailVerified: { type: Date },
});

// Create and return the Mongoose model for the User collection.
// If the model already exists, return the existing model; otherwise, create a new one.
const UserModel = mongoose.models.User || mongoose.model<User & mongoose.Document>('User', userSchema);

export default UserModel;
