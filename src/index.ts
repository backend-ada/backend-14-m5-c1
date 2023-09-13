import db from '../src/database/db.json';
import http from 'node:http';
import fs from 'node:fs';
import crypto from 'node:crypto';

const PORT = 45000;

const server = http.createServer((req, res) => {
	const { url, method } = req;

	if (method === 'GET') {
		if (url === '/api') {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 200;
			return res.end(JSON.stringify(db.description));
		}

		if (url === '/api/students') {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 200;
			return res.end(JSON.stringify(db.students));
		}

		if (url === '/api/teachers') {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = 200;
			return res.end(JSON.stringify(db.teachers));
		}

		res.statusCode = 404;
		return res.end('Not found...');
	}

	if (method === 'POST') {
		let body = '';

		if (url === '/api/students') {
			req.on('data', (chunk) => {
				body += chunk.toString();
			});

			req.on('end', () => {
				const data = JSON.parse(body);
				const { name, age } = data;
				const id = crypto.randomUUID();

				db.students.push({
					id,
					name,
					age,
				});

				fs.writeFileSync('./src/database/db.json', JSON.stringify(db));

				res.statusCode = 201; // Content created
				return res.end(JSON.stringify({ id, name, age }));
			});

			return;
		}

		if (url === '/api/teachers') {
			req.on('data', (chunk) => {
				body += chunk.toString();
				console.log(body);
			});

			req.on('end', () => {
				const data = JSON.parse(body);

				console.log(11111, data);

				res.statusCode = 201;
				return res.end(JSON.stringify(data));
			});

			return;
		}
	}

	res.statusCode = 404;
	return res.end('Not found...');
});

server.listen(PORT, () => {
	console.log('Server listening on port', PORT);
});
