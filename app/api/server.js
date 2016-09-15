'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const routes = require('./routes');
const database = require('./database');

const app = express();
const server = new http.Server(app);

app.use(bodyParser.json());

app.use('/api', routes);

app.get('/api', (req, res) => {
  res.send('API is running');
});

const apiServer = app.listen(3030, '127.0.0.1', () => {
  const host = apiServer.address().address;
  const port = apiServer.address().port;

  console.info('API Server is running at http://%s:%s', host, port);
});