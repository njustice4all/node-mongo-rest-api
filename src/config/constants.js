const config = {
  development: {
    DB_URL: 'mongodb://localhost/node-mongo-rest-api-dev',
    JWT_SECRET: 'hellojwt',
  },
  production: {
    DB_URL: 'mongodb://localhost/node-mongo-rest-api-prod',
  },
  test: {
    DB_URL: 'mongodb://localhost/node-mongo-rest-api-test',
  },
};

const getConfig = env => config[env];

const defaultConfig = {
  PORT: process.env.PORT || 3000,
};

export default {
  ...defaultConfig,
  ...getConfig(process.env.NODE_ENV),
};
