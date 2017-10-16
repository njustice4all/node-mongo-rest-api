import userRoutes from './users/user.routes';
import postRoutes from './posts/post.routes';

export default app => {
  app.use('/api/users', userRoutes);
  app.use('/api/posts', postRoutes);
};
