import http from 'node:http';
const PORT = 36000;

const server = http.createServer((req, res) => {
	const { url, method } = req;

	if (url === '/') {
		console.log('MAIN URL');
		console.log(method);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json; charset=utf-8');
		res.end('{"message": "Welcome to the main"}');
	}

	if (url === '/api') {
		console.log('API URL');
		console.log(method);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json; charset=utf-8');
		res.end('{"message": "Welcome to the API"}');
	}
});

server.listen(PORT, () => {
	console.log('Server listening on port', PORT);
});
