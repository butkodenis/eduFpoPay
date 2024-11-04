const express = require('express');
const app = express();
const morgan = require('morgan');

require('dotenv').config();

const { NODE_PORT, VITE_BASE_URL } = process.env;

app.use(morgan('combined'));

//const sequelize = require('./Utilites/dbConfig');
const syncDatabase = require('./Utilites/sync');

app.get('/api', (req, res) => {
  res.send(`Hello World! ${NODE_PORT}`);
});

app.listen(NODE_PORT, () => {
  console.log(`Server is listening on port  ${NODE_PORT}`);
});
