import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: [3, 'Please provide valid name']
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide valid email']
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
