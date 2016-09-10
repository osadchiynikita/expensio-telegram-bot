const express = require('express');
const packageInfo = require('../package.json');

const app = express();

app.get('/', (req, res) => {
  res.json({ version: packageInfo.version });
});

const server = app.listen(3000, '127.0.0.1', () => {
  const host = server.address().address;
  const port = server.address().port;

  console.info('Server is running at http://%s:%s', host, port);
});