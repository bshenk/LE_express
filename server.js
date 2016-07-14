const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const subdomain = require('express-subdomain');

const httpsPort = 443;
const httpPort = 80;

// HTTP Server - Redirect from http port 80 to https
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(httpPort);

console.log(`HTTP server started on port: ${httpPort}`);

// HTTPS server
const certPath = '/etc/letsencrypt/live/axonai.ai/',
	certKeyPath = `${certPath}privkey.pem`,
	certFilePath = `${certPath}cert.pem`,
	privateKey  = fs.readFileSync(certKeyPath, 'utf8'),
	certificate = fs.readFileSync(certFilePath, 'utf8'),
	credentials = {key: privateKey, cert: certificate};

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: 'https://axonai.ai' }));

// AXONPARSE subdomain
const router = express.Router();

router.get('/', (req, res) => {
	res.send('WELCOME TO PARSE!!!!');
});

app.use(subdomain('parse', router));


const httpsServer = https.createServer(credentials, app);
httpsServer.listen(httpsPort);

console.log(`HTTPS server started on port: ${httpsPort}`);
