import User from './user.model';

export const signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(401).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
