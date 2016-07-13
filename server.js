const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');

const httpsPort = 443;
const httpPort = 80;

app.use(express.static(path.join(__dirname, 'public')));

const httpServer = http.createServer(app);

httpServer.get('*', res => {
	res.redirect('https://axonai.ai');
});

httpServer.listen(httpPort);

console.log('HTTP server started on port: ${httpPort}')

const certPath = '/etc/letsencrypt/live/axonai.ai/';
const certKeyPath = certPath + 'privkey.pem';
const certFilePath = certPath + 'cert.pem';

const privateKey  = fs.readFileSync(certKeyPath, 'utf8');
const certificate = fs.readFileSync(certFilePath, 'utf8');

const credentials = {key: privateKey, cert: certificate};
const httpsServer = https.createServer(credentials, app);

//httpServer.listen(8080);
httpsServer.listen(httpsPort);

console.log(`Server started on port: ${httpsPort}`);
