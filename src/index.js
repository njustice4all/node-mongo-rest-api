import express from 'express';

import constants from './config/constants';
import './config/db';
import middlewares from './config/middlewares';
import apiRoutes from './modules';

const app = express();

middlewares(app);

apiRoutes(app);

app.get('/', (req, res) => {
  return res.status(200).json({ hey: 'man' });
});

app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  }

  console.log(`server is running on port ${constants.PORT}`);
  console.log(`running environment is ${process.env.NODE_ENV}`);
});
