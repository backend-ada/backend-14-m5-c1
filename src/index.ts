import http from 'node:http';
const PORT = 36000;

const server = http.createServer((req, res) => {
    console.log(req.url);    
    console.log(req.headers);    
    console.log(req.method);
    console.log(req.statusCode);    
	res.end('Hello world!');
});

server.listen(PORT, () => {
	console.log('Server listening on port', PORT);
});
