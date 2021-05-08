const env = require('dotenv');
env.config();
const routes = require('./routes/index.route');

const express = require('express');
const app = express();
app.use(express.json());

const port = process.env.PORT_MOVIES || 3000;

const BASE_URL = '/fullstack';

app.use(BASE_URL, routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})