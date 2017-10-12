import passport from 'passport';
import LocalStrategy from 'passport-local';

import User from '../modules/users/user.model.js';

const localOptions = {
  usernameField: 'email',
};

const localStrategy = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false);
    } else if (!user._authenticateUser(password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    // return error, no user!
    return done(error, false);
  }
});

passport.use(localStrategy);

export const authLocal = passport.authenticate('local', { session: false });
