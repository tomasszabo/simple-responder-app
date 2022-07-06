import express from 'express';
import https from 'https';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!<br/><br/><br/>Outbound IP:<br/><iframe src="/outbound" style="border:0;">');
});

app.get('/outbound', (req, res) => {
  const options = {
		hostname: 'api.ipify.org',
		port: 443,
		path: '/?format=json',
		method: 'GET',
	};

	res.setHeader('Content-Type', 'text/plain');

	const call = https.request(options, response => {
		response.on('data', d => {
			res.send(d.toString());
		});
	});

	call.on('error', error => {
		res.send(error);
	});

	call.end();
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});