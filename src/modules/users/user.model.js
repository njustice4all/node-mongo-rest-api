import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

import { passwordReg } from './user.validations';
import constants from '../../config/constants';

const UserSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hassPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  _hassPassword(password) {
    return hashSync(password);
  },
  _authenticateUser(password) {
    return compareSync(password, this.password);
  },
  _createToken() {
    return jwt.sign({ _id: this._id }, constants.JWT_SECRET);
  },
  // override toJSON
  toJSON() {
    return {
      _id: this._id,
      userName: this.userName,
    };
  },
  toAuthJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      token: `JWT ${this._createToken()}`,
    };
  },
};

export default mongoose.model('User', UserSchema);
