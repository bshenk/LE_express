const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');

const httpsPort = 443;
const httpPort = 80;

// HTTP
// Redirect from http port 80 to https
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);

// HTTPS
const certPath = '/etc/letsencrypt/live/axonai.ai/';
const certKeyPath = certPath + 'privkey.pem';
const certFilePath = certPath + 'cert.pem';

const privateKey  = fs.readFileSync(certKeyPath, 'utf8');
const certificate = fs.readFileSync(certFilePath, 'utf8');

const credentials = {key: privateKey, cert: certificate};

app.use(express.static(path.join(__dirname, 'public')));

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(httpsPort);

console.log(`Server started on port: ${httpsPort}`);
