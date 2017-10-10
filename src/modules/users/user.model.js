import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

import { passwordReg } from './user.validations';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required!'],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not valid email',
    },
  },
  firstName: {
    type: String,
    required: [true, 'FirstName is required!'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'LastName is required!'],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, 'Username is required!'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    trim: true,
    minlength: [6, 'Password need to be longer'],
    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: 'invalid password',
    },
  },
});

export default mongoose.model('User', UserSchema);
