import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    throw err;
  }

  console.log(`server is running on port ${PORT}!!`);
  console.log(`running environment is ${process.env.NODE_ENV}`);
});
