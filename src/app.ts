import express from 'express';
import https from 'https';
import sql from 'mssql';

const app = express();
const appIdentifier = process.env.APP_IDENTIFIER || 'local';
const port = process.env.PORT || 3000;
const sqlConnectionString = process.env.SQL_CONNECTION_STRING;

app.get('/', (req, res) => {
  res.send(`Hello ${appIdentifier}!<br/><br/><br/>Outbound IP:<br/><iframe src="/outbound" style="border:0;">`);
});

app.get('/time', (req, res) => {
  res.send(`${new Date().toISOString()}`);
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

app.get('/database', async (req, res) => {
  try {
    const pool = await sql.connect(sqlConnectionString);
    const persons = await pool.request().query("SELECT * from Persons");
  
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(persons.recordset));
  }
  catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});