import HttpStatus from 'http-status';

import User from './user.model';

export const signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(HttpStatus.CREATED).json(user.toAuthJSON());
  } catch (error) {
    return res.status(HttpStatus.BAD_REQUEST).json(error);
  }
};

export const login = async (req, res, next) => {
  res.status(HttpStatus.OK).json(req.user.toAuthJSON());
  return next();
};
