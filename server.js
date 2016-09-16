const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const sio = require('socket.io');
const path = require('path');

module.exports = (test) => {
  const app = express();
  const server = http.Server(app);
  const io = sio(server);

  app.use(express.static(path.resolve('./')));

  if (test) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(/.*/, (req, res, next) => {
      res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Foo-Header, Bar-Header, Baz-Header'
      );
      res.header(
        'Access-Control-Expose-Headers',
        'Foo-Header, Bar-Header, Baz-Header'
      );
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, HEAD');
      res.header('Access-Control-Allow-Credentials', true);

      if (req.method.toLowerCase() === 'options') {
        return res.send();
      }

      next();
    });

    app.use('/timeout/:timeout', (req, res) => {
      setTimeout(() => res.send('Long'), parseInt(req.params.timeout));
    });

    app.use('/status/:status', (req, res) => {
      res.sendStatus(parseInt(req.params.status));
    });

    app.use(/.*/, (req, res) => {
      const { body, query, headers } = req;

      res.header('Foo-Header', 'Foo');
      res.header('Bar-Header', 'Bar');
      res.header('Baz-Header', 'Baz');

      res.json({ body, query, headers });
    });
  }

  app.use(/.*/, (req, res) => {
    res.sendFile(path.resolve('./index.html'));
  });

  return {
    listen(port) {
      return new Promise((resolve, reject) => {
        port = port || 8888;

        server.listen(port, (error) => {
          if (error) {
            console.error(error);

            reject(error);
          } else {
            console.info('Listening on port %s...', port);

            resolve();
          }
        });
      });
    },
    io
  };
};
