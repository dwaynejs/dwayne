import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

app.use(express.static(path.resolve('./')));

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

export default (port) => new Promise((resolve, reject) => {
  port = port || 8888;

  app.listen(port, (error) => {
    if (error) {
      console.error(error);
      reject(error);
    } else {
      console.info('Listening on port %s...', port);
      resolve();
    }
  });
});
