import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const port = 8888;

app.use(express.static(path.resolve('./')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(/.*/, (req, res, next) => {
		res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Some-Header');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, HEAD');
	res.header('Access-Control-Allow-Credentials', true);

	if (req.method.toLowerCase() === 'options') {
		return res.send();
	}

	next();
});

app.use('/long', (req, res) => {
	setTimeout(() => res.send('Long'), 1500);
});

app.use(/\/\d+/, (req, res) => {
	res.sendStatus(req.baseUrl.replace('/', ''));
});

app.use(/.*/, (req, res) => {
	const { body, params, query, headers } = req;

	res.header('Sync', true);
	res.json({ body, params, query, headers });
});

app.listen(port, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.info('Listening on port %s...', port);
	}
});