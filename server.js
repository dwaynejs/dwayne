const express = require('express');
const path = require('path');
const app = express();
const port = 8888;

app.use(express.static(path.resolve('./')));

app.get(/.*/, (req, res) => {
	res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, HEAD');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Sync', true);
	console.log(req);
	res.send();
});

app.listen(port, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.info('Listening on port %s...', port);
	}
});