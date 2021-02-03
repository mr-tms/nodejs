const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './.env' });

mongoose.connect(process.env.DB_LOCALHOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
  // eslint-disable-next-line
}).then(() => console.log('DB connection successful.'));

const port = process.env.PORT || 8081;
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`App listening on port ${port}`);
});
