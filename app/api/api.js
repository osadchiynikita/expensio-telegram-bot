const express = require('express');
const bodyParser = require('body-parser');
const PrettyError = require('pretty-error');
const http = require('http');
const utils = require('../utils');
// const db = require('./db');

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.send('API is running');
});

// app.get('/search', (req, res) => {
//   parser('http://www.crossfitmayhem.com/feed/', function(err, articles) {
//     if (err) throw err;
//     // Each article has the following properties:
//     // 
//     //   * "title"     - The article title (String).
//     //   * "author"    - The author's name (String).
//     //   * "link"      - The original article link (String).
//     //   * "content"   - The HTML content of the article (String).
//     //   * "published" - The date that the article was published (Date).
//     //   * "feed"      - {name, source, link}
//     const random = utils.getRandom(articles);
//     res.send(random);
//   });
// });

const apiServer = app.listen(3030, '127.0.0.1', () => {
  const host = apiServer.address().address;
  const port = apiServer.address().port;

  console.info('API Server is running at http://%s:%s', host, port);
});