const express = require('express');
const app = express();
require('dotenv').config();

const { NODE_PORT, VITE_BASE_URL } = process.env;

app.get('/', (req, res) => {
  res.send(`Hello World! ${NODE_PORT}`);
});

app.listen(NODE_PORT, () => {
  console.log(`Server is listening on port  ${NODE_PORT}`);
});
