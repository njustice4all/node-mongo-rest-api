import userRoutes from './users/user.routes';
import { authJwt } from '../services/auth.services';

export default app => {
  app.use('/api/users', userRoutes);
  app.get('/hello', authJwt, (req, res) => {
    res.send('if you see this, you have authorized');
  });
};
