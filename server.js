const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
const app = require('./app');

mongoose.connect(process.env.DB_LOCALHOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then(() => console.log('DB connection successful.'));

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

