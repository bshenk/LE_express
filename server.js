const express = require('express');
const app = express();
const path = require('path');
const https = require('https');

const port = 443;

app.use(express.static(path.join(__dirname, 'public')));

const certPath = '/etc/letsencrypt/live/axonai.ai/';
const certKeyPath = certPath + 'privkey.pem';
const certFilePath = certPath + 'cert.pem';

const privateKey  = fs.readFileSync(certKeyPath, 'utf8');
const certificate = fs.readFileSync(certFilePath, 'utf8');

const credentials = {key: privateKey, cert: certificate};
const httpsServer = https.createServer(credentials, app);

//httpServer.listen(8080);
httpsServer.listen(port);

console.log(`Server started on port: ${port}`);