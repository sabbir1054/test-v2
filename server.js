const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const colors = require('colors');

// database connection
mongoose.connect(process.env.DATABASE).then(() => {
    console.log(`Database connected successfully`.red.bold);
  });

const app = require('./app');

// port connection
const port = process.env.PORT || 4040;

app.listen(port, () => {
    console.log(`Server is running at ${port}`.yellow.bold);
})