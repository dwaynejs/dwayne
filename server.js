const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const sio = require('socket.io');
const path = require('path');

module.exports = () => {
  const app = express();
  const server = http.Server(app);
  const io = sio(server);

  app.use(express.static(path.resolve('./')));

  app.use(/.*/, (req, res) => {
    res.sendFile(path.resolve('index.html'));
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
