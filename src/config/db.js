import mongoose from 'mongoose';

import constants from './constants';

// remove the warning with promise
mongoose.Promise = global.Promise;

try {
  mongoose.connect(constants.DB_URL, {
    useMongoClient: true,
  });
} catch (error) {
  mongoose.createConnection(constants.DB_URL, {
    useMongoClient: true,
  });
}

mongoose.connection
  .once('open', () => {
    console.log('mongoDB is running');
  })
  .on('error', error => {
    throw error;
  });
